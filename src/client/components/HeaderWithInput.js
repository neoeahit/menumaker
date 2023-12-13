import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, TextField, Button, Stack } from '@mui/material';

function HeaderWithInput({ id, submitDisabled, handleSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <Card id={id}>
      <Stack spacing={2}>
        <Typography variant="h3" fontWeight={600} component="div">
          Menu Maker
        </Typography>
        <Typography variant="body1">
          Enter a list of ingredients, and we&apos;ll come up with a delicious
          dish for your menu, made from those ingredients!
        </Typography>
        <TextField
          id="ingredients-input"
          label="Ingredients"
          placeholder='Separate ingredients with commas, e.g. "chicken, rice, beans"'
          multiline
          minRows={2}
          variant="outlined"
          fullWidth
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            const keyCode = e.which || e.keyCode;
            if (keyCode === 13 && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(inputValue);
              setInputValue('');
            }
          }}
        />
        <Button
          disabled={submitDisabled}
          fullWidth
          variant="contained"
          onClick={() => {
            handleSubmit(inputValue);
            setInputValue('');
          }}
        >
          Submit Ingredients
        </Button>
      </Stack>
    </Card>
  );
}

HeaderWithInput.propTypes = {
  id: PropTypes.string,
  submitDisabled: PropTypes.bool,
  handleSubmit: PropTypes.func,
};

export default HeaderWithInput;
