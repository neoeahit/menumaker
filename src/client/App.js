import React, { useState } from 'react'
import HeaderWithInput from './components/HeaderWithInput.js'
import IngredientsList from './components/IngredientsList.js'
import RecipeStepsList from './components/RecipeStepsList.js'
import Dish from './components/Dish.js'
import ErrorSnackbar from './components/ErrorSnackbar.js'
import { Container, CircularProgress } from '@material-ui/core/index.js'
import './App.css'
import bannerImage from './banner-image.jpg'

function App () {
  const [title, setTitle] = useState('')
  const [waiting, setWaiting] = useState(false)
  const [description, setDescription] = useState('')
  const [recipeSteps, setRecipeSteps] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  const updateDish = ({ title, description, recipe, ingredients }) => {
    setTitle(title)
    setDescription(description)
    setRecipeSteps(recipe)
    setIngredients(ingredients)
    setWaiting(false)
    setErrorMessage('')
  }

  const handleSubmit = async (inputValue) => {
    if (inputValue.length === 0) {
      setErrorMessage('Please provide ingredients before submitting the form.')
      return
    }
    try {
      setWaiting(true)
      const response = await fetch('/ingredients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: inputValue })
      })
      const data = await response.json()
      updateDish(JSON.parse(data.arguments))
    } catch (error) {
      setErrorMessage(error)
    }
  }

  const handleErrorClose = async () => {
    setErrorMessage('')
  }

  return (
    <div className="App">
      <ErrorSnackbar id="error-snackbar" message={errorMessage} handleClose={handleErrorClose} />
      <img id="banner" src={bannerImage} alt="Photo by Anto Meneghini on Unsplash" />
      <div>&nbsp;</div>
      <Container maxwidth="sm">
        <HeaderWithInput id="user-input-header" handleSubmit={handleSubmit} submitDisabled={waiting} />
        <div>&nbsp;</div>
        { waiting &&
          <CircularProgress color="success" />
        }
        { !waiting && title.length > 0 &&
          <React.Fragment>
            <Dish id="dish" title={title} description={description} />
            <IngredientsList id="ingredients" ingredients={ingredients} />
            <RecipeStepsList id="recipe-steps" recipeSteps={recipeSteps} />
          </React.Fragment>
        }
      </Container>
    </div>
  )
}

export default App
