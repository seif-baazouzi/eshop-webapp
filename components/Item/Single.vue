<template>
  <div class="item">
    <img :src="apiServer + '/images/' + image" alt="">
    <div class="content">
      <Rate :value="rate" />
      <h1>{{ name }}</h1>
      <div class="price">{{ formatPrice(price) }} dt</div>
      <div class="description">
        <h5>Description:</h5>
        <p>{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { apiServer } from "../../config/config"
import formatPrice from "../../utils/format-price"

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
    price: {
      type: Number,
      required: true
    },
    rate: {
      type: Number,
      required: true
    },
  },
  
  created() {
    this.apiServer = apiServer
    this.formatPrice = formatPrice
  },
}
</script>

<style scoped>
  .content {
    padding: 1rem;
  }

  h1 {
    line-height: 1;
  }

  .price {
    font-size: .75rem;
    font-weight: bold;
    color: var(--dark-gray);
  }

  .description {
    margin-top: 2rem;
  }

  .description p {
    font-size: .75rem;
    color: var(--dark-gray);
  }

  @media screen and (min-width: 768px) {
    .item {
      padding: 1rem;
      display: flex;
      align-items: flex-start;
      gap: 1rem;
    }

    img {
      width: 60%;
      border-radius: .5rem;
    }

    .content {
      width: 40%;
    }
  }
</style>
