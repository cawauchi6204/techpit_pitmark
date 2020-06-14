import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SignUp from "../views/SignUp";
import SignIn from "../views/SignIn";
import BookmarkNew from "../views/BookmarkNew";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/sign_up",
    name: "sign_up",
    component: SignUp
  },
  {
    path: "/sign_in",
    name: "sign_in",
    component: SignIn
  },
  {
    path: "/bookmarks/new",
    name: "bookmark_new",
    component: BookmarkNew
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
