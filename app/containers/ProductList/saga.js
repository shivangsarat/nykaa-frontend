import { call, put, select, takeLatest } from 'redux-saga/effects';
import { FETCH_PRODUCT_LIST } from './constants';
import { fetchProductListSuccess, fetchProductListError } from './actions';
import axios from 'axios';

import request from 'utils/request';

function getProductAPI() {
    return axios.request({
        method: "get",
        url: "http://localhost:5000/"
    })
}

export function* getProducts() {
  const requestURL = `http://localhost:5000/`;

  try {
    var request = yield call(getProductAPI)
    request = request.data;
    console.log("saga request", request);
    yield put(fetchProductListSuccess(request));
  } catch (err) {
    yield put(fetchProductListError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  // Watches for FETCH_PRODUCT_LIST actions and calls getProducts when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(FETCH_PRODUCT_LIST, getProducts);
}