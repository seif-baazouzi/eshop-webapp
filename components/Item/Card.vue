<template>
  <div class="card-container">
    <img src="http://127.0.0.1:8000/07.jpg">
    <div class="content">
      <h3>{{ name }}</h3>
      <p>{{ price }} dt</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
  }
})
</script>

<style scoped>
  .card-container {
    width: 100%;
    padding: .25rem;
    border-radius: .25rem;
    border: .125rem solid var(--light-gray);
    overflow: hidden;
  }

  img {
    border-radius: .25rem;
    overflow: hidden;
  }

  .content {
    border-top: .125rem solid var(--light-gray);
    margin-top: .125rem;
    padding-top: .25rem;
  }

  h3 {
    font-size: 1rem;
  }

  p {
    font-size: .75rem;
    color: var(--dark-gray);
  }
</style>
