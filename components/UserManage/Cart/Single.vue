<template>
  <div>
    <h3>Cart {{ cartID }} Items List</h3>
    <div class="table">
      <table>
        <thead>
          <th>Product</th>
          <th></th>
          <th>Price</th>
          <th>Amount</th>
          <th>Total</th>
        </thead>
        <tbody>
          <tr v-for="(item) in items" :key="item.cartItemID">
            <td>
              <img :src="apiServer + '/images/' + item.itemImage" :alt="item.itemName">
            </td>
            <td class="name">{{ item.itemName }}</td>
            <td class="price">{{ formatPrice(item.itemPrice) }} dt</td>
            <td>{{ item.amount }}</td>
            <td>{{ formatPrice(item.itemPrice * item.amount) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { apiServer } from "../../../config/config"
import formatPrice from "../../../utils/format-price"

export default {
  props: {
    cartID: {
      type: Number,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },

  created() {
    this.apiServer = apiServer
    this.formatPrice = formatPrice
  },
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

  .name {
    padding: .25rem;
    font-size: 1rem;
    font-weight: bold;
    color: var(--black);
  }

  td {
    padding: .25rem;
    color: var(--dark-gray);
  }
</style>
