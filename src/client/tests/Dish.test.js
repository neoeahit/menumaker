import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dish from '../components/Dish';

const id = 'dish-id';
const title = 'Dish Title';
const description = 'this is my dish description';

const renderDish = () => {
  render(<Dish id={id} title={title} description={description} />);
};

describe('Dish component', () => {
  test('renders the title', () => {
    renderDish();
    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
  });
  test('renders the description', () => {
    renderDish();
    const descriptionElement = screen.getByText(description);
    expect(descriptionElement).toBeInTheDocument();
  });
});
