<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/NavBar.vue'
import Footer from './components/TheFooter.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <Navbar />

    <!-- The 'flex-grow' class is the key. It makes this main element expand
         to fill all available space, pushing the footer down. -->
    <main class="flex-grow">
      <RouterView />
    </main>

    <Footer />
  </div>
</template>
