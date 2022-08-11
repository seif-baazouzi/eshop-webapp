<template>
  <div class="rate-container">
    <Star size=".5rem" :color="value >= 1 ? 'var(--yellow)' : 'var(--light-gray)'" @click="$emit('change', 1)" />
    <Star size=".5rem" :color="value >= 2 ? 'var(--yellow)' : 'var(--light-gray)'" @click="$emit('change', 2)" />
    <Star size=".5rem" :color="value >= 3 ? 'var(--yellow)' : 'var(--light-gray)'" @click="$emit('change', 3)" />
    <Star size=".5rem" :color="value >= 4 ? 'var(--yellow)' : 'var(--light-gray)'" @click="$emit('change', 4)" />
    <Star size=".5rem" :color="value >= 5 ? 'var(--yellow)' : 'var(--light-gray)'" @click="$emit('change', 5)" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    value: {
      type: Number,
      required: true, 
    }
  }
})
</script>

<style scoped>
  .rate-container {
    width: fit-content;
    display: flex;
    gap: .125rem;
    cursor: pointer;
  }
</style>
