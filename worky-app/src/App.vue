
<template>
  <header>
    <div style="float: right">
      <RouterLink to="/logs/add">
        <button>log a workout</button>
      </RouterLink><br>
      <tt>sign out</tt>
    </div>
    <h1 style="width: 100px">worky-work</h1>
    <nav>
      <RouterLink to="/" class="rawLink">home</RouterLink> •
      <RouterLink to="/exercises" class="rawLink">exercises</RouterLink> •
      <RouterLink to="/logs" class="rawLink">logs</RouterLink> •
      <RouterLink to="/splits" class="rawLink">splits</RouterLink>
    </nav>
  </header>

  <hr>

  <p>{{  }}</p>

  <RouterView />
</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useExercisesStore } from './stores/exerciseStore';

export default {
  setup() {
    const store = useExercisesStore()
    return {
      store
    }
  },
  created() {
    this.store.fetchExercises()
    this.store.fetchSplits()
    this.store.fetchUser()
    this.store.fetchLogs()
  }
}

</script>

