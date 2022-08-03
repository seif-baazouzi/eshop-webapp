<template>
  <div class="shop">
    <img :src="apiServer + '/images/' + image" alt="">
    <div class="content">
      <h2>{{ name }}</h2>
      <Rate :value="rate" />
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { apiServer } from "../../config/config"

export default {
  props: {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    description: {
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
}
</script>

<style scoped>
  .shop img {
    aspect-ratio: 2 / 1;
    object-fit: cover;
  }
  
  .content {
    padding: 1rem;
  }

  .content h2 {
    line-height: 1;
  }

  .content p {
    margin-top: 2rem;
    color: var(--dark-gray);
  }

  @media screen and (min-width: 768px) {
    .shop {
      padding: 1rem;
      display: flex;
      align-items: flex-start;
    }

    .shop img {
      width: 60%;
      border-radius: .5rem;
    }

    .shop .content {
      width: 40%;
    }
  }
</style>
