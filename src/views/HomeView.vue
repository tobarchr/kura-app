<script setup lang="ts">
import { onMounted } from 'vue'
import { useProductStore } from '@/stores/productStore'
import { storeToRefs } from 'pinia'
import ProductCard from '@/components/ProductCard.vue'

const productStore = useProductStore()
const { products, loading, error } = storeToRefs(productStore)

onMounted(() => {
  productStore.fetchProducts()
})
</script>

<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 class="text-2xl font-bold tracking-tight text-gray-900">Our Products</h2>

      <div v-if="loading" class="mt-6 text-center">
        <p>Loading products...</p>
      </div>
      <div v-else-if="error" class="mt-6 text-center text-red-500">
        <p>Error loading products: {{ error }}</p>
      </div>
      <div
        v-else
        class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
      >
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
      </div>
    </div>
  </div>
</template>
