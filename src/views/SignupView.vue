<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import warehouse_image from '@/assets/warehouse.png' // Make sure this path is correct

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const first_name = ref('') // New reactive variable
const last_name = ref('') // New reactive variable
const phone_number = ref('') // New reactive variable
const message = ref('')

const handleSignup = async () => {
  await authStore.handleSignup({
    email: email.value,
    password: password.value,
    first_name: first_name.value, // Pass to authStore
    last_name: last_name.value, // Pass to authStore
    phone_number: phone_number.value, // Pass to authStore
  })
  if (!authStore.error) {
    message.value = 'Success! Please check your email for a confirmation link.'
    // Supabase sends a confirmation email by default.
    // In a real app, you'd wait for the user to click the link.
    // For this demo, we can redirect them after a short delay.
    setTimeout(() => {
      router.push('/dashboard')
    }, 3000)
  }
}
</script>

<template>
  <div class="flex min-h-screen bg-white">
    <div
      class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
    >
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <h2 class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create an account
          </h2>
          <p class="mt-2 text-sm leading-6 text-gray-500">
            Already have an account?
            {{ ' ' }}
            <RouterLink to="/login" class="font-semibold text-indigo-600 hover:text-indigo-500"
              >Sign in</RouterLink
            >
          </p>
        </div>

        <div class="mt-10">
          <div>
            <form class="space-y-6" @submit.prevent="handleSignup">
              <div>
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
                  >Email address</label
                >
                <div class="mt-2">
                  <input
                    v-model="email"
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
                  >Password</label
                >
                <div class="mt-2">
                  <input
                    v-model="password"
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="new-password"
                    required
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label for="first_name" class="block text-sm font-medium leading-6 text-gray-900"
                  >First Name</label
                >
                <div class="mt-2">
                  <input
                    v-model="first_name"
                    id="first_name"
                    name="first_name"
                    type="text"
                    autocomplete="given-name"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label for="last_name" class="block text-sm font-medium leading-6 text-gray-900"
                  >Last Name</label
                >
                <div class="mt-2">
                  <input
                    v-model="last_name"
                    id="last_name"
                    name="last_name"
                    type="text"
                    autocomplete="family-name"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label for="phone_number" class="block text-sm font-medium leading-6 text-gray-900"
                  >Phone Number</label
                >
                <div class="mt-2">
                  <input
                    v-model="phone_number"
                    id="phone_number"
                    name="phone_number"
                    type="tel"
                    autocomplete="tel"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div v-if="authStore.error" class="text-red-500 text-sm">
                {{ authStore.error }}
              </div>
              <div v-if="message" class="text-green-600 text-sm">
                {{ message }}
              </div>

              <div>
                <button
                  type="submit"
                  :disabled="authStore.loading"
                  class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
                >
                  {{ authStore.loading ? 'Creating account...' : 'Create account' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="relative hidden w-0 flex-1 lg:block">
      <img
        class="absolute inset-0 h-full w-full object-cover"
        alt="A collection of sustainable products"
        :src="warehouse_image"
      />
    </div>
  </div>
</template>
