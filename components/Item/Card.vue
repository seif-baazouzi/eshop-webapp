<template>
  <div class="card-container">
    <img :src="apiServer + '/images/' + image">
    <div class="content">
      <NuxtLink :to="'/items/' + id">
        <h3>{{ name }}</h3>
      </NuxtLink>
      <p>{{ formatPrice(price) }} dt</p>
    </div>
    <div class="rate" v-if="rate">
      <Star color="var(--yellow)" size=".75rem" />
      <p>{{ rate }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { apiServer } from "../../config/config"

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
  },

  created() {
    this.apiServer = apiServer
  },

  methods: {
    formatPrice(price: number): string {      
      const priceString = price.toString()
      const priceValue = priceString.substring(0, priceString.length-2)
      const priceFraction = priceString.substring(priceString.length-2)

      return `${priceValue || "0"}.${priceFraction}`
    }
  }
})
</script>

<style scoped>
  .card-container {
    width: 100%;
    padding: .25rem;
    position: relative;
    border-radius: .25rem;
    border: .125rem solid var(--light-gray);
    overflow: hidden;
  }

  img {
    aspect-ratio: 2 / 1;
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
    color: var(--black);
  }

  p {
    font-size: .75rem;
    color: var(--dark-gray);
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
