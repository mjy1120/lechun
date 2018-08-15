import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/me/signUp/signUp.vue'
import Me from "@/views/me/me"
import indexPage from "@/views/indexpage"
let router = new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      redirect: "/indexPage"
    },
    {
      path: "/indexPage",
      name: "indexPage",
      component: indexPage,
      meta: {
        title: "首页"
      }
    },
    {
      path: "/person",
      name: "Person",
      component: () => import("@/views/me/me"),
      meta: {
        title: "个人中心"
      }
    }, {
      path: "/payment",
      name: "payment",
      component: () => import("@/views/me/payment/index"),
      redirect: "/payment/all",
      children: [{
        path: "all",
        name: "all",
        component: () => import("@/views/me/payment/components/all")
      }, {
        path: "nopay",
        name: "nopay",
        component: () => import("@/views/me/payment/components/nopay")
      }, {
        path: "nosend",
        name: "nosend",
        component: () => import("@/views/me/payment/components/nosend")
      }, {
        path: "noput",
        name: "noput",
        component: () => import("@/views/me/payment/components/noput")
      }, {
        path: "notell",
        name: "notell",
        component: () => import("@/views/me/payment/components/notell")
      }]
    }, {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        title: "登录"
      }
    },
    {
      path: "/detail/:id",
      name: "Detail",
      component: () => import("@/views/home/components/detail"),
      meta: {
        title: "详情"
      }
    },
    {
      path: "/balance",
      name: "balance",
      component: () => import("@/components/shopcar/balance"),
      meta: {
        title: "确认订单"
      }
    },
    {
      path: "/selectAddress",
      name: "selectAddress",
      component: () => import("@/components/address/select_address"),
      meta: {
        title: "设置地址"
      }
    },
    {
      path: "/address",
      name: "address",
      component: () => import("@/components/address/add_address"),
      meta: {
        title: "收货地址"
      }
    }
  ]
})
const decludeRouter = ["indexPage", "Login"];
router.beforeEach((to, from, next) => {
  if (decludeRouter.indexOf(to.name) !== -1) {
    next();
    return;
  }

  if (document.cookie.indexOf('token') == -1) {
    router.push("/login")
  } else {
    next();
  }
});
router.afterEach((to, from) => {
  document.title = to.meta.title || "乐纯"
})
Vue.use(Router);
export default router;