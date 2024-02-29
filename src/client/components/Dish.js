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
        <Typography variant="body2"><b>Description:</b> {description}</Typography>
        <Typography variant="body2"><b>Origin: </b> {origin}</Typography>
        <Typography variant="body2"><b>Time to cook: </b> {timetocook}</Typography>
      </CardContent>
    </Card>
  );
}

Dish.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  origin: PropTypes.string,
  timetocook: PropTypes.string,
};

export default Dish;
