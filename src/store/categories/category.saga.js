import { takeLatest, all, call, put } from "redux-saga/effects";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import { fetchCategoriesSuccess, fetchCategoriesFailure } from "./category.action";

import { CATEGORIES_ACTION_TYPES } from "./category.types";


export const fetchCategoriesStartAsync = () => {
  return async (dispatch) => {
    dispatch(fetchCategoriesStart());
    try {
      const categoriesArray = await getCategoriesAndDocuments('categories');
      dispatch(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
      dispatch(fetchCategoriesFailure(error));
    }
  };
};