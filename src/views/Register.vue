<template>
  <div id="register" class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <a href="/">
          <img class="mx-auto h-16 w-auto" src="../assets/logo.png" alt="App Logo"/>
        </a>
        <h2 class="mt-4 text-center text-3xl font-extrabold text-message">Register an account</h2>
      </div>
      <ValidationObserver ref="registrationForm">
        <div class="mt-8 space-y-6">
          <div class="rounded-md">
            <div class="mb-3">
              <label for="register-email" class="sr-only">Email address</label>
              <app-text-input
                  v-model="email"
                  name="Email"
                  rules="required|max:255|email|unique"
                  id="register-email"
                  type="email"
                  placeholder="Email Address"
              />
            </div>
            <div class="mb-3">
              <label for="register-first-name" class="sr-only">First Name</label>
              <app-text-input
                  v-model="first_name"
                  name="First Name"
                  rules="required|max:255"
                  id="register-first-name"
                  placeholder="First Name"
              />
            </div>
            <div class="mb-3">
              <label for="register-last-name" class="sr-only">Last Name</label>
              <app-text-input
                  v-model="last_name"
                  name="Last Name"
                  rules="required|max:255"
                  id="register-last-name"
                  placeholder="Last Name"
              />
            </div>
            <div class="mb-3">
              <label for="register-password" class="sr-only">Password</label>
              <app-text-input
                  v-model="password"
                  name="Password"
                  rules="required|min:6"
                  id="register-password"
                  vid="confirmation"
                  type="password"
                  placeholder="Password"
              />
            </div>
            <div class="mb-3">
              <label for="register-confirm-password" class="sr-only">Confirm Password</label>
              <app-text-input
                  v-model="password_confirmation"
                  name="Confirm Password"
                  rules="required|confirmed:confirmation"
                  id="register-confirm-password"
                  type="password"
                  placeholder="Confirm Password"
              />
            </div>
          </div>

          <div>
            <button
                type="button"
                id="register-submit-btn"
                @click="submitForm"
                :disabled="isLoading"
                class="
                disabled:opacity-50 disabled:cursor-not-allowed
                group
                relative
                w-full
                flex
                justify-center
                py-2
                px-4
                border border-transparent
                text-sm
                font-medium
                rounded-md
                text-white
                bg-primary
                hover:bg-primary-darker
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-darker
                mb-2
              "
            >
              <svg
                  v-if="isLoading"
                  class="animate-spin h-5 w-5 text-white"
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
              <p v-else>Submit</p>
            </button>
            <button
                type="button"
                v-on:click="backToLogin"
                class="
                group
                relative
                w-full
                flex
                justify-center
                py-2
                px-4
                border border-transparent
                text-sm
                font-medium
                rounded-md
                text-white
                bg-gray-400
                hover:bg-gray-300
                hover:text-message
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100
              "
            >
              Go back
            </button>
          </div>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import {ValidationObserver} from 'vee-validate';
import {mapActions} from 'vuex';
import TextInput from '../components/TextInput.vue';
import Vue from 'vue';

export default {
  name: 'Register',
  components: {
    ValidationObserver,
    appTextInput: TextInput
  },
  data() {
    /* v-model data for textboxes */
    return {
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      password_confirmation: '',
      isLoading: false
    }
  },
  methods: {
    ...mapActions(['handleRegistration']),
    async submitForm() {
      const valid = await this.$refs.registrationForm.validate()
      if (!valid) return

      try {
        this.isLoading = true

        const payload = {
          email: this.email,
          first_name: this.first_name,
          last_name: this.last_name,
          password: this.password,
          password_confirmation: this.password_confirmation
        }

        await this.handleRegistration(payload)

        this.$router.push({name: 'home'}).catch(err => err)

        Vue.$toast.open({
          message: 'Welcome, ' + this.first_name + '!',
          type: 'success',
        })
      } catch (error) {
        if (error.response.status === 429) {
          Vue.$toast.open({
            message: "We've received too many requests from you, please try again later.",
            type: 'error'
          })

          this.isLoading = false
          return
        }

        let errorMessage = ''
        const errorCode = error.response.data.errorCode

        switch (errorCode) {
          case 'VALIDATION_ERROR': {
            errorMessage = 'Invalid email/password'
            break
          }
          default:
            errorMessage = 'Oops... Something went wrong on our end.'
        }

        Vue.$toast.open({
          message: errorMessage,
          type: 'error'
        })
      }

      this.isLoading = false
    },

    backToLogin() {
      this.$router.push({name: 'login'})
    }
  }
}
</script>
