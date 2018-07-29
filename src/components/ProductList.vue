<template>
  <div>
    <h1>Product List</h1>
    <img
      v-if="loading"
      src="https://i.imgur.com/JfPpwOA.gif"
      alt=""
    >
    <ul v-else>
      <li v-for="product in products" :key="product.id">{{product.title}} - {{product.price}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false
    }
  },
  computed: {
    products () {
      return this.$store.getters.availableProducts
    }
  },
  created() {
    this.loading = true
    setTimeout(() => {
      this.$store.dispatch('fetchProducts')
        .then((() => this.loading = false))
    }, 500);

  },
  methods: {

  }
}
</script>
