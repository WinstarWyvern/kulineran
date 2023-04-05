import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "@/views/HomeView.vue";
import FoodView from "@/views/FoodView.vue";
import FoodDetailView from "@/views/FoodDetailView.vue";
import CartView from "@/views/CartView.vue";
import PesananSukses from "@/views/PesananSukses.vue";
import HistoryView from "@/views/HistoryView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/foods",
    name: "food",
    component: FoodView,
  },
  {
    path: "/foods/:id",
    name: "foodDetail",
    component: FoodDetailView,
  },
  {
    path: "/cart",
    name: "cart",
    component: CartView,
  },
  {
    path: "/pesanan-sukses",
    name: "pesananSukses",
    component: PesananSukses,
  },
  {
    path: "/history",
    name: "history",
    component: HistoryView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
