<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
const authStore = useAuthStore()
</script>

<template>
  <div class="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <h1 class="text-4xl font-bold text-gray-800">My Dashboard</h1>
    <div v-if="authStore.user" class="mt-6">
      <p class="text-lg text-gray-600">Welcome back, {{ authStore.user.email }}!</p>
      <p class="mt-2 text-gray-500">This is your personal dashboard. More features coming soon!</p>
    </div>
  </div>
</template>
