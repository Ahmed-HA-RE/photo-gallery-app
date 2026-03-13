type State = {
  favorites: string[];
};

type Action = {
  type: 'TOGGLE_FAVORITES';
  payload: string;
};

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
    default:
      return state;
  }
};
