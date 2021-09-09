import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Register from "../views/Register.vue";
import ResetPassword from "../views/ResetPassword.vue";

import Home from "../components/Home.vue";
import Profile from "../components/Profile.vue";
import ChangePassword from "../components/ChangePassword.vue";

Vue.use(VueRouter);

var isAuthenticated = false;

const DEFAULT_WINDOW_TITLE = "Web App Kit";

const routes = [
    {
        path: "/",
        /*  
      authentication checking
      if authtoken already available, redirect to Dashboard 
      if not, redirect to login 
    */
        beforeEnter: (to, from, next) => {
            if (isAuthenticated) next({ path: "/dashboard" });
            else next({ path: "/login" });
        },
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: { title: "Login" },
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        redirect: { path: "dashboard/home" },
        meta: { title: "Dashboard", requiresAuth: true },
        children: [
            {
                path: "home",
                component: Home,
                meta: { title: "Home", requiresAuth: true },
            },
            {
                path: "profile",
                component: Profile,
                meta: { title: "Profile", requiresAuth: true },
            },
            {
                path: "change-password",
                component: ChangePassword,
                meta: { title: "Change Password", requiresAuth: true },
            },
        ],
    },
    {
        path: "/forgot-password",
        name: "ForgotPassword",
        component: ForgotPassword,
        meta: { title: "Forgot Password" },
    },
    {
        path: "/auth/reset-password",
        name: "ResetPassword",
        component: ResetPassword,
        meta: { title: "Reset Password" },
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: { title: "Register" },
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.VUE_APP_BASE_URL,
    routes,
});

/* change the window title with the title name of the destination route */
router.afterEach((to) => {
    document.title = to.meta.title || DEFAULT_WINDOW_TITLE;
});

router.beforeEach((to, from, next) => {
    const isAuthenticatedUser = localStorage.getItem("WEB_APP_KIT_TOKEN")
        ? true
        : false;

    // check for protected route
    // if route requires authentication and the user is not authenticated , redirect to the login route
    if (to.meta.requiresAuth && !isAuthenticatedUser) next({ name: "Login" });
    else next();
});

export default router;
