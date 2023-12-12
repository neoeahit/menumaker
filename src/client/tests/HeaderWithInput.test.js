import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeaderWithInput from '../components/HeaderWithInput';

const renderHeaderWithInput = (handler) => {
  render(<HeaderWithInput handleSubmit={handler} />);
};

describe('HeaderWithInput component', () => {
  test('calls handleSubmit on click', () => {
    const handler = jest.fn();
    renderHeaderWithInput(handler);
    const button = screen.getByText('Submit Ingredients');
    fireEvent.click(button);
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
