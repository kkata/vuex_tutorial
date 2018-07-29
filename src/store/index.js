import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: []
  },

  getters: { // computed properties
      availableProducts (state, getters) {
        return state.products.filter(product => product.inventory > 0)
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
    }
  },

  mutations: {
    setProducts (state, products) {
      // update products
      state.products = products
    }
  }
})
