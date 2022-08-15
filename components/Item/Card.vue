<template>
  <div class="card-container">
    <img :src="apiServer + '/images/' + image" :alt="name">
    <div class="content">
      <Rate :value="rate" />
      <NuxtLink :to="'/items/' + id">
        <h3>{{ name }}</h3>
      </NuxtLink>
      <span>by <NuxtLink :to="'/shops/' + shopName">{{ shopName }}</NuxtLink></span>
      <p>{{ formatPrice(price) }} {{ priceCurrency }}</p>
      <ItemAddToCart
        :itemID="id"
        :shopName="shopName"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { apiServer, priceCurrency } from "../../config/config"
import formatPrice from "../../utils/format-price"

export default Vue.extend({
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
    },
  },

  created() {
    this.apiServer = apiServer
    this.priceCurrency = priceCurrency
    this.formatPrice = formatPrice
  },
})
</script>

<style scoped>
  .card-container {
    width: 100%;
    position: relative;
  }

  img {
    aspect-ratio: 2 / 1;
    object-fit: cover;
    
    border-radius: .25rem;
    overflow: hidden;
  }

  .content {
    padding: .25rem;
  }

  h3 {
    font-size: 1rem;
    color: var(--black);
    padding: .25rem 0;
  }

  span {
    display: block;
    font-size: .6rem;
    font-weight: bold;
  }

  p {
    font-size: .75rem;
    color: var(--dark-gray);
    margin: .5rem 0;
  }

  .rate {
    padding: .125rem .5rem;
    
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .25rem;
    
    position: absolute;
    top: .5rem; right: .5rem;
    
    border-radius: .25rem;
    box-shadow: var(--shadow);
    background-color: var(--white);
  }
</style>
