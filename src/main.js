import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";

import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

import './util/validation';

Vue.config.productionTip = false;

/* toast initial configuration */
Vue.use(VueToast, {
  position: "top",
  dimissible: "true",
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
