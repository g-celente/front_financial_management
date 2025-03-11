import { createRouter, createWebHistory } from "vue-router";
import beforeEach from "./beforeEach";

import TheContainer from "../components/TheContainer.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("../views/auth/LoginView.vue"),
    },
    {
      path: "/register",
      name: "Cadastro",
      component: () => import("../views/auth/LoginView.vue"),
    },
    {
      path: "/",
      component: TheContainer,
      meta: { requiresAuth: true },
      children: [
        {
          path: "/home",
          name: "Logado",
          component: () => import("../views/HomeView.vue"),
        },
        {
          path: "/saidas",
          name: "Saidas",
          component: () => import("../views/SaidasView.vue")
        },
        {
          path: "/entradas",
          name: "Entradas",
          component: () => import("../views/EntradasView.vue")
        }
      ],
    },
    {
      path: "/:catchAll(.*)*",
      component: () => import("../views/auth/LoginView.vue"),
    },
  ],

  scrollBehavior() {
    return { top: 0 };
  },
 
});

router.beforeEach(beforeEach);

export default router;