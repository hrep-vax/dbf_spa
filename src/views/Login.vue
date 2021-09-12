<template>
  <div id="login" class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <router-link :to="{name: 'landing'}" id="login-landing-link">
          <img class="mx-auto h-20 w-auto" src="../assets/logo.png" alt="App Logo"/>
        </router-link>
        <h2 class="text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
      </div>
      <ValidationObserver ref="loginForm">
        <div class="mt-8 space-y-6">
          <div class="rounded-md -space-y-px">
            <div class="mb-4">
              <label for="login-email" class="sr-only">Email Address</label>
              <app-text-input
                  v-model="email"
                  name="Email"
                  rules="required|max:255|email"
                  id="login-email"
                  type="email"
                  placeholder="Email Address"
              />
            </div>
            <div>
              <label for="login-password" class="sr-only">Password</label>
              <app-text-input
                  v-model="password"
                  name="Password"
                  rules="required"
                  id="login-password"
                  type="password"
                  placeholder="Password"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" class="ml-1"/>
              <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label>
            </div>
            <div class="text-sm">
              <router-link :to="{name: 'forgot-password'}" class="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </router-link>
            </div>
          </div>

          <div>
            <button
                type="button"
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
                bg-blue-600
                hover:bg-blue-700
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
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
              <p v-else>Sign in</p>
            </button>
          </div>

          <div class="text-sm text-center space-x-1">
            <div class="inline-block">
              <p>Don't have an account yet?</p>
            </div>
            <div class="inline-block">
              <router-link :to="{name: 'register'}" class="font-medium text-blue-600 hover:text-blue-500"> Sign up!
              </router-link>
            </div>
          </div>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import TextInput from '../components/TextInput.vue'
import {ValidationObserver} from 'vee-validate'
import {mapActions} from 'vuex'

export default {
  components: {
    ValidationObserver,
    appTextInput: TextInput
  },
  data: () => ({
    /* v-model data for textboxes */
    email: '',
    password: '',
    isLoading: false
  }),
  methods: {
    ...mapActions(['handleLogin']),
    async submitForm() {
      const valid = await this.$refs.loginForm.validate()
      if (!valid) return

      try {
        this.isLoading = true;
        await this.handleLogin({email: this.email, password: this.password})
        this.$router.push({name: 'dashboard'}).catch(err => err)
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
          case 'INVALID_CREDENTIALS_ERROR': {
            errorMessage = 'Incorrect email or password'
            break
          }
          default:
            errorMessage = 'Oops... Something went wrong on our end. '
        }

        Vue.$toast.open({
          message: errorMessage,
          type: 'error'
        })
      }

      this.isLoading = false
    }
  }
}
</script>
