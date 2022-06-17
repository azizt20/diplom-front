<template>
  <div class="bg-white" v-if="getOneProduct">
    <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
      <!--      Product details-->
      <div class="lg:max-w-lg lg:self-end">
        <nav aria-label="Breadcrumb">
          <ol role="list" class="flex items-center space-x-2">
<!--            <li>-->
<!--              <div class="flex items-center text-sm">-->
<!--                <router-link-->
<!--                    :to="{name:'category', params:{cat:getCatBySub.id}}"-->
<!--                    class="font-medium text-gray-500 hover:text-gray-900">-->
<!--                  {{ getCatBySub.name }}-->
<!--                </router-link>-->
<!--                <svg viewBox="0 0 20 20"-->
<!--                     xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true"-->
<!--                     class="ml-2 flex-shrink-0 h-5 w-5 text-gray-300">-->
<!--                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"/>-->
<!--                </svg>-->
<!--              </div>-->
<!--            </li>-->
            <li>
              <div class="flex items-center text-sm">
                <router-link :to="{name:'subcategory', params:{sub: getSubCat.id}}"
                             class="font-medium text-gray-500 hover:text-gray-900">
                  {{ getSubCat?.name }}
                </router-link>
              </div>
            </li>
          </ol>
        </nav>

        <div class="mt-4">
          <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{{ getOneProduct.name }}</h1>
        </div>

        <section aria-labelledby="information-heading" class="mt-4">
          <h2 id="information-heading" class="sr-only">Product information</h2>

          <div class="flex items-center">
            <p class="text-lg text-gray-900 sm:text-xl">{{ getOneProduct.cost }} сум</p>

            <div class="ml-4 pl-4 border-l border-gray-300">
              <h2 class="sr-only">Reviews</h2>
              <div class="flex items-center">
                <div>
                  <div class="flex items-center">
                    <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating"
                              :class="[getOneProduct.weight > rating ? 'text-yellow-400' : 'text-gray-300', 'h-5 w-5 flex-shrink-0']"
                              aria-hidden="true"/>
                  </div>
                  <p class="sr-only">{{ getOneProduct.weight }} out of 5 stars</p>
                </div>
                <p class="ml-2 text-sm text-gray-500">{{ getOneProduct.review }} reviews</p>
              </div>
            </div>
          </div>

          <div class="mt-4 space-y-6">
            <p class="text-base text-gray-500">{{ getOneProduct.description }}</p>
          </div>

          <div class="mt-6 flex items-center">
            <CheckIcon class="flex-shrink-0 w-5 h-5 text-green-500" aria-hidden="true"/>
            <p class="ml-2 text-sm text-gray-500">В наличии и готов к отправке </p>
          </div>
        </section>
      </div>

      <!-- Product image -->
      <div class="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center">
        <div class="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
          <img :src="STORAGE_URL + getOneProduct.image" :alt="getOneProduct.title" class="w-full h-full object-center object-cover"/>
        </div>
      </div>

      <!-- Product form -->
      <div class="mt-10 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
        <section aria-labelledby="options-heading">
          <h2 id="options-heading" class="sr-only">Product options</h2>

          <form>
            <div class="mt-8 border-t border-gray-200 pt-8">
              <h2 class="text-sm font-medium text-gray-900">Fabric &amp; Care</h2>

              <div class="mt-4 prose prose-sm text-gray-500">
                <ul role="list">
                  <li>Only the best materials</li>

                  <li>Ethically and locally made</li>

                  <li>Pre-washed and pre-shrunk</li>

                  <li>Machine wash cold with similar colors</li>
                </ul>
              </div>
            </div>
            <div class="mt-4">
              <a href="#" class="group inline-flex text-sm text-gray-500 hover:text-gray-700">
                <span>What size should I buy?</span>
                <QuestionMarkCircleIcon class="flex-shrink-0 ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true"/>
              </a>
            </div>
            <div class="mt-10">
              <button type="submit"
                      class="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">

                <button class="w-full h-full" @click.prevent="addToCart({product: getOneProduct.id})">
                  Add to bag
                </button>

              </button>
            </div>
            <div class="mt-6 text-center">
              <a href="#" class="group inline-flex text-base font-medium">
                <ShieldCheckIcon class="flex-shrink-0 mr-2 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                 aria-hidden="true"/>
                <span class="text-gray-500 hover:text-gray-700">Lifetime Guarantee</span>
              </a>
            </div>
          </form>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import {CheckIcon, QuestionMarkCircleIcon, StarIcon} from '@heroicons/vue/solid'
import {ShieldCheckIcon} from '@heroicons/vue/outline'

import {createNamespacedHelpers} from "vuex";

const {
  mapActions: mapProdActions,
  mapGetters: mapProdGetters,
} = createNamespacedHelpers('products')
const {
  mapActions: mapOrderActions,
} = createNamespacedHelpers('order')

export default {
  name: 'DetailPage',
  components: {
    ShieldCheckIcon,
    CheckIcon,
    QuestionMarkCircleIcon,
    StarIcon
  },
  data() {
    return {
      STORAGE_URL: process.env.VUE_APP_STORAGE_URL,

      product: {
        name: 'Everyday Ruck Snack',
        href: '#',
        price: '$220',
        description:
            "Don't compromise on snack-carrying capacity with this lightweight and spacious bag. The drawstring top keeps all your favorite chips, crisps, fries, biscuits, crackers, and cookies secure.",
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-featured-product-shot.jpg',
        imageAlt: 'Model wearing light green backpack with black canvas straps and front zipper pouch.',
        breadcrumbs: [
          {id: 1, name: 'Travel', href: '#'},
          {id: 2, name: 'Bags', href: '#'},
        ],
        sizes: [
          {name: '18L', description: 'Perfect for a reasonable amount of snacks.'},
          {name: '20L', description: 'Enough room for a serious amount of snacks.'},
          {name: '30L', description: 'Enough room for a serious amount of snacks.'},
        ],
      },
      reviews: {average: 4, totalCount: 1624},
    }
  },
  methods: {
    ...mapProdActions({
      getProducts: 'getProducts',
    }),
    ...mapOrderActions({
      addToCart: 'addToCart',
    })

  },
  created() {
    const prod_id = this.$route.params.productId
    this.getProducts(prod_id)
  },
  computed: {
    ...mapProdGetters({
      getOneProduct: 'getOneProduct',
      getSubCat: 'getSubCat',
      getCatBySub: 'getCatBySub'
    })
  }

}
</script>