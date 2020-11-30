import { takeEvery, put } from 'redux-saga/effects'
import {
  addProductToCart,
  addProductToLocalCart,
  changeLocalProductNumber,
  changeServerProductNumber,
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

// 向服务器端发送请求, 告诉服务器哪个商品的数量要更改成多少
function* handleChangeServerProductNumber(action) {
  const { data } = yield axios.put('http://localhost:3005/cart', action.payload)
  // 更新本地购物车商品数量 同步 action 👣
  yield put(changeLocalProductNumber(data))
}

export default function* cartSaga() {
  //  添加到购物车, 异步 action 🎃
  yield takeEvery(addProductToCart, handleAddProductToCart)

  // 获取购物车列表数据, 异步 action 🎃
  yield takeEvery(loadCarts, handleLoadCarts)

  // 向服务器发送请求, 删除购物车中的数据  异步 action 🎃
  yield takeEvery(deleteProductFromCart, handleDeleteProductFromCart)

  // 向服务器端发送请求, 告诉服务器哪个商品的数量要更改成多少 异步 action 🎃
  yield takeEvery(changeServerProductNumber, handleChangeServerProductNumber)
}
