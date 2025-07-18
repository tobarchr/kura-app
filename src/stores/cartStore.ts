import { defineStore } from 'pinia'
import type { Product } from './productStore'

export interface CartItem extends Product {
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),
  getters: {
    itemCount: (state) => {
      return state.items.reduce((count, item) => count + item.quantity, 0)
    },
    totalPrice: (state) => {
      return state.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
    },
  },
  actions: {
    addToCart(product: Product) {
      const existingItem = this.items.find((item) => item.id === product.id)

      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
    },
    removeFromCart(productId: number) {
      this.items = this.items.filter((item) => item.id !== productId)
    },
    updateQuantity(productId: number, quantity: number) {
      const item = this.items.find((item) => item.id === productId)
      if (item) {
        if (quantity > 0) {
          item.quantity = quantity
        } else {
          // If quantity is 0 or less, remove the item
          this.removeFromCart(productId)
        }
      }
    },
  },
})
