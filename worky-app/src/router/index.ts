import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Exercises from '../views/ExercisesView.vue'
import AddExercise from '../views/AddExerciseView.vue'
import ExerciseInfoView from '@/views/ExerciseInfoView.vue'
import AddLogView from '@/views/AddLogView.vue'
import LogsView from '@/views/LogsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/exercises',
      name: 'exercises',
      component: Exercises
    },
    {
      path: '/exercises/add',
      name: 'addExercise',
      component: AddExercise
    },
    {
      path: '/exercises/:id',
      name: 'exerciseInfo',
      component: ExerciseInfoView
    },
    {
      path: '/logs/add',
      name: 'addLog',
      component: AddLogView
    },
    {
      path: '/logs',
      name: 'logs',
      component: LogsView
    }
  ]
})

export default router