import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Exercises from '../views/ExercisesView.vue'
import AddExercise from '../views/AddExerciseView.vue'
import ExerciseInfoView from '@/views/ExerciseInfoView.vue'
import AddLogView from '@/views/AddLogView.vue'
import LogsView from '@/views/LogsView.vue'
import EditExerciseView from '@/views/EditExerciseView.vue'
import SplitsView from '@/views/SplitsView.vue'
import AddSplitView from '@/views/AddSplitView.vue'
import SplitInfoView from '@/views/SplitInfoView.vue'

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
      component: AddExercise,
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
    },
    {
      path: '/exercises/edit/:id',
      name: 'editExerciseInfo',
      component: EditExerciseView
    },
    {
      path: '/splits',
      name: 'splits',
      component: SplitsView
    },
    {
      path: '/splits/add',
      name: 'addSplit',
      component: AddSplitView
    },
    {
      path: '/splits/:id',
      name: 'splitInfo',
      component: SplitInfoView
    }
  ]
})

export default router
