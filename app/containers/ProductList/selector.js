/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectProductList = state => state.productList || initialState;

const makeSelectProductList = () =>
  createSelector(
    selectProductList,
    productListState => productListState,
  );

export {
  selectProductList,
  makeSelectProductList
};
