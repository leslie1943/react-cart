import { takeEvery, put } from 'redux-saga/effects'
import {
  addProductToCart,
  addProductToLocalCart,
  deleteProductFromCart,
  deleteProductFromLocalCart,
  loadCarts,
  saveCarts,
} from '../actions/cart.action'
import axios from 'axios'

// 添加到购物车
function* handleAddProductToCart(action) {
  const { data } = yield axios.post('http://localhost:3005/cart/add', {
    gid: action.payload,
  })
  // 同步 action 👣
  yield put(addProductToLocalCart(data)) // 'addProductToLocalCart'会被reducer接收到
}

// 获取购物车列表数据
function* handleLoadCarts(action) {
  const { data } = yield axios.get('http://localhost:3005/cart')
  // 同步 action 👣
  yield put(saveCarts(data))
}

// 向服务器发送请求, 删除购物车中的数据
function* handleDeleteProductFromCart(action) {
  const { data } = yield axios.delete('http://localhost:3005/cart/delete', {
    params: { cid: action.payload },
  })
  // 同步 action 👣
  yield put(deleteProductFromLocalCart(data.index))
}

export default function* cartSaga() {
  //  添加到购物车, 异步 action 🎃
  yield takeEvery(addProductToCart, handleAddProductToCart)

  // 获取购物车列表数据, 异步 action 🎃
  yield takeEvery(loadCarts, handleLoadCarts)

  // 向服务器发送请求, 删除购物车中的数据  异步 action 🎃
  yield takeEvery(deleteProductFromCart, handleDeleteProductFromCart)
}
