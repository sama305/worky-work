<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <RouterLink to="/logs/add" style="float: right">
      <button>log a workout</button>
    </RouterLink>
    <h1 style="width: 100px">worky-work</h1>
    <nav>
      <RouterLink to="/" class="rawLink">home</RouterLink> •
      <RouterLink to="/exercises" class="rawLink">exercises</RouterLink> •
      <RouterLink to="/logs" class="rawLink">logs</RouterLink>
    </nav>
  </header>

  <hr>

  <RouterView />
</template>

