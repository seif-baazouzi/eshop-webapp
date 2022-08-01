<template>
  <div class="card-container">
    <img src="http://127.0.0.1:8000/07.jpg">
    <div class="content">
      <h3>{{ name }}</h3>
      <p>{{ formatPrice(price) }} dt</p>
    </div>
    <div class="rate">
      <Star color="var(--yellow)" size=".75rem" />
      <p>{{ rate }}</p>
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
    rate: {
      type: Number,
      required: true
    },
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
