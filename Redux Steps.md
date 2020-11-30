## 🔰 REDUX STEPS
1. 创建 `actions`: `loadProducts`和`saveProducts`: 使用`reduxt-actions`中的`createAction`创建, `actions`会被业务组件引用,使用`import { bindActionCreators } from 'redux'`, 在`mapDispatchToProps`使用`bindActionCreators`给组件映射`props`的事件
```js
import { createAction } from 'redux-actions'
// 向服务器端发送请求,获取商品列表数据
export const loadProducts = createAction('load products')
// 将服务器端返回的商品列表数据保存到本地的store对象中
export const saveProducts = createAction('save products')
```
- `loadProducts`会被 `saga`的`takeEvery()`使用, 然后触发`put()`
- `saveProducts`会被`saga`的`put()`使用, `put`后的`saveProducts`会被 `reducer`使用

1. 生成`rootReducer`并导出被`createStore`的第一个参数接收
2. 生成`rootSaga`并导出被`createStore`的第二个参数接收, 并且使用 `sagaMiddleware.run(rootSaga)`运行
