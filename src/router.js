import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

var router = new Router({
  routes: [
    { path: "/login", name: "login", component: () => import("@/views/login") },
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/home"),
      redirect: "/welcome",
      children: [
        { path: "/welcome", name: "welcome", component: () => import("@/views/welcome") }
      ]
    }
  ]
});
router.beforeEach((to, from, next) => {
  // 获取token
  let token = window.sessionStorage.getItem("token");
  if (!token && to.path !== "/login") {
    return next("/login");
  }
  next();
});

export default router;
