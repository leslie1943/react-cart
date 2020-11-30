import { takeEvery, put } from 'redux-saga/effects'
import { loadProducts, saveProducts } from '../actions/product.action'
import axios from 'axios'

function* handleLoadProducts() {
  // 加载商品列表数据
  const { data } = yield axios.get('http://localhost:3005/goods')
  // 将数据保存到 store, 同步 action 🎃
  yield put(saveProducts(data))
}

export default function* productSaga() {
  // 加载商品列表数据, 异步 action 🎃
  yield takeEvery(loadProducts, handleLoadProducts)
}
