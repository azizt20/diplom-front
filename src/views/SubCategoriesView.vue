<template>
  <div>
    <div>
      <div v-for="cat in getSubCategory(category_id)" :key="cat.id">
        <router-link :to="{name:'subcategory', params:{sub:cat.id}}">
          <img :src="STORAGE_URL + cat.image" :alt="cat.name" class="w-full h-auto">
        </router-link>
      </div>

    </div>

  </div>

</template>

<script>
import {createNamespacedHelpers} from "vuex";


const {
  mapGetters: mapProdGetters,

} = createNamespacedHelpers('products')


export default {
  name: 'SubCategoriesView',
  components: {},
  data() {
    return {
      STORAGE_URL: process.env.VUE_APP_STORAGE_URL,
      category_id: '',
    }
  },
  created() {
    this.category_id = this.$route.params.cat
  },
  updated() {
    this.category_id = this.$route.params.cat
  },
  computed: {
    ...mapProdGetters({
      getSubCategory: 'getSubCategory'
    })
  }
}
</script>