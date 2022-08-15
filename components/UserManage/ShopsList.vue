<template>
  <div>
    <div class="header">
      <h3>Shops List</h3>
      <button class="blue" @click="showPopup = true">Add new shop</button>
    </div>
    <div v-if="shops.length > 0" class="table">
      <table>
        <thead>
          <th>Shop Image</th>
          <th>Shop Name</th>
          <th>Edit Image</th>
          <th>Edit</th>
          <th>Delete</th>
        </thead>
        <tbody>
          <UserManageShop
            v-for="(shop) in shops"
            :key="shop.shopName"
            :name="shop.shopName"
            :rate="shop.rate"
            :image="shop.shopImage"
            :description="shop.shopDescription"

            @edit-image="(image) => editShopImage(shop.shopName, image)"
            @edit="(newData) => editShop(shop.shopName, newData)"
            @delete="() => deleteShop(shop.shopName)"
          />
        </tbody>
      </table>
    </div>

    <div v-else class="message-container">
      <ShopIcon />
      <h1>There is no shops yet!</h1>
    </div>

    <UserManageShopPopups
      v-if="showPopup"
      @close="showPopup = false"
    
      popupName="add"
      initialShopName=""
      initialShopDescription=""
      @add="(newShop) => addShop(newShop)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { apiServer } from "../../config/config"

export default Vue.extend({
  props: {
    shops: {
      type : Array,
      required: true,
    },
  },

  data() {
    return {
      showPopup: false,
    }
  },

  created() {
    this.apiServer = apiServer
  },

  methods: {
    addShop(newShop) {
      this.shops = [ newShop, ...this.shops ]
    },

    editShop(oldShopName, { shopName, shopDescription }) {
      this.$emit('change', this.shops.map(s => {
        if(s.shopName === oldShopName) {
          s.shopName = shopName
          s.shopDescription = shopDescription
        }

        return s
      }))
    },

    editShopImage(shopName, image) {
      this.$emit('change', this.shops.map(s => {
        if(s.shopName === shopName) {
          s.shopImage = image
        }

        return s
      }))
    },

    deleteShop(shopName) {
      this.$emit('change', this.shops.filter(s => s.shopName != shopName))
    },
  }
})
</script>

<style scoped>
  .header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
