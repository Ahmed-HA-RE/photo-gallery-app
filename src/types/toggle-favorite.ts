export type State = {
  favorites: string[];
};

export type Action =
  | {
      type: 'TOGGLE_FAVORITES';
      payload: string;
    }
  | { type: 'CLEAR_FAVORITES' };
