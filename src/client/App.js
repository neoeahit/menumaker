import React, { useState } from 'react';
import { Container, CircularProgress } from '@mui/material';

import HeaderWithInput from './components/HeaderWithInput.js';
import IngredientsList from './components/IngredientsList.js';
import RecipeStepsList from './components/RecipeStepsList.js';
import Dish from './components/Dish.js';
import ErrorSnackbar from './components/ErrorSnackbar.js';

import './App.css';
import bannerImage from './banner-image.jpg';

function App() {
  const [title, setTitle] = useState('');
  const [waiting, setWaiting] = useState(false);
  const [description, setDescription] = useState('');
  const [recipeSteps, setRecipeSteps] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const updateDish = ({ title, description, recipe, ingredients }) => {
    setTitle(title);
    setDescription(description);
    setRecipeSteps(recipe);
    setIngredients(ingredients);
    setWaiting(false);
    setErrorMessage('');
  };

  const handleSubmit = async (inputValue) => {
    if (inputValue.length === 0) {
      setErrorMessage('Please provide ingredients before submitting the form.');
      return;
    }
    try {
      setWaiting(true);

      // Abort fetch after 10 seconds
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 30000);

      // Submit ingredient list to the API
      const response = await fetch('/ingredients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputValue }),
        signal: controller.signal,
      });
      clearTimeout(id);

      if (!response.ok && response.status === 404) {
        setErrorMessage('The API is not available. Please try again later.');
        return;
      }

      if (
        !response.headers
          .get('content-type')
          .toLowerCase()
          .includes('application/json')
      ) {
        setErrorMessage('The API returned an unexpected response.');
        return;
      }

      // Check if the API returned an error
      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error);
        return;
      }

      // Parse the response and update the dish
      const args = JSON.parse(data.arguments);
      updateDish(args);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleErrorClose = async () => {
    setErrorMessage('');
    setWaiting(false);
  };

  return (
    <div className="App">
      <ErrorSnackbar
        id="error-snackbar"
        message={errorMessage}
        handleClose={handleErrorClose}
      />
      <img
        id="banner"
        src={bannerImage}
        alt="Photo by Anto Meneghini on Unsplash"
      />
      <div>&nbsp;</div>
      <Container maxwidth="sm">
        <HeaderWithInput
          id="user-input-header"
          handleSubmit={handleSubmit}
          submitDisabled={waiting}
        />
        <div>&nbsp;</div>
        {waiting && <CircularProgress color="success" />}
        {!waiting && title.length > 0 && (
          <>
            <Dish id="dish" title={title} description={description} />
            <IngredientsList id="ingredients" ingredients={ingredients} />
            <RecipeStepsList id="recipe-steps" recipeSteps={recipeSteps} />
          </>
        )}
      </Container>
    </div>
  );
}

export default App;
