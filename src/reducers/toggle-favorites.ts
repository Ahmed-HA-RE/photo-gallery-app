import type { Action, State } from '../types/toggle-favorite';

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'TOGGLE_FAVORITES': {
      const isFavorite = state.favorites.find(
        (photoId) => photoId === action.payload,
      );
      if (isFavorite) {
        return {
          ...state,
          favorites: state.favorites.filter(
            (photoId) => photoId !== action.payload,
          ),
        };
      } else {
        return {
          ...state,
          favorites: [...state.favorites, action.payload],
        };
      }
    }
    case 'CLEAR_FAVORITES': {
      return {
        ...state,
        favorites: [],
      };
    }
    default:
      return state;
  }
};
