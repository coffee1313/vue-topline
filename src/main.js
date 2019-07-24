import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// 引入全局样式
import "@/assets/css/online.css";

// 引入element
import ElementUi from "element-ui";
// 引入axios
import axios from "axios";
axios.defaults.baseURL = "http://ttapi.research.itcast.cn/mp/v1_0/";
Vue.prototype.$axios = axios;

Vue.use(ElementUi);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
