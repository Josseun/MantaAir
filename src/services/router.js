import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: () => import("@/page/Hero.vue"),
    meta: { hideNavber: true, hideFooter: true },
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/page/HomePage.vue"),
    meta: { hideNavbar: true, requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/page/Login.vue"),
    meta: { hideNavber: true, hideFooter: true },
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("@/page/Signup.vue"),
    meta: { hideNavber: true, hideFooter: true },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/page/Profile.vue"),
  },
  {
    path: "/ExplorePage",
    name: "Explore",
    component: () => import("@/page/ExploreView.vue"),
  },

  {
    path: "/ConfirmationPage",
    name: "Confirmation",
    component: () => import("@/page/ConfirmationPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/booking",
    name: "Booking",
    component: () => import("@/page/Booking.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/page/Dashboard.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0, behavior: "smooth" };
  },
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("user_token");
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;
