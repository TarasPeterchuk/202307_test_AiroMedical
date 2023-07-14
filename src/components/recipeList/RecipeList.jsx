import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import './recipeList.scss';

const RecipeList = ({ useRecipeStore }) => {
  const recipes = useRecipeStore((state) => state.recipes);
  const selectedRecipes = useRecipeStore((state) => state.selectedRecipes);
  const fetchRecipes = useRecipeStore((state) => state.fetchRecipes);
  const selectRecipe = useRecipeStore((state) => state.selectRecipe);
  const selectAllRecipes = useRecipeStore((state) => state.selectAllRecipes);

  const deleteSelectedRecipes = useRecipeStore(
    (state) => state.deleteSelectedRecipes
  );

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const handleRecipeClick = (event, id) => {
    event.preventDefault();
    selectRecipe(id);
  };

  const handleSelectAllClick = () => {
    selectAllRecipes();
  };

  const handleDeleteClick = () => {
    deleteSelectedRecipes();
  };

  return (
    <div className="recipe-list">
      <div className="recipe-list__header">
        <h2>Recipe List</h2>

        {selectedRecipes.length > 0 && (
          <Button
            size="medium"
            variant="outlined"
            color="error"
            onClick={handleDeleteClick}
          >
            Delete selected
          </Button>
        )}
        <Button size="medium" variant="outlined" onClick={handleSelectAllClick}>
          Select all
        </Button>
      </div>

      <div className="recipe-list__list">
        <List
          sx={{ width: '100%', maxWidth: 420, bgcolor: 'background.paper' }}
        >
          {recipes
            .filter((_, i) => i < 15)
            .map((recipe) => {
              const labelId = `checkbox-list-label-${recipe}`;

              return (
                <Link
                  key={recipe.id}
                  to={`recipe/${recipe.id}`}
                  style={{ color: 'inherit', textDecoration: 'inherit' }}
                >
                  <ListItem key={recipe.id} disablePadding>
                    <ListItemButton
                      role={undefined}
                      onContextMenu={(event) =>
                        handleRecipeClick(event, recipe.id)
                      }
                      dense
                    >
                      <ListItemAvatar>
                        <Avatar alt={recipe.name} src={recipe.image_url} />
                      </ListItemAvatar>

                      <ListItemText id={labelId} primary={recipe.name} />
                      <Checkbox checked={selectedRecipes.includes(recipe.id)} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              );
            })}
        </List>
      </div>
    </div>
  );
};

export default RecipeList;
