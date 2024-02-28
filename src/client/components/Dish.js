import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@mui/material';

function Dish({ id, title, description, origin }) {
  return (
    <Card id={id}>
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {title}
        </Typography>
        <Typography variant="body2">{description}</Typography>
        <Typography variant="body2">Origin: {origin}</Typography>
      </CardContent>
    </Card>
  );
}

Dish.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  origin: PropTypes.string,
};

export default Dish;
