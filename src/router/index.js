import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from '../components/DefaultLayout.vue';
import GuestLayout from '../components/GuestLayout.vue';
import Home from '../views/Home.vue'
import MealsByIngredient from '../views/MealsByIngredient.vue'
import MealsByLetter from '../views/MealsByLetter.vue'
import MealsByName from '../views/MealsByName.vue'
import MealDetails from '../views/MealDetails.vue'
import Ingredients from '../views/Ingredients.vue'
import ChatRoom from "../views/ChatRoom/ChatRoom.vue";
import ExercisesRoom from "../views/ExercisesRoom/ExercisesRoom.vue";
import MealPlanner from "../views/MealPlanner/MealPlanner.vue";
import InstructionsAnalyzer from "../views/InstructionAnalyzer/InstructionAnalyzer.vue";

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: "/",
        name: "home",
        component: Home,
      },
      {
        path: "/by-name/:name?",
        name: "byName",
        component: MealsByName,
      },
      {
        path: "/by-letter/:letter?",
        name: "byLetter",
        component: MealsByLetter,
      },
      {
        path: "/ingredients",
        name: "ingredients",
        component: Ingredients,
      },
      {
        path: "/by-ingredient/:ingredient",
        name: "byIngredient",
        component: MealsByIngredient,
      },
      {
        path: '/meal/:id',
        name: 'mealDetails',
        component: MealDetails
      },
      {
        path: '/chat-room',
        name: 'chatRoom',
        component: ChatRoom
      },
      {
        path: '/exercies-room',
        name: 'exerciesRoom',
        component: ExercisesRoom
      },
      {
        path: '/meal-planner',
        name: 'mealPlanner',
        component: MealPlanner
      },
      {
        path: '/instructions-analyzer',
        name: 'instructionsAnalyzer',
        component: InstructionsAnalyzer
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
