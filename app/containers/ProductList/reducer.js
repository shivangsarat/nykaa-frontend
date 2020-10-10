import produce from 'immer';
import {
  FETCH_PRODUCT_LIST,
  FETCH_PRODUCT_LIST_SUCCESS,
  FETCH_PRODUCT_LIST_ERROR,

  SEARCH_PRODUCT
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  productList: {
    products: false,
  },
  search: false
};

/* eslint-disable default-case, no-param-reassign */
const productListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_PRODUCT_LIST:
        draft.loading = true;
        draft.error = false;
        draft.productList.products = false;
        draft.search = false;
        break;

      case FETCH_PRODUCT_LIST_SUCCESS:
        console.log("FETCH_PRODUCT_LIST_SUCCESS ", action.payload)
        draft.productList.products = action.payload;
        draft.loading = false;
        draft.search = false;
        break;

      case FETCH_PRODUCT_LIST_ERROR:
        draft.error = action.error;
        draft.loading = false;
        draft.search = false;
        break;

      case SEARCH_PRODUCT:
      console.log("SEARCH_PRODUCT ", action.payload)
        let data = draft.productList.products.filter(obj => {
            return obj.title.toLowerCase().includes(action.payload.toLowerCase())
        })
        draft.productList.products = data;
        draft.search = true;
    }
  });

export default productListReducer;