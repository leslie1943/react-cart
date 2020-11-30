import { createAction } from 'redux-actions'

// 1. 向服务器端发送请求,告诉服务器端我们要将哪个商品添加到购物车中
export const addProductToCart = createAction('addProductToCart')
// 2. 商品添加到本地购物车数据中
export const addProductToLocalCart = createAction('addProductToLocalCart')

// 3. 向服务器端发送请求,获取购物车列表数据
export const loadCarts = createAction('loadCarts')
// 4. 将服务器返回的购物车列表数据同步到本地的购物车中
export const saveCarts = createAction('saveCarts')

// 5. 向服务器发送请求, 删除购物车中的数据
export const deleteProductFromCart = createAction('deleteProductFromCart')
// 6. 将删除本地购物车中的数据
export const deleteProductFromLocalCart = createAction(
  'deleteProductFromLocalCart'
)
