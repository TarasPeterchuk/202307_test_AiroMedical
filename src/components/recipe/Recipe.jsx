import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import './recipe.scss';

const Recipe = ({ useRecipeStore }) => {
  const { recipeId } = useParams();

  const [recipe] = useRecipeStore((state) => state.recipes).filter(
    ({ id }) => id === Number(recipeId)
  );

  return (
    <div className="recipe">
      {recipe && (
        <>
          <div className="recipe__header">
            <h2>Recipe {recipe.name}</h2>
          </div>
          <div className="recipe__body">
            <img
              className="recipe__image"
              src={recipe.image_url}
              alt={recipe.name}
              style={{ maxHeight: '300px' }}
            />
            <p>{recipe.description}</p>
          </div>
        </>
      )}
      <Link to={`/`}>
        <Button size="medium" variant="outlined">
          Back to main
        </Button>
      </Link>
    </div>
  );
};

export default Recipe;
