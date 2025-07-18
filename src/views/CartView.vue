<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore'
import { storeToRefs } from 'pinia'
import { X } from 'lucide-vue-next'

const cartStore = useCartStore()
const { items, totalPrice } = storeToRefs(cartStore)
</script>

<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
      <form class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <section aria-labelledby="cart-heading" class="lg:col-span-7">
          <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>

          <ul
            v-if="items.length > 0"
            role="list"
            class="divide-y divide-gray-200 border-b border-t border-gray-200"
          >
            <li v-for="product in items" :key="product.id" class="flex py-6 sm:py-10">
              <div class="flex-shrink-0">
                <img
                  :src="product.image_url"
                  :alt="product.name"
                  class="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                />
              </div>

              <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                  <div>
                    <div class="flex justify-between">
                      <h3 class="text-sm">
                        <a href="#" class="font-medium text-gray-700 hover:text-gray-800">{{
                          product.name
                        }}</a>
                      </h3>
                    </div>
                    <p class="mt-1 text-sm font-medium text-gray-900">${{ product.price }}</p>
                  </div>

                  <div class="mt-4 sm:mt-0 sm:pr-9">
                    <label :for="`quantity-${product.id}`" class="sr-only"
                      >Quantity, {{ product.name }}</label
                    >
                    <input
                      :id="`quantity-${product.id}`"
                      name="quantity"
                      type="number"
                      :value="product.quantity"
                      @input="
                        cartStore.updateQuantity(
                          product.id,
                          parseInt(($event.target as HTMLInputElement).value),
                        )
                      "
                      class="block w-16 rounded-md border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      min="1"
                    />
                  </div>
                </div>

                <div class="mt-4 flex flex-1 items-end justify-between text-sm">
                  <button
                    @click="cartStore.removeFromCart(product.id)"
                    type="button"
                    class="group -ml-2 flex items-center p-2 text-gray-400 hover:text-gray-500"
                  >
                    <X class="h-5 w-5" aria-hidden="true" />
                    <span class="ml-2 text-sm font-medium">Remove</span>
                  </button>
                </div>
              </div>
            </li>
          </ul>
          <p v-else class="text-gray-500">Your cart is empty.</p>
        </section>

        <!-- Order summary -->
        <section
          aria-labelledby="summary-heading"
          class="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
        >
          <h2 id="summary-heading" class="text-lg font-medium text-gray-900">Order summary</h2>

          <dl class="mt-6 space-y-4">
            <div class="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt class="text-base font-medium text-gray-900">Order total</dt>
              <dd class="text-base font-medium text-gray-900">${{ totalPrice }}</dd>
            </div>
          </dl>

          <div class="mt-6">
            <button
              type="submit"
              class="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              Checkout
            </button>
          </div>
        </section>
      </form>
    </div>
  </div>
</template>
