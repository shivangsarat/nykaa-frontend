import {
  FETCH_PRODUCT_LIST,
  FETCH_PRODUCT_LIST_SUCCESS,
  FETCH_PRODUCT_LIST_ERROR,

  SEARCH_PRODUCT
} from './constants';


/**
 * Fetches the service provider list, this action starts the request saga
 *
 * @return {object} An action object with a type of FETCH_PRODUCT_LIST
 */

export function fetchProductList() {
    console.log("fetchProductList called");
  return {
    type: FETCH_PRODUCT_LIST
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {string} payload The Product list
 *
 * @return {object} An action object with a type of FETCH_PRODUCT_LIST_SUCCESS passing the payload
 */

export function fetchProductListSuccess(payload) {
  console.log("fetchProductListSuccess ", payload)
  return {
    type: FETCH_PRODUCT_LIST_SUCCESS,
    payload,
  };
}

/**
 * Dispatched when loading the Product list fails
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of FETCH_PRODUCT_LIST_ERROR passing the error
 */
export function fetchProductListError(error) {
  return {
    type: FETCH_PRODUCT_LIST_ERROR,
    error,
  };
}


/**
 * Dispatched when loading the Product list fails
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of SEARCH_PRODUCT initilizing the search
 */
export function searchProduct(payload) {
  return {
    type: SEARCH_PRODUCT,
    payload,
  };
}