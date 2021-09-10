<template>
  <div id="register" class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <a href="/">
          <img class="mx-auto h-16 w-auto" src="../assets/logo.png" alt="App Logo" />
        </a>
        <h2 class="mt-4 text-center text-3xl font-extrabold text-gray-900">
            Register an account
        </h2>
        
      </div>
      <ValidationObserver v-slot="{ invalid }">
        <form @submit.prevent="onSubmit" class="mt-8 space-y-6">
          <div class="rounded-md">
            <div class="mb-3">
              <label for="email-address" class="sr-only">Email address</label>
              <TextInput v-model="email" name="Email" rules="required|max:255|email|unique" id="email" type="email" placeholder="Email Address" />
            </div>
            <div class="mb-3">
              <label for="first-name" class="sr-only">First Name</label>
              <TextInput v-model="first_name" name="First Name" rules="required|max:255|alpha_spaces" id="first-name" placeholder="First Name" />
            </div>
            <div class="mb-3">
              <label for="last-name" class="sr-only">Last Name</label>
              <TextInput v-model="last_name" name="Last Name" rules="required|max:255|alpha_spaces" id="last-name" placeholder="Last Name" />
            </div>
            <div class="mb-3">
              <label for="password" class="sr-only">Password</label>
              <TextInput v-model="password" name="Password" rules="required|min:6" id="password" vid="confirmation" type="password" placeholder="Password" />
            </div>
            <div class="mb-3">
              <label for="confirm-password" class="sr-only">Confirm Password</label>
              <TextInput v-model="password_confirmation" name="Confirm Password" rules="required|confirmed:confirmation" id="confirm" type="password" placeholder="Confirm Password" />
            </div>
          </div>

          <div>
            <button type="submit" :disabled="invalid" class="disabled:opacity-50 disabled:cursor-not-allowed group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-2">
              Submit
            </button>
            <button type="button" v-on:click="backToLogin" class=" group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Go back
            </button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
  import { ValidationObserver } from 'vee-validate';
  import { mapActions } from 'vuex';
  import TextInput from '../components/TextInput.vue';
  import Vue from 'vue';

  export default {
      name: "Register",
      components: {
        ValidationObserver,
        TextInput
      },
      data () {
        /* v-model data for textboxes */
        return {
          email: "",
          first_name: "",
          last_name: "",
          password: "",
          password_confirmation : "",
          isLoading: false
        }
      },
      methods: {
        ...mapActions(['handleRegistration']),
        async onSubmit() {
          try {
            this.isLoading = true
            
            const payload = {
              "email" : this.email,
              "first_name": this.first_name,
              "last_name": this.last_name,
              "password": this.password,
              "password_confirmation": this.password_confirmation
            }

            await this.handleRegistration(payload)

            this.$router.push({path: "/dashboard/home"})

            Vue.$toast.open({
                message: "Welcome, " + this.first_name + "!",
                type: "success"
            });
          }
          catch (error) {
            let errorMessage = ''
            const errorCode = error.response.data.errorCode

            console.log("error", error.response.data)

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
                type: "error"
            });
          }

          this.isLoading = false;
        },

        backToLogin() {
          this.$router.push({path: "/login"})
        },
      }
  }
</script>
