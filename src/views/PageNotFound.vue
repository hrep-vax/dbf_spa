<template>
  <div class=" w-screen h-screen justify-center bg-gray-100 flex items-center">
    <div class="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
      <div class="max-w-md">
        <p class="text-2xl md:text-3xl font-light leading-normal">Sorry we couldn't find this page. </p>
        <p class="mb-8 mt-1">But dont worry, you can find plenty of other things on our homepage.</p>
        <button @click="goToLogin"
                class="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-md focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700">
          Proceed to Login
        </button>
      </div>
      <div class="max-w-lg">
        <img src="../assets/pagenotfound.svg"/>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToLogin() {
      this.$router.push({name: 'login'}).catch(err => err)
    }
  }
}
</script>