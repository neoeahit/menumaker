import React from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

function IngredientsList({ id, ingredients }) {
  return (
    <Accordion id={id}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="ingredients-content"
      >
        <Typography gutterBottom variant="h5" component="div">
          Ingredients
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {ingredients.map((value, index) => (
            <ListItem key={`ingredient_${index}`} disableGutters>
              <ListItemText
                className="ingredient"
                primary={value.ingredient}
                secondary={`: ${value.amount}`}
              />
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}

IngredientsList.propTypes = {
  id: PropTypes.string,
  ingredients: PropTypes.array,
};

export default IngredientsList;
