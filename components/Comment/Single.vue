<template>
  <div class="comment">
    <div class="header">
      <span class="username">{{ username }}</span>
      <span class="dot">•</span>
      <span class="date">{{ (new Date(date)).toDateString() }}</span>
    </div>
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
    date: {
      type: String,
      required: true,
    },
  }
})
</script>

<style scoped>
  .comment {
    width: 100%;
    padding: .25rem 0;
    border-bottom: .125rem solid var(--light-gray);
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: .25rem;
  }

  .username {
    font-size: .75rem;
    font-weight: bold;
  }

  .dot {
    font-size: .75rem;
  }

  .date {
    font-size: .6rem;
    color: var(--dark-gray);
  }

  p {
    font-size: 1rem;
    padding-top: .25rem;
    color: var(--dark-gray);
  }
</style>
