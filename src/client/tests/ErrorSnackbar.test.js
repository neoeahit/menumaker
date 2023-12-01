import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorSnackbar from '../components/ErrorSnackbar';

const id = 'snackbar-id';
const message = 'This is my error message';

const renderErrorSnackbar = (message) => {
  render(<ErrorSnackbar id={id} message={message} />);
};

describe('ErrorSnackbar component', () => {
  test('renders the message', () => {
    renderErrorSnackbar(message);
    const element = screen.getByText(message);
    expect(element).toBeInTheDocument();
  });
});
