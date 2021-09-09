<template>
  <div id="forgotPassword" class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <img class="mx-auto h-16 w-auto" src="../assets/logo.png" alt="App Logo" />
        <h2 class="mt-4 text-center text-3xl font-extrabold text-gray-900">
          Forgot your password?
        </h2>
        
      </div>

      <ValidationObserver v-slot="{ invalid }">
        <form @submit.prevent="onSubmit" class="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <div class="rounded-md -space-y-px">
            <div>
              <label for="email-address" class="sr-only">Email address</label>
              <TextInput v-model="email" name="Email" rules="required|max:255|email|must_exist" id="email" type="email" placeholder="Email Address" />
            </div>
          </div>

          <div>
            <button type="submit" :disabled="invalid" class="disabled:opacity-50 disabled:cursor-not-allowed group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-2">
                <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p v-else>Submit</p>
            </button>
            
            <button type="button" v-on:click="backToLogin" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Go back
            </button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import TextInput from '../components/TextInput.vue'
  import { ValidationObserver } from 'vee-validate'
  import { mapActions } from 'vuex' 

  export default {
    name: "ForgotPassword",
    data () {
      /* v-model data for textboxes */
      return {
        email: "",
        isLoading: false
      }
    },
    components: {
      TextInput,
      ValidationObserver
    },
    methods: {
      ...mapActions(['handleForgotPassword']),
      async onSubmit() {
        try {
          this.isLoading = true
          
          await this.handleForgotPassword(this.email)

          Vue.$toast.open({
              message: "Verification message sent! Please check your email.",
              type: "success"
          });
        }
        catch (error) {
          let errorMessage = ''
          const errorCode = error.response.data.errorCode

          switch (errorCode) {
            case 'SMTP_ERROR': {
              errorMessage = 'Email sending failed. Please try again.'
              break
            }
            default:
              errorMessage = 'Oops... Something went wrong on our end. Please contact your server administrator.'
          }

          Vue.$toast.open({
              message: errorMessage,
              type: "error"
          });
        }

        this.isLoading = false;
      },
      backToLogin() {
        this.$router.push({path: "/login"})
      }
    }
  };
</script>
