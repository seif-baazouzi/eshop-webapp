<template>
  <div class="chain">
    <div class="link" v-for="(link, index) in links" :key="index">
      <NuxtLink :to="link.path">{{ link.label }}</NuxtLink>
      <span v-if="index != links.length-1">></span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    links: {
      type: Array,
      required: true,
    }
  }
})
</script>

<style scoped>
  .chain {
    display: flex;
    align-items: center;
    gap: .25rem;
  }

  .link {
    display: flex;
    align-items: center;
  }

  span {
    font-size: 1.25rem;
    color: var(--light-gray);
    transform: translateY(-.075rem);
    user-select: none;
    margin-left: .25rem;
  }

  a {
    font-size: .6rem;
    font-weight: bold;
  }
</style>
