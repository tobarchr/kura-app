<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useProductStore, type Product } from '@/stores/productStore'
import { useCartStore } from '@/stores/cartStore'
import { computed, onMounted, ref } from 'vue'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()

const productId = parseInt(route.params.id as string)
const product = ref<Product | null>(null)

onMounted(async () => {
  // If products are not loaded yet, fetch them
  if (productStore.products.length === 0) {
    await productStore.fetchProducts()
  }
  product.value = productStore.products.find((p) => p.id === productId) || null
})
</script>

<template>
  <div v-if="product" class="bg-white">
    <div
      class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8"
    >
      <!-- Product details -->
      <div class="lg:max-w-lg lg:self-end">
        <div class="mt-4">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {{ product.name }}
          </h1>
        </div>

        <section aria-labelledby="information-heading" class="mt-4">
          <div class="flex items-center">
            <p class="text-lg text-gray-900 sm:text-xl">${{ product.price }}</p>
          </div>

          <div class="mt-4 space-y-6">
            <p class="text-base text-gray-500">{{ product.description }}</p>
          </div>
        </section>
      </div>

      <!-- Product image -->
      <div class="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
        <div class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
          <img
            :src="product.image_url"
            :alt="product.name"
            class="h-full w-full object-cover object-center"
          />
        </div>
      </div>

      <!-- Product form -->
      <div class="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
        <section aria-labelledby="options-heading">
          <div class="mt-10">
            <button
              @click="cartStore.addToCart(product!)"
              type="button"
              class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              Add to cart
            </button>
          </div>
        </section>
      </div>
    </div>
  </div>
  <div v-else class="text-center py-24">
    <p>Loading product details...</p>
  </div>
</template>
