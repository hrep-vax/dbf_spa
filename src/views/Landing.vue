<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
    <div class="text-center">
      <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
        <span class="block xl:inline">Welcome to</span>
        {{ ' ' }}
        <span class="block text-blue-600 xl:inline">Scaffold.IO</span>
      </h1>
      <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
        The VueJS + Tailwind.CSS starter kit for SPA projects
      </p>
      <div class="mt-5 sm:mt-8 flex justify-center">
        <div v-if="!getUserIsAuthenticated" class="rounded-md shadow">
          <a href="/login"
             class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
            Login
          </a>
        </div>
        <div v-if="!getUserIsAuthenticated" class="mt-3 sm:mt-0 sm:ml-3">
          <a href="/register"
             class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10">
            Sign-up
          </a>
        </div>
        <div v-if="getUserIsAuthenticated" class="mt-3 sm:mt-0 sm:ml-3">
          <a href="/dashboard/home"
             class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10">
            Go to Home Page
          </a>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
const navigation = [
  {name: 'Product', href: '#'},
  {name: 'Features', href: '#'},
  {name: 'Marketplace', href: '#'},
  {name: 'Company', href: '#'},
]

export default {
  components: {},
  setup() {
    return {
      navigation,
    }
  },
  computed: {
    ...mapGetters(['getUserIsAuthenticated', 'getAuthUser'])
  },
  methods: {
    gotoRegister() {
      this.$router.push({path: "/register"})
    },
    gotoLogin() {
      this.$router.push({path: "/login"})
    }
  },
}
</script>