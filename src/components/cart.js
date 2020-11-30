import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as cartActions from '../store/actions/cart.action'

class Cart extends React.Component {
  componentDidMount() {
    // 向服务器端发送请求, 获取购物车列表数据
    const { loadCarts } = this.props
    loadCarts()
  }
  render() {
    const { carts, deleteProductFromCart } = this.props
    return (
      <div>
        <section className="container content-section">
          <h2 className="section-header">购物车</h2>
          <div className="cart-row">
            <span className="cart-item cart-header cart-column">商品</span>
            <span className="cart-price cart-header cart-column">价格</span>
            <span className="cart-quantity cart-header cart-column">数量</span>
          </div>
          <div className="cart-items">
            {carts.map((product) => (
              <div key={product.id} className="cart-row">
                <div className="cart-item cart-column">
                  <img
                    className="cart-item-image"
                    src={product.thumbnail}
                    width="100"
                    height="100"
                    alt=""
                  />
                  <span className="cart-item-title">{product.title}</span>
                </div>
                <span className="cart-price cart-column">
                  ￥{product.price}
                </span>
                <div className="cart-quantity cart-column">
                  <input
                    className="cart-quantity-input"
                    type="number"
                    value={product.count}
                    onChange={() => {}}
                  />
                  <button
                    onClick={() => deleteProductFromCart(product.id)}
                    className="btn btn-danger"
                    type="button"
                  >
                    删除
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <strong className="cart-total-title">总价</strong>
            <span className="cart-total-price">￥39.97</span>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  carts: state.carts,
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(cartActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
