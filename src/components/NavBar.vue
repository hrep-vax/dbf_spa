<template>
  <header class="text-gray-600 body-font">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <a href="/dashboard/home" class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <a href="/">
          <img class="mx-auto h-11 w-auto" src="../assets/logo.png" alt="App Logo" />
        </a>
      </a>
      <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 flex flex-wrap items-center text-base justify-center">
        <router-link class="mr-5 hover:text-gray-900 hover:underline" to="/dashboard/home">Home</router-link>
        <router-link class="mr-5 hover:text-gray-900 hover:underline" to="/dashboard/profile">Profile</router-link>
      </nav>
      <button
        type="button"
        v-on:click="logout"
        :disabled="isLoading"
        class="
          disabled:opacity-50 disabled:cursor-not-allowed
          inline-flex
          items-center
          bg-gray-100
          border-0
          py-2
          px-4
          focus:outline-none
          hover:bg-gray-200
          rounded
          text-sm
          mt-4
          md:mt-0
          font-medium
        "
      >
        <svg
          v-if="isLoading"
          class="animate-spin h-5 w-5 text-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p v-else>Logout</p>
      </button>
    </div>
  </header>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'NavBar',
  data: () => ({
    isLoading: false,
  }),
  methods: {
    ...mapActions(['handleLogout']),
    async logout() {
      try {
        this.isLoading = true;
        await this.handleLogout();
        this.$router.push({ path: '/' });
      } catch (error) {
        console.log(error);
      }

      this.isLoading = false;
    },
  },
};
</script>
