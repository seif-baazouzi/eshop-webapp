<template>
  <tr>
    <td>
      <img :src="apiServer + '/images/' + image" :alt="shopName">
    </td>
    <td class="name"><NuxtLink :to="'/items/' + itemID">{{ name }}</NuxtLink></td>
    <td class="price">{{ formatPrice(price) }} {{ priceCurrency }}</td>
    <td>
      <ItemAddToCart
        :itemID="itemID"
        :shopName="shopName"
        @zero-amount="(id) => $emit('zero-amount', id)"
        @zero-items="(shopName) => $emit('zero-items', shopName)"
      />
    </td>
  </tr>
</template>

<script lang="ts">
import Vue from "vue"

import { apiServer, priceCurrency } from "../../config/config"
import formatPrice from "../../utils/format-price"

export default Vue.extend({
  props: {
    itemID: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    shopName: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      name: "",
      price: 0,
      image: "",

      apiServer: apiServer,
      priceCurrency: priceCurrency,
    }
  },

  async fetch() {    
    let res = await fetch(`${apiServer}/items/${this.itemID}`)
    const { item } = await res.json()
    
    this.name = item.itemName
    this.price = item.itemPrice
    this.image = item.itemImage
  },

  methods: {
    formatPrice: formatPrice,
  }
})
</script>

<style scoped>
  .card {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  img {
    aspect-ratio: 2 / 1;
    object-fit: cover;
  }

  td:first-child, img {
    width: 8rem;
  }

  td:last-child {
    width: 8rem;
  }

  .name a {
    padding: .25rem;
    font-size: 1rem;
    font-weight: bold;
    color: var(--black);
  }

  .price {
    padding: .25rem;
    color: var(--dark-gray);
  }
</style>
