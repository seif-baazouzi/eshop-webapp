<template>
  <div class="card">
    <img :src="apiServer + '/images/' + image">
    <div class="content">
      <h3>{{ name }}</h3>
      <Rate :value="rate" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { apiServer } from "../../config/config"
import formatPrice from "../../utils/format-price"

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
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: .25rem;
  }

  .content {
    padding: .25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
</style>
