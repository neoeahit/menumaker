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

function RecipeStepsList({ id, recipeSteps }) {
  return (
    <Accordion id={id}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="recipe-steps-content"
      >
        <Typography gutterBottom variant="h5" component="div">
          Recipe
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {recipeSteps.map((value, index) => (
            <ListItem key={`recipe_step_${index}`} disableGutters>
              <ListItemText primary={value} />
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}

RecipeStepsList.propTypes = {
  id: PropTypes.string,
  recipeSteps: PropTypes.array,
};

export default RecipeStepsList;
