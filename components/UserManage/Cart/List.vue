<template>
  <div class="table">
    <table>
      <thead>
        <th>CartID</th>
        <th>Customer</th>
        <th>Address</th>
        <th>Date</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="(cart) in carts" :key="cart.cartID">
          <td>{{ cart.cartID }}</td>
          <td>{{ cart.username }}</td>
          <td>{{ cart.address }}</td>
          <td>{{ (new Date(cart.cartDate)).toDateString() }}</td>
          <td>
            <NuxtLink :to="'/manage-shops/carts/view/' + cart.cartID">view</NuxtLink>
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
    shopName: {
      type: String,
      required: true,
    },
    carts: {
      type: Array,
      required: true,
    },
  },
})
</script>

<style scoped>
  td {
    padding: .5rem .25rem !important;
    font-size: .75rem;
  }
</style>
