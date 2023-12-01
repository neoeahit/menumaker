import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecipeStepsList from '../components/RecipeStepsList';

const id = 'recipe-steps-list-id';
const recipeSteps = ['1. Boil water', '2. Cook rice', '3. Scoop rice'];

const renderRecipeStepsList = () => {
  render(<RecipeStepsList id={id} recipeSteps={recipeSteps} />);
};

describe('RecipeStepsList component', () => {
  test('renders the component title', () => {
    renderRecipeStepsList();
    const titleElement = screen.getByText('Recipe');
    expect(titleElement).toBeInTheDocument();
  });
  test('renders each recipe step correctly', () => {
    renderRecipeStepsList();
    recipeSteps.forEach((step) => {
      const recipeStep = screen.getByText(step);
      expect(recipeStep).toBeInTheDocument();
    });
  });
});
