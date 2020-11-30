import { handleActions as createReducer } from 'redux-actions'
import { saveProducts } from '../actions/product.action'

const initialState = []

// 将商品列表数据保存在本地的 store 对象中
const handleSaveProducts = (state, action) => action.payload

// 创建 reducer 函数
export default createReducer(
  {
    // 将商品列表数据保存在本地的 store 对象中
    [saveProducts]: handleSaveProducts,
  },
  initialState
)
