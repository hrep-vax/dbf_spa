<template>
  <header class="text-message body-font">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <div class="flex title-font font-medium items-center text-message mb-4 md:mb-0">
        <router-link :to="{name: 'home'}">
          <img class="mx-auto h-11 w-auto" src="../assets/logo.png" alt="App Logo"/>
        </router-link>
      </div>
      <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 flex flex-wrap items-center text-base justify-center">
        <router-link class="mr-5 hover:text-message hover:underline" :to="{name: 'home'}">Home</router-link>
        <router-link class="mr-5 hover:text-message hover:underline" :to="{name: 'profile'}">Profile</router-link>
        <router-link class="mr-5 hover:text-message hover:underline" :to="{name: 'dbf_view'}">DBF</router-link>
        <!--<router-link class="mr-5 hover:text-message hover:underline" :to="{name: 'dbf_add'}">DBF- ADD</router-link>-->
        <router-link class="mr-5 hover:text-message hover:underline" :to="{name: 'check_view'}">CHECK</router-link>
      </nav>
      <button
          id="logout-btn"
          type="button"
          v-on:click="logout"
          :disabled="isLoading"
          class="
          disabled:opacity-50 disabled:cursor-not-allowed
          inline-flex
          items-center
          bg-gay-100
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
import {mapActions} from 'vuex'
import Vue from 'vue'
import {handleVuexApiCall} from '../util/helper'

export default {
  data: () => ({
    isLoading: false
  }),
  methods: {
    ...mapActions(['handleLogout']),
    async logout() {

      this.isLoading = true

      const result = await handleVuexApiCall(this.handleLogout, {})

      if (result.success) this.$router.push({name: 'landing'}).catch(err => err)
      else Vue.$toast.open({ message: result.error.message, type: result.error.type })

      this.isLoading = false
    }
  }
}
</script>
