import './App.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { create } from 'zustand';

import RecipeList from './components/recipeList/RecipeList';
import Recipe from './components/recipe/Recipe';
import ErrorPage from './components/errorPage/ErrorPage';

const useRecipeStore = create((set) => ({
  recipes: [],
  selectedRecipes: [],
  page: 1,

  fetchRecipes: async () => {
    try {
      const response = await fetch(
        `https://api.punkapi.com/v2/beers?page=${
          useRecipeStore.getState().page
        }`
      );
      const data = await response.json();
      set({ recipes: data });
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  },

  selectRecipe: (id) => {
    set((state) => {
      if (state.selectedRecipes.includes(id)) {
        return {
          selectedRecipes: state.selectedRecipes.filter((r) => r !== id),
        };
      } else {
        return { selectedRecipes: [...state.selectedRecipes, id] };
      }
    });
  },

  selectAllRecipes: () => {
    set((state) => {
      return state.selectedRecipes.length !== state.recipes.length
        ? { selectedRecipes: state.recipes.map(({ id }) => id) }
        : { selectedRecipes: [] };
    });
  },

  deleteSelectedRecipes: () => {
    set((state) => ({
      recipes: state.recipes.filter(
        ({ id }) => !state.selectedRecipes.includes(id)
      ),
      selectedRecipes: [],
    }));
    if (useRecipeStore.getState().recipes.length === 0) {
      set((state) => ({ ...state, page: state.page + 1 }));
      useRecipeStore.getState().fetchRecipes();
    }
  },
}));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RecipeList useRecipeStore={useRecipeStore} />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'recipe/:recipeId',
    element: <Recipe useRecipeStore={useRecipeStore} />,
  },
]);

function App() {
  return (
    <div className="container">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
