<template>
  <div>
    <NavBar />

    <div class="center" v-if="error.statusCode === 404">
      <Page404Icon />
      <h1>Page Not Found</h1>
      <NuxtLink to="/">
        <button class="blue-outline">Go Home</button>
      </NuxtLink>
    </div>

    <div class="center" v-else>
      <h1>Error {{ error.statusCode }}</h1>
      <NuxtLink to="/">
        <button class="blue-outline">Go Home</button>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: "ErrorPage",
  
  props: [ 'error' ],
})
</script>

<style scoped>
  .center {
    padding: 1rem;
  }

  h1 {
    margin: 1rem 0 2rem;
  }
</style>
