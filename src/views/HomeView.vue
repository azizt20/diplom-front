<template>
  <div>
    <div>
      <div v-for="cat in getCategory" :key="cat.id">
        <router-link :to="{name:'category', params:{cat:cat.id}}">
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
  name: 'Home-view',
  components: {},
  data() {
    return {
      STORAGE_URL: process.env.VUE_APP_STORAGE_URL
    }
  },

  computed: {
    ...mapProdGetters({
      getCategory: 'getCategory'
    })
  }
}
</script>