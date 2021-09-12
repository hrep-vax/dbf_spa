<template>
  <div class="dashboard">
    <app-navbar></app-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue'

export default {
  components: {
    appNavbar: NavBar
  }
}
</script>
