<template>
  <router-link :to="{name: 'detail', params: {productId: product.id}}" class="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden">
    <div class="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
      <img :src="STORAGE_URL + product.image" :alt="product.title" class="w-full h-full object-center object-cover sm:w-full sm:h-full" />
    </div>
    <div class="flex-1 p-4 space-y-2 flex flex-col">
      <h3 class="text-lg font-bold text-gray-900">
        <div >
          <span aria-hidden="true" class="absolute inset-0 " />
          {{ product.name }}
        </div>
      </h3>
      <ul class="text-sm text-night-blue font-medium">
        <li v-if="product.cpu" class="">
          {{product.cpu}}
        </li>
        <li v-if="product.gru" class="">
          {{product.gpu}}
        </li>
        <li v-if="product.ram" class="">
          {{product.ram}}
        </li>
        <li v-if="product.power" class="">
          {{product.power}}
        </li>
      </ul>

      <div class="flex-1 flex flex-col justify-end">
        <p class="text-md font-bold text-gray-900"> <span class="text-xl">стоимость: </span>{{ product.cost }} сум</p>
      </div>
    </div>
  </router-link>

</template>

<script>
export default {
  name: "ProductCard",
  props:{
    product: {
      type: Object
    }
  },
  data(){
    return{
      STORAGE_URL: process.env.VUE_APP_STORAGE_URL,
    }
  }

}
</script>

<style scoped>

</style>