<template>
  <div>
    <div v-if="Object.keys(itemsList).length > 0" class="wrapper">
      <h3>{{ shopName }} Shop Cart List</h3>
      <div class="table">
        <table>
          <thead>
            <th>Product</th>
            <th></th>
            <th>Price</th>
            <th>Amount</th>
          </thead>
          <tbody>
            <CartCard
              v-for="(amount, itemID) in itemsList"
              :key="amount"
              :itemID="itemID"
              :amount="amount"
              :shopName="shopName"
              @zero-amount="(id) => deleteItemFromCart(id)"
              @zero-items="(shopName) => $emit('zero-items', shopName)"
            />
            <tr>
              <td>
                <button class="blue" @click="showPopup = true">Checkout</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <Popup v-if="showPopup" @close="showPopup = false">
      <div v-if="$store.state.isLogin">
        <h3 class="center">Checkout this cart</h3>
        <form @submit="handleCheckout($event)">
          <Input
            type="text"
            label="Address"
            :value="address"
            :error="errors.address"
            @input="(value) => address = value"
          />
          <button class="block blue">Checkout</button>
        </form>
      </div>

      <div v-else class="center">
        <h2>You must login to checkout</h2>
        <NuxtLink to="/login">
          <button class="blue-outline">Login</button>
        </NuxtLink>
      </div>
    </Popup>
  </div>
</template>

<script lang="ts">
import { apiServer } from "../../config/config"

export default {
  props: {
    shopName: {
      type: String,
      required: true,
    },
    items: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      itemsList: this.items,
      showPopup: false,
      address: "",
      errors: {},
    }
  },

  methods: {
    deleteItemFromCart(itemID) {
      delete this.itemsList[itemID]
      this.$forceUpdate()
    },

    async handleCheckout(event) {
      event.preventDefault()

      const items = []
      for(let itemID in this.items) {
        items.push({ itemID: parseInt(itemID), amount: this.items[itemID] })
      }

      const res = await fetch(`${apiServer}/carts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Token": document.cookie.split("=")[1],
        },
        body: JSON.stringify({
          address: this.address,
          shopName: this.shopName,
          items,
        })
      })
      const data = await res.json()
      
      if(data.message === "success") {
        let cartsList = JSON.parse(localStorage.getItem("carts-list"))

        delete cartsList[this.shopName]
        this.$emit("zero-items", this.shopName)
      
        localStorage.setItem("carts-list", JSON.stringify(cartsList))

        this.showPopup = false
        this.address = ""
      } else {
        this.errors = data
      }
    }
  }
}
</script>

<style scoped>
  .wrapper {
    max-width: 768px;
    margin: 0 auto 2rem;
  }
  
  h2 {
    margin-bottom: 1rem;
  }
</style>
