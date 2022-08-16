<template>
  <div>
    <div v-if="amount === 0">
      <button class="block blue" @click="setItemAmounts(1)">Add To Cart</button>
    </div>
    <div class="buttons-container" v-else>
      <button class="outline" @click="setItemAmounts(parseInt(amount)-1)">-</button>
      <input type="number" min="0" v-model="amount" />
      <button class="outline" @click="setItemAmounts(parseInt(amount)+1)">+</button>
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
      if((cartsList as any)[this.shopName] == null) {
        (cartsList as any)[this.shopName] = {}
      }

      // get item amount
      if((cartsList as any)[this.shopName][this.itemID] != null) {
        this.amount = (cartsList as any)[this.shopName][this.itemID]
      }
  },

  methods: {
    setItemAmounts(amount: number) {
      if(amount < 0) return 
      
      let cartsList = {}
      
      // get carts list
      let localStorageCartsList = localStorage.getItem("carts-list")
      if(localStorageCartsList != null) {
        cartsList = JSON.parse(localStorageCartsList)
      }

      // get shop cart items list
      if((cartsList as any)[this.shopName] == null) {
        (cartsList as any)[this.shopName] = {}
      }

      // set item amount
      (cartsList as any)[this.shopName][this.itemID] = amount
      this.amount = amount
      
      // remove items that has zero amount
      for(let itemID in (cartsList as any)[this.shopName]) {
        if((cartsList as any)[this.shopName][itemID] == 0) {
          delete (cartsList as any)[this.shopName][itemID]
          this.$emit("zero-amount", itemID)
        }
      }

      // remove shop cart when there is no items in it
      for(let shopName in cartsList) {
        if(Object.keys((cartsList as any)[this.shopName]).length === 0) {
          delete (cartsList as any)[this.shopName]
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

    --border: 0.125rem solid var(--light-gray);
    border: var(--border);
    border-radius: .25rem;

    overflow: hidden;
  }

  input {
    width: 100%;
    padding: .25rem;
    text-align: center;
    font-size: .75rem;

    -webkit-appearance: none;
    -moz-appearance: textfield;
  }

  .buttons-container button {
    border: none;
    border-radius: 0;
  }

  .buttons-container button:first-child {
    border-right: var(--border);
  }


  .buttons-container button:last-child {
    border-left: var(--border);
  }
</style>
