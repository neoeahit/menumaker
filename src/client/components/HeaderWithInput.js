import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Typography,
  TextField,
  Button,
} from '@material-ui/core/index.js';

function HeaderWithInput({ id, submitDisabled, handleSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <Card id={id}>
      <Typography variant="h3" component="div">
        Menu Maker
      </Typography>
      <Typography variant="body2">
        Enter a list of ingredients, and we&apos;ll come up with a delicious
        dish for your menu, made from those ingredients!
      </Typography>
      <div>&nbsp;</div>
      <TextField
        id="ingredients-input"
        label="Ingredients"
        multiline
        minRows={4}
        variant="outlined"
        fullWidth
        value={inputValue}
        onChange={handleInputChange}
      />
      <div>&nbsp;</div>
      <Button
        disabled={submitDisabled}
        variant="contained"
        onClick={() => handleSubmit(inputValue)}
      >
        Send
      </Button>
    </Card>
  );
}

HeaderWithInput.propTypes = {
  id: PropTypes.string,
  submitDisabled: PropTypes.bool,
  handleSubmit: PropTypes.func,
};

export default HeaderWithInput;
