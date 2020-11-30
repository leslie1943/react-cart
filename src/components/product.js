import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as productActions from '../store/actions/product.action'
import * as cartActions from '../store/actions/cart.action'

class Product extends React.Component {
  componentDidMount() {
    // 向服务器端发送请求,获取商品列表数据
    const { loadProducts } = this.props
    loadProducts()
  }
  render() {
    const { products, addProductToCart } = this.props
    console.info(products)
    return (
      <div>
        <section className="container content-section">
          <h2 className="section-header">商品列表</h2>
          <div className="shop-items">
            {products.map((product) => (
              <div className="shop-item" key={product.id}>
                <img
                  className="shop-item-image"
                  alt=""
                  src={product.thumbnail}
                />
                <span className="shop-item-title">{product.title}</span>
                <div className="shop-item-details">
                  <span className="shop-item-price">￥ {product.price}</span>
                  <button
                    onClick={() => addProductToCart(product.id)}
                    className="btn btn-primary shop-item-button"
                    type="button"
                  >
                    加入购物车
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
})

// 在组件中就可以拿到 action creator 函数: props.load, props.save
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(productActions, dispatch),
  ...bindActionCreators(cartActions, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(Product)
