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
          Suggest me a recipe
        </Typography>
        <Typography variant="body1">
          Enter a list of ingredients, and we&apos;ll come up with a delicious
          dish you can make from those ingredients!
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
          Find me the dish I can make with this!
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
