<template>
  <div class="changePassword mt-14 mx-auto border max-w-3xl rounded-xl shadow-lg overflow-hidden p-8">
    <div class="md:col-span-1 mb-10">
      <div class="sm:px-0">
        <h3 class="text-xl font-semibold leading-6 text-message font">Change Password</h3>
      </div>
    </div>
    <ValidationObserver ref="changePasswordForm">
      <div class="mt-8">
        <div class="grid grid-cols-3 gap-6 mb-4 sm:mb-0">
          <label for="old_password" class="text-sm font-medium text-message my-auto"> Current Password </label>
          <div class="col-span-2">
            <app-text-input
              v-model="old_password"
              name="Password"
              rules="required|min:6"
              id="old_password"
              type="password"
            />
          </div>
        </div>
        <div class="hidden sm:block" aria-hidden="true">
          <div class="py-5">
            <div class="border-t border-gray-200" />
          </div>
        </div>
        <div class="grid grid-cols-3 gap-6 mb-4 sm:mb-0">
          <label for="password" class="text-sm font-medium text-message my-auto"> New Password </label>
          <div class="col-span-2">
            <app-text-input
              v-model="password"
              name="Password"
              rules="required|min:6"
              vid="confirmation"
              id="password"
              type="password"
            />
          </div>
        </div>

        <div class="hidden sm:block" aria-hidden="true">
          <div class="py-5">
            <div class="border-t border-gray-200" />
          </div>
        </div>
        <div class="grid grid-cols-3 gap-6 mb-4 sm:mb-0">
          <label for="confirm" class="text-sm font-medium text-message my-auto"> Confirm Password </label>
          <div class="col-span-2">
            <app-text-input
              v-model="password_confirmation"
              name="Confirm Password"
              rules="required|confirmed:confirmation"
              id="confirm"
              type="password"
            />
          </div>
        </div>

        <div class="grid justify-items-end mt-6">
          <button
            type="button"
            @click="submitForm"
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
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-darker
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
        </div>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import Vue from 'vue'
import TextInput from '../components/TextInput.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    ValidationObserver,
    appTextInput: TextInput
  },
  data() {
    /* v-model data for textboxes */
    return {
      old_password: '',
      password: '',
      password_confirmation: '',
      isLoading: false
    };
  },
  methods: {
    ...mapActions(['handleChangePassword']),
    async submitForm() {
      const valid = await this.$refs.changePasswordForm.validate()
      if (!valid) return

      try {
        this.isLoading = true

        const payload = {
          old_password: this.old_password,
          password: this.password,
          password_confirmation: this.password_confirmation
        }

        await this.handleChangePassword(payload)

        Vue.$toast.open({
          message: 'Your password has been changed successfully!',
          type: 'success'
        });
      } catch (error) {
        if (error.response.status === 429) {
          Vue.$toast.open({
            message: "We've recieved too many requests from you, please try again later.",
            type: 'error'
          })

          this.isLoading = false
          return
        }

        console.log('error', error.response.data)
        let errorMessage = ''
        const errorCode = error.response.data.errorCode

        switch (errorCode) {
          case 'VALIDATION_ERROR': {
            errorMessage = 'Current password is incorrect'
            break
          }
          case 'UNAUTHENTICATED_ERROR': {
            errorMessage = 'Session is expired'
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
    }
  }
}
</script>
