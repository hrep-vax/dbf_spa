<template>
  <div>
    <div
        v-if="getTokenIsExpiredState"
        class="
        overflow-x-hidden overflow-y-auto
        fixed
        inset-0
        z-50
        outline-none
        focus:outline-none
        justify-center
        items-center
        flex
      "
    >
      <div class="relative mx-auto max-w-xl w-full">
        <!--Start Content-->
        <ValidationObserver ref="reauthForm">
          <form @submit.prevent="onSubmit" class="mt-8">
            <div
                class="
                border-0
                rounded-lg
                shadow-lg
                relative
                flex flex-col
                w-full
                bg-white
                outline-none
                focus:outline-none
              "
            >
              <!--header-->
              <div class="py-5 px-6 border-b border-solid border-blueGray-200 rounded-t">
                <h3 class="text-xl font-semibold leading-6 text-message-darker font">Login Session Expired</h3>
                <p class="mt-1 text-sm text-message">Please login to continue your session</p>
              </div>
              <!-- Start Body -->
              <div class="grid grid-cols-4 gap-6 py-5 px-6">
                <label for="reauth-email" class="text-sm font-medium text-message my-auto"> Email </label>
                <div class="col-span-3">
                  <app-text-input
                      v-model="email"
                      name="Email"
                      rules="required|max:255|email"
                      id="reauth-email"
                      type="email"
                      placeholder="Email Address"
                  />
                </div>
              </div>
              <div class="hidden sm:block" aria-hidden="true">
                <div class="">
                  <div class="border-t border-gray-200"/>
                </div>
              </div>
              <div class="grid grid-cols-4 gap-6 py-5 px-6">
                <label for="reauth-password" class="text-sm font-medium text-message my-auto"> Password </label>
                <div class="col-span-3">
                  <app-text-input
                      v-model="password"
                      name="Password"
                      rules="required|min:6"
                      id="reauth-password"
                      type="password"
                      placeholder="Password"
                  />
                </div>
              </div>
              <!-- End Body -->
              <!-- Start Action Buttons -->
              <div class="flex items-center justify-end py-5 px-6 border-t border-solid border-primary-soft rounded-b">
                <button
                    id="reauth-submit-btn"
                    type="submit"
                    :disabled="isLoading"
                    class="
                    disabled:opacity-50 disabled:cursor-not-allowed
                    group
                    relative
                    flex
                    py-2
                    px-5
                    border border-transparent
                    text-sm
                    font-medium
                    rounded-md
                    text-white
                    bg-primary
                    hover:bg-primary-darker
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
                  <p v-else>Sign In</p>
                </button>
              </div>
              <!-- End Action Buttons -->
            </div>
          </form>
        </ValidationObserver>
        <!--Start Content-->
      </div>
    </div>
    <div v-if="getTokenIsExpiredState" class="opacity-40 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {ValidationObserver} from 'vee-validate'
import TextInput from './TextInput.vue'
import Vue from 'vue'

export default {
  data() {
    return {
      showModal: false,
      isLoading: false,
      email: '',
      password: ''
    }
  },
  components: {
    ValidationObserver,
    appTextInput: TextInput
  },
  computed: {
    ...mapGetters(['getTokenIsExpiredState'])
  },
  methods: {
    ...mapActions(['handleSetTokenExpirationState', 'handleLogin']),
    async onSubmit() {
      try {
        const valid = await this.$refs.reauthForm.validate()
        if (!valid) return

        this.isLoading = true

        await this.handleLogin({email: this.email, password: this.password})
        this.handleSetTokenExpirationState(false)
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
          case 'VALIDATION_ERROR':
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
