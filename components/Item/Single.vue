<template>
  <div class="item">
    <img :src="apiServer + '/images/' + image" alt="">
    <div class="content">
      <Rate :value="rate" />
      <h1>{{ name }}</h1>
      <span>by <NuxtLink :to="'/shops/' + shopName">{{ shopName }}</NuxtLink></span>
      <div class="price">{{ formatPrice(price) }} dt</div>
      <div class="description">
        <h5>Description:</h5>
        <p>{{ description }}</p>
      </div>
      <ItemAddToCart
        :itemID="id"
        :shopName="shopName"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { apiServer } from "../../config/config"
import formatPrice from "../../utils/format-price"

export default {
  props: {
    id: {
      type: Number,
      required: true
    },
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
    shopName: {
      type: String,
      required: true  
    }
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
    margin: .25rem 0;
  }

  span {
    font-size: .75rem;
    font-weight: bold;
    position: relative;
    top: -0.5rem;
  }

  .price {
    font-size: .75rem;
    font-weight: bold;
    color: var(--dark-gray);
  }

  .description {
    margin: 2rem 0;
  }

  .description h5 {
    margin-bottom: .25rem;
  }

  .description p {
    font-size: .75rem;
    color: var(--dark-gray);
    line-height: 1.25;
  }

  @media screen and (min-width: 768px) {
    .item {
      display: flex;
      align-items: flex-start;
    }

    img {
      width: 60%;
    }

    .content {
      width: 40%;
      padding: 1rem;
    }
  }
</style>
