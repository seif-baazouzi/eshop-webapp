<template>
  <div class="card">
    <img :src="apiServer + '/images/' + image" :alt="name">
    <div class="content">
      <Rate :value="rate" />
      <NuxtLink :to="'/shops/' + name">
        <h3>{{ name }}</h3>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { apiServer } from "../../config/config"

export default Vue.extend({
  props: {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    rate: {
      type: Number,
      required: true
    },
  },

  created() {
    this.apiServer = apiServer
  },
})
</script>

<style scoped>
  .card {
    width: 100%;
  }

  img {
    aspect-ratio: 2 / 1;
    object-fit: cover;
    border-radius: .125rem;
  }

  .content {
    padding: .25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .content h3 {
    color: var(--black);
    padding: .25rem 0;
  }
</style>
