<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { ShoppingCart, Menu, LogOut, X } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/authStore'
import { useCartStore } from '@/stores/cartStore'
import { storeToRefs } from 'pinia'
import logo from '@/assets/logo.svg'

const authStore = useAuthStore()
const { isLoggedIn } = storeToRefs(authStore)

const cartStore = useCartStore()
const { itemCount } = storeToRefs(cartStore)

const router = useRouter()
const isMobileMenuOpen = ref(false)

const handleLogout = async () => {
  await authStore.handleLogout()
  isMobileMenuOpen.value = false
  router.push('/')
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <header class="bg-white shadow-sm sticky top-0 z-20">
    <nav class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <RouterLink to="/" class="text-2xl font-bold text-gray-800" @click="closeMobileMenu">
            <img :src="logo" alt="Oak City Hauling Logo" class="h-20 w-auto" />
          </RouterLink>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <RouterLink
              to="/"
              class="text-gray-500 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
              >Home</RouterLink
            >
            <RouterLink
              to="/about"
              class="text-gray-500 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
              >About</RouterLink
            >
            <RouterLink
              to="/mission"
              class="text-gray-500 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
              >Mission</RouterLink
            >
            <RouterLink
              v-if="isLoggedIn"
              to="/dashboard"
              class="text-gray-500 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
              >Dashboard</RouterLink
            >
          </div>
        </div>

        <!-- Right side icons (Desktop) -->
        <div class="hidden md:flex items-center space-x-2">
          <div v-if="!isLoggedIn" class="flex items-center space-x-2">
            <RouterLink
              to="/login"
              class="text-gray-500 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
              >Login</RouterLink
            >
            <RouterLink
              to="/signup"
              class="bg-indigo-600 text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium"
              >Sign Up</RouterLink
            >
          </div>
          <button
            v-if="isLoggedIn"
            @click="handleLogout"
            class="flex items-center p-2 rounded-full text-gray-400 hover:text-gray-800"
            aria-label="Logout"
          >
            <LogOut class="h-6 w-6" />
          </button>
          <RouterLink
            to="/cart"
            class="relative p-2 rounded-full text-gray-400 hover:text-gray-800"
            aria-label="Shopping Cart"
          >
            <ShoppingCart class="h-6 w-6" />
            <span
              v-if="itemCount > 0"
              class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white"
            >
              {{ itemCount }}
            </span>
          </RouterLink>
        </div>

        <!-- Mobile Menu Button -->
        <div class="flex md:hidden items-center">
          <RouterLink
            to="/cart"
            class="relative p-2 rounded-full text-gray-400 hover:text-gray-800 mr-2"
            aria-label="Shopping Cart"
          >
            <ShoppingCart class="h-6 w-6" />
            <span
              v-if="itemCount > 0"
              class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white"
            >
              {{ itemCount }}
            </span>
          </RouterLink>
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="p-2 rounded-md text-gray-400 hover:text-gray-800"
            aria-controls="mobile-menu"
            :aria-expanded="isMobileMenuOpen"
          >
            <span class="sr-only">Open main menu</span>
            <X v-if="isMobileMenuOpen" class="h-6 w-6" />
            <Menu v-else class="h-6 w-6" />
          </button>
        </div>
      </div>
    </nav>

    <!-- Mobile Menu, show/hide based on menu state. -->
    <div v-if="isMobileMenuOpen" class="md:hidden" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <RouterLink
          to="/"
          @click="closeMobileMenu"
          class="text-gray-500 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium"
          >Home</RouterLink
        >
        <RouterLink
          to="/about"
          @click="closeMobileMenu"
          class="text-gray-500 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium"
          >About</RouterLink
        >
        <RouterLink
          to="/mission"
          @click="closeMobileMenu"
          class="text-gray-500 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium"
          >Mission</RouterLink
        >
        <RouterLink
          v-if="isLoggedIn"
          to="/dashboard"
          @click="closeMobileMenu"
          class="text-gray-500 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium"
          >Dashboard</RouterLink
        >
      </div>
      <div class="pt-4 pb-3 border-t border-gray-200">
        <div v-if="!isLoggedIn" class="px-5 space-y-2">
          <RouterLink
            to="/login"
            @click="closeMobileMenu"
            class="block w-full text-left bg-gray-100 text-gray-800 px-3 py-2 rounded-md text-base font-medium"
            >Login</RouterLink
          >
          <RouterLink
            to="/signup"
            @click="closeMobileMenu"
            class="block w-full text-left bg-indigo-600 text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-base font-medium"
            >Sign Up</RouterLink
          >
        </div>
        <div v-if="isLoggedIn" class="px-5">
          <button
            @click="handleLogout"
            class="w-full flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            aria-label="Logout"
          >
            <LogOut class="h-6 w-6 mr-2" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
