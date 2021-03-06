import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // = data
    products: [],
    // {id, quantity}
    cart: []
  },

  getters: { // computed properties
    availableProducts (state, getters) {
      return state.products.filter(product => product.inventory > 0)
    },
    cartProducts (state) {
      return state.cart.map(cartItem => {
        const product = state.products.find(product => product.id === cartItem.id)
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        }
      })
    },
    cartTotal (state, getters) {
      return getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0)
    }
  },

  actions: { // = methods
    fetchProducts ({commit}) {
      return new Promise((resolve, reject) => {
        // make the call
        // run setProducts mutation
        fetch('http://localhost:3000/products')
          .then( res => res.json() )
          .then( res => {
            commit('setProducts', res )
            resolve()
          })
      })
    },
    addProductToCart (context, product) {
      if (product.inventory > 0) {
        // find cartItem
        const cartItem = context.state.cart.find(item => item.id === product.id)
        if (!cartItem) {
          // PushProductToCart
          context.commit('pushProductToCart', product.id)
        } else {
          // incrementItemQuantity
          context.commit('incrementItemQuantity', cartItem)
        }
        context.commit('decrementProductInventory', product)
      }
    }
  },

  mutations: {
    setProducts (state, products) {
      // update products
      state.products = products
    },
    // const cartItem = {id: 123, quantity: 2}
    pushProductToCart (state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1
      })
    },
    incrementItemQuantity (state, cartItem) {
      cartItem.quantity++
    },
    decrementProductInventory (state, product) {
      product.inventory--
    }
  }
})
