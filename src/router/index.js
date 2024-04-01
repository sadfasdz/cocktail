import { createRouter, createWebHistory } from "vue-router";
import Cocktail from "../pages/Cocktail.vue";
import Main from "../pages/Main.vue";
import CocktailRandom from "../pages/CocktailRandom.vue";
import { ROUTER_PATH } from "../constants";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTER_PATH.HOME,
      name: ROUTER_PATH.HOME,
      component: Main,
    },
    {
      path: ROUTER_PATH.COCKTAIL,
      name: ROUTER_PATH.COCKTAIL,
      component: Cocktail,
    },
    {
      path: ROUTER_PATH.COCKTAIL_RANDOM,
      name: ROUTER_PATH.COCKTAIL_RANDOM,
      component: CocktailRandom,
    },
  ],
});

export default router;
