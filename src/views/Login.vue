<template>
  <div id="login" class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <img class="mx-auto h-16 w-auto" src="../assets/logo.png" alt="App Logo" />
        <h2 class="mt-4 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        
      </div>
      <ValidationObserver v-slot="{ invalid }">
        <form @submit.prevent="onSubmit" class="mt-8 space-y-6" >
          <div class="rounded-md -space-y-px">
              <div class="mb-4">
                <label for="email" class="sr-only">Email Address</label>
                <TextInput v-model="email" name="Email" rules="required|max:255|email" id="email" type="email" placeholder="Email Address" />
              </div>
              <div>
                <label for="password" class="sr-only">Password</label>
                <TextInput v-model="password" name="Password" rules="required|min:6" id="password" type="password" placeholder="Password" />
              </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" class="ml-1" />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div class="text-sm">
              <a href="/forgot-password" class="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button type="submit" :disabled="invalid" class="disabled:opacity-50 disabled:cursor-not-allowed group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Sign in
            </button>
          </div>

          <div class="text-sm text-center space-x-1">
              <div class="inline-block">
                  <p>Don't have an account yet?</p>
              </div>
              <div class="inline-block">
                  <a href="/register" class="font-medium text-blue-600 hover:text-blue-500">
                      Sign up!
                  </a>
              </div>
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
      name: "Login",
      data () {
        /* v-model data for textboxes */
        return {
          email : "",
          password: "",
          isLoading: false
        }
      },
      components: {
        ValidationObserver,
        TextInput
      },
      methods: {
        ...mapActions(['handleLogin']),
        async onSubmit() {
          try {
            this.isLoading = true
            
            await this.handleLogin({email: this.email, password: this.password})
            this.$router.push({path: "/dashboard/home"})
          }
          catch (error) {
            let errorMessage = ''
            const errorCode = error.response.data.errorCode

            switch (errorCode) {
              case 'VALIDATION_ERROR': 
              case 'INVALID_CREDENTIALS_ERROR': {
                errorMessage = 'Incorrect email or password'
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
    }
  }
</script>
