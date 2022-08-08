<template>
  <div class="comment">
    <span>{{ username }}</span>
    <p>{{ comment }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    username: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  }
})
</script>

<style scoped>
  .comment {
    width: fit-content;
    min-width: 120px;
    padding: .25rem;
    border-radius: .25rem;
    background: var(--light-gray);
  }

  span {
    font-size: .6rem;
    font-weight: bold;
    color: var(--dark-gray);
  }

  p {
    font-size: 1rem;
  }
</style>
