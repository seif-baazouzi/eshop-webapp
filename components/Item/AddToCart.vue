<template>
  <div>
    <div class="buttons-container" v-if="amount === 0">
      <button class="block blue" @click="setItemAmounts(1)">Add To Cart</button>
    </div>
    <div class="buttons-container" v-else>
      <button class="red" @click="setItemAmounts(amount-1)">-</button>
      <input type="number" min="0" v-model="amount" />
      <button class="blue" @click="setItemAmounts(amount+1)">+</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import _shopNameVue from '../../pages/shops/_shopName.vue'
export default Vue.extend({
  props: {
    itemID: {
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
      amount: 0,
    }
  },

  mounted() {
    let cartsList = {}
      
      // get carts list
      let localStorageCartsList = localStorage.getItem("carts-list")
      if(localStorageCartsList != null) {
        cartsList = JSON.parse(localStorageCartsList)
      }

      // get shop cart items list
      if(cartsList[this.shopName] == null) {
        cartsList[this.shopName] = {}
      }

      // get item amount
      if(cartsList[this.shopName][this.itemID] != null) {
        this.amount = cartsList[this.shopName][this.itemID]
      }
  },

  methods: {
    setItemAmounts(amount) {
      if(amount < 0) return 
      
      let cartsList = {}
      
      // get carts list
      let localStorageCartsList = localStorage.getItem("carts-list")
      if(localStorageCartsList != null) {
        cartsList = JSON.parse(localStorageCartsList)
      }

      // get shop cart items list
      if(cartsList[this.shopName] == null) {
        cartsList[this.shopName] = {}
      }

      // set item amount
      cartsList[this.shopName][this.itemID] = amount
      this.amount = amount
      
      // remove items that has zero amount
      for(let itemID in cartsList[this.shopName]) {
        if(cartsList[this.shopName][itemID] == 0) {
          delete cartsList[this.shopName][itemID]
          this.$emit("zero-amount", itemID)
        }
      }

      // remove shop cart when there is no items in it
      for(let shopName in cartsList) {
        if(Object.keys(cartsList[shopName]).length === 0) {
          delete cartsList[this.shopName]
          this.$emit("zero-items", shopName)
        }
      }

      // set localStorage
      localStorage.setItem("carts-list", JSON.stringify(cartsList))
    }
  },
})
</script>

<style scoped>
  .buttons-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .25rem;
  }

  .buttons-container input {
    padding: .25rem;
    border-radius: .25rem;
    border: .125rem solid var(--light-gray);
  }
</style>
