<template>
  <div>
    <div class="header">
      <h3>Shops List</h3>
      <button class="blue" @click="showPopup = true">Add new shop</button>
    </div>
    <div class="table">
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
            :image="shop.shopImage"
            :description="shop.shopDescription"

            @edit-image="(image) => editShopImage(shop.shopName, image)"
            @edit="(newData) => editShop(shop.shopName, newData)"
            @delete="() => deleteShop(shop.shopName)"
          />
        </tbody>
      </table>
    </div>

    <Popup v-if="showPopup" @close="showPopup = false">
      <div class="popup-content">
        <h3 class="center">Add new shop</h3>
        <form @submit="handleSubmit($event)">
          <Input
            type="text"
            label="ShopName"
            :value="shopName"
            :error="errors.shopName"
            @input="(value) => shopName = value"
          />
          <Input
            type="textarea"
            label="ShopDescription"
            :value="shopDescription"
            :error="errors.shopDescription"
            @input="(value) => shopDescription = value"
          />
          <button class="block blue">Submit</button>
        </form>
      </div>
    </Popup>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { apiServer } from "../../config/config"
import { parseCookies } from "../../utils/cookies"

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
      shopName: "",
      shopDescription: "",
      errors: {},
    }
  },

  created() {
    this.apiServer = apiServer
  },

  methods: {
    async handleSubmit(event) {
      event.preventDefault()

      const rawCookie = this.$nuxt?.context?.req?.headers.cookie || document.cookie || ""
      const cookies = parseCookies(rawCookie)

      const res = await fetch(`${apiServer}/shops`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Token": cookies.token,
        },
        body: JSON.stringify({
          shopName: this.shopName,
          shopDescription: this.shopDescription,
        })
      })
      const data = await res.json()
      
      if(data.message === "success") {
        this.$emit("change", [
          { shopName: this.shopName, shopDescription: this.shopDescription },
          ...this.shops,
        ])

        this.showPopup = false
        this.errors = {}
      } else {
        this.errors = data
      }
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

  .popup-content {
    width: 768px;
    max-width: 100%;
  }

  .popup-content h3 {
    margin-bottom: 1rem;
  }
</style>
