import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import IngredientsList from '../components/IngredientsList';

const id = 'ingredients-list-id';
const ingredients = [
  {
    ingredient: 'Carrots',
    amount: '3',
  },
  {
    ingredient: 'Salt',
    amount: '1 tsp',
  },
];

const renderIngredientsList = () => {
  render(<IngredientsList id={id} ingredients={ingredients} />);
};

describe('IngredientsList component', () => {
  test('renders the component title', () => {
    renderIngredientsList();
    const titleElement = screen.getByText('Ingredients');
    expect(titleElement).toBeInTheDocument();
  });
  test('renders each ingredient correctly', () => {
    renderIngredientsList();
    ingredients.forEach((obj) => {
      const ingredient = screen.getByText(obj.ingredient);
      expect(ingredient).toBeInTheDocument();
      const amount = screen.getByText(`: ${obj.amount}`);
      expect(amount).toBeInTheDocument();
    });
  });
});
