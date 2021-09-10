<template>
  <div id="resetPassword" class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <img class="mx-auto h-16 w-auto" src="../assets/logo.png" alt="App Logo" />
        <h2 class="mt-4 text-center text-3xl font-extrabold text-gray-900">Reset Password</h2>
      </div>
      <ValidationObserver ref="resetPasswordForm">
        <div class="mt-8">
          <div class="rounded-md">
            <div class="mb-3">
              <label for="email-address" class="sr-only">Email address</label>
              <TextInput
                v-model="email"
                name="Email"
                rules="required|max:255|email|must_exist"
                id="email"
                type="email"
                placeholder="Email Address"
              />
            </div>
            <div class="mb-3">
              <label for="password" class="sr-only">Password</label>
              <TextInput
                v-model="password"
                name="Password"
                rules="required|min:6"
                vid="confirmation"
                id="password"
                type="password"
                placeholder="New Password"
              />
            </div>
            <div class="mb-3">
              <label for="confirm-password" class="sr-only">Confirm Password</label>
              <TextInput
                v-model="password_confirmation"
                name="Confirm Password"
                rules="required|confirmed:confirmation"
                id="confirm"
                type="password"
                placeholder="Confirm New Password"
              />
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
          </div>
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
              bg-blue-600
              hover:bg-blue-700
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
            "
          >
            Go to Login
          </button>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate';
import Vue from 'vue';
import TextInput from '../components/TextInput.vue';
import { mapActions } from 'vuex';

export default {
  name: 'ForgotPassword',
  data() {
    /* v-model data for textboxes */
    return {
      email: '',
      password: '',
      password_confirmation: '',
      isLoading: false,
    };
  },
  components: {
    ValidationObserver,
    TextInput,
  },
  methods: {
    ...mapActions(['handleResetPassword']),
    async submitForm() {
      const valid = await this.$refs.resetPasswordForm.validate();
      if (!valid) return;

      try {
        this.isLoading = true;

        const payload = {
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
          token: this.$route.query.token,
        };

        await this.handleResetPassword(payload);

        this.$router.push({ path: '/login' });
        Vue.$toast.open({
          message: 'Reset password successful!',
          type: 'success',
        });
      } catch (error) {
        if (error.response.status === 429) {
          Vue.$toast.open({
            message: "We've recieved too many requests from you, please try again later.",
            type: 'error',
          });

          this.isLoading = false;
          return;
        }

        let errorMessage = '';
        const errorCode = error.response.data.errorCode;

        switch (errorCode) {
          case 'VALIDATION_ERROR': {
            errorMessage = 'Your email or token is invalid';
            break;
          }
          default:
            errorMessage = 'Oops... Something went wrong on our end. ';
        }

        Vue.$toast.open({
          message: errorMessage,
          type: 'error',
        });
      }

      this.isLoading = false;
    },
    backToLogin() {
      this.$router.push({ path: '/login' });
    },
  },
};
</script>
