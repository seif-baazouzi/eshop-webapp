<template>
  <tr>
    <td>
      <img :src="apiServer + '/images/' + image" alt="">
    </td>
    <td class="name">{{ name }}</td>
    <td class="price">{{ formatPrice(price) }} dt</td>
    <td>
      <ItemAddToCart
        :itemID="itemID"
        :shopName="shopName"
      />
    </td>
  </tr>
</template>

<script lang="ts">
import { apiServer } from "../../config/config"
import formatPrice from "../../utils/format-price"

export default {
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

  created() {
    this.apiServer = apiServer
    this.formatPrice = formatPrice
  },

  data() {
    return {
      name: "",
      price: 0,
      image: "",
    }
  },

  async fetch() {    
    let res = await fetch(`${apiServer}/items/${this.itemID}`)
    const { item } = await res.json()
    
    this.name = item.itemName
    this.price = item.itemPrice
    this.image = item.itemImage
  }
}
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
  
  td {
    font-size: .75rem;
    padding: .5rem 1rem;
    border-top: .075rem solid var(--light-gray);
    transition: background .3s ease-in;
    text-align: left;
  }

  .name {
    font-size: 1rem;
    font-weight: bold;
  }

  .price {
    color: var(--dark-gray);
  }
</style>
