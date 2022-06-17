<template>
  <div class="bg-white">
    <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 class="sr-only">Products</h2>

      <div v-if="getProduct" class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
        <ProductCard v-for="product in getProduct" :key="product.id" :product="product"/>
      </div>
    </div>
  </div>
</template>

<script>

import {createNamespacedHelpers} from "vuex";

const {
  mapActions: mapProdActions,
  mapGetters: mapProdGetters,
} = createNamespacedHelpers('products')

import ProductCard from "@/components/ProductCard";

export default {
  name: "ProductsView",
  components: {
    ProductCard
  },
  methods: {
    ...mapProdActions({
      getProducts: 'getProducts'
    })
  },
  created() {
    const cat_id = this.$route.params.sub || this.$route.params.cat
    const filter = '?type_medicine=' + cat_id
    this.getProducts(filter)

  },
  computed:{
    ...mapProdGetters({
      getProduct: 'getProduct'
    })
}

}
</script>

<style scoped>

</style>