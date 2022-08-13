<template>
  <div class="table">
    <table>
      <thead>
        <th>CartID</th>
        <th>Customer</th>
        <th>Date</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="(cart) in carts" :key="cart.cartID">
          <td>{{ cart.cartID }}</td>
          <td>{{ cart.username }}</td>
          <td>19/12/2012</td>
          <td>
            <NuxtLink to="#">view</NuxtLink>
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
