<script setup lang="ts">
import type { Product } from '@/stores/productStore'
import { useCartStore } from '@/stores/cartStore'
import { RouterLink } from 'vue-router'

defineProps<{
  product: Product
}>()

const cartStore = useCartStore()
</script>

<template>
  <div
    class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
  >
    <div class="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 h-72">
      <RouterLink :to="`/product/${product.id}`">
        <img
          :src="product.image_url"
          :alt="product.name"
          class="h-full w-full object-cover object-center sm:h-full sm:w-full"
        />
      </RouterLink>
    </div>
    <div class="flex flex-1 flex-col space-y-2 p-4">
      <h3 class="text-sm font-medium text-gray-900">
        <RouterLink :to="`/product/${product.id}`">
          <span aria-hidden="true" class="absolute inset-0"></span>
          {{ product.name }}
        </RouterLink>
      </h3>
      <p class="text-sm text-gray-500 line-clamp-2">{{ product.description }}</p>
      <div class="flex flex-1 flex-col justify-end">
        <p class="text-sm italic text-gray-500">{{ product.category }}</p>
        <p class="text-base font-medium text-gray-900">${{ product.price }}</p>
      </div>
    </div>
    <button
      @click="cartStore.addToCart(product)"
      type="button"
      class="relative z-10 w-full bg-indigo-600 bg-opacity-75 px-4 py-2 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
    >
      Add to Cart
    </button>
  </div>
</template>
