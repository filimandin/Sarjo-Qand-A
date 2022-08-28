import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard_admin.vue";
import Login from "../views/Auth/LoginView.vue";
import Question from "../views/questionView.vue";
import ScoreBoard from "../views/ScoreBoard.vue";
import Register from "../views/Auth/RegisterView.vue";
import RegisterAdmin from "../views/Auth/RegisterAdmin.vue";
import EditAnswer from "../components/EditAnswer.vue";
const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },

  {
    path: "/",
    // name: "login",
    component: Login,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
  },

  {
    path: "/score",
    name: "score",
    component: ScoreBoard,
  },

  {
    path: "/register",
    name: "register",
    component: Register,
  },

  {
    path: "/edit_answer/:id",
    name: "edit_answer",
    component: EditAnswer,
  },

  {
    path: "/register/admin",
    name: "register_admin",
    component: RegisterAdmin,
  },

  {
    path: "/question",
    name: "question",
    component: Question,
  },
  {
    path: "/create/question",
    name: "create_question",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/createQuestion.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
