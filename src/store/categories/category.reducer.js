import CATEGORY_ACTION_TYPES from './category.types';

export const CARTEGORY_INITIAL_STATE = {
  categoriesMap: {},
};

export const categoriesReducer = (state = CATEGORY_ACTION_TYPES, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORY_ACTION_TYPES.SET_CATEGORIES_MAP:
      return { ...state, categoriesMap: payload };
    default:
      return state;
  }
};
