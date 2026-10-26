export const favouritesReducer = (state, action) => {
  switch (action.type) {
    case 'INIT':
      return new Set(action.payload);

    case 'TOGGLE_FAVOURITE': {
      const next = new Set(state);
      if (next.has(action.payload)) {
        next.delete(action.payload);
      } else {
        next.add(action.payload);
      }
      return next;
    }

    default:
      return state;
  }
};

export const initialFavouritesState = new Set();
