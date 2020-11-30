import { handleActions as createReducer } from 'redux-actions'
import {
  addProductToLocalCart,
  changeLocalProductNumber,
  deleteProductFromLocalCart,
  saveCarts,
} from '../actions/cart.action'

const initialState = []

// ✅ 将商品数据保存在本地的cart store中 reducer 处理函数
const handleAddProductToLocalCart = (state, action) => {
  // 将原有的数据copy
  const newState = JSON.parse(JSON.stringify(state))
  const product = newState.find((item) => item.id === action.payload.id)
  if (product) {
    // 2. 已经在购物车, 数量+1
    product.count = product.count + 1
  } else {
    // 1. 要添加的商品没有在购物车, 添加
    newState.push(action.payload)
  }
  return newState
}

// ✅ 将服务器端返回的购物车列表数据同步到本地的购物车中 reducer 处理函数
const handleSaveCarts = (state, action) => action.payload

// ✅ 删除本地的购物车中的数据
const handleDeleteProductFromLocalCart = (state, action) => {
  const newState = JSON.parse(JSON.stringify(state))
  newState.splice(action.payload, 1)
  return newState
}

// ✅ 更新本地购物车商品数量
const handleChangeLocalProductNumber = (state, action) => {
  const newState = JSON.parse(JSON.stringify(state))
  const product = newState.find((item) => item.id === action.payload.id)
  product.count = action.payload.count
  return newState
}

// 创建 reducer 函数
export default createReducer(
  {
    // 将商品数据保存在本地的 cart store 中
    [addProductToLocalCart]: handleAddProductToLocalCart,
    // 将服务器端返回的购物车列表数据同步到本地的购物车中
    [saveCarts]: handleSaveCarts,
    // 删除本地的购物车中的数据
    [deleteProductFromLocalCart]: handleDeleteProductFromLocalCart,
    // 更新本地购物车商品数量
    [changeLocalProductNumber]: handleChangeLocalProductNumber,
  },
  initialState
)
