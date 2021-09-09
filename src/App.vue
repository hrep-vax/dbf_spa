<template>
  <div id="app">
    <ReauthenticateModal/>
    <router-view />
  </div>
</template>

<script>

  import axios from 'axios'
  import { mapActions } from 'vuex';

  import ReauthenticateModal from './components/ReauthenticateModal.vue'

  export default {

    name: "Login",
    components: {
      ReauthenticateModal
    },
    methods: {
      ...mapActions(['handleSetTokenExpirationState']),
    },
    created() {
      axios.interceptors.response.use(
        response => response,
        error => {
          if(  error.response ) {
            const errorCode = error.response.data.errorCode

            if (errorCode === 'UNAUTHENTICATED_ERROR') {
              localStorage.removeItem('WEB_APP_KIT_TOKEN')
              localStorage.removeItem('WEB_APP_KIT_USER')
              this.handleSetTokenExpirationState(true)
            }

            return Promise.reject(error)
          }
        }
      )
    },
  }

</script> 