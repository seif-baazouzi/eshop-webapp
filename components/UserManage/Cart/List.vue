<template>
  <div class="table">
    <table>
      <thead>
        <th>CartID</th>
        <th>{{ type === "user" ? "Shop" : "Customer" }}</th>
        <th>Address</th>
        <th>Date</th>
        <th>Viewed</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="(cart) in carts" :class="{ active: !cart.viewed }" :key="cart.cartID">
          <td>{{ cart.cartID }}</td>
          <td>{{ type === "user" ? cart.shopName : cart.username }}</td>
          <td>{{ cart.address }}</td>
          <td>{{ (new Date(cart.cartDate)).toDateString() }}</td>
          <td>{{ cart.viewed ? "viewed" : "not-yet" }}</td>
          <td>
            <NuxtLink :to="getCartLink(cart.cartID)">view</NuxtLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    type: {
      type: String,
      default: "shop",
    },
    shopName: {
      type: String,
    },
    carts: {
      type: Array,
      required: true,
    },
  },

  methods: {
    getCartLink(cartID: number) {
      if(this.type === "user") {
        return `/carts/${cartID}`
      }
      
      return `/manage-shops/carts/${this.shopName}/view/${cartID}`
    },
  }
})
</script>

<style scoped>
  tr.active {
    background: var(--light-gray);
  }

  td {
    padding: .5rem .25rem !important;
    font-size: .75rem;
  }

  a {
    font-weight: bold;
  }
</style>
