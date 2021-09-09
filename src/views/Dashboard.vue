<template>
  <div class="dashboard">
    <NavBar></NavBar>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/NavBar.vue";

export default {
  name: "Dashboard",
  components: {
    NavBar
  },
};
</script>
