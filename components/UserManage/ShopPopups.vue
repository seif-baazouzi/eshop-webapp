<template>
  <Popup @close="$emit('close')">
    <div class="popup-content" v-if="popupName === 'add'">
      <h3 class="center">Add new shop</h3>
      <form @submit="handleAddSubmit($event)">
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

    <div v-else-if="popupName === 'edit'" class="popup-content">
      <h3 class="center">Edit Shop</h3>
      <form @submit="handleEditSubmit($event)">
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

    <div v-else-if="popupName === 'edit-image'">
      <h3 class="center">Edit shop Image</h3>
      <form @submit="handleEditImageSubmit($event)">
        <Input
          type="file"
          label="Image"
          :value="shopImage"
          :error="errors.message"
          @change="(value) => shopImage = value"
        />
        <button class="block blue">Submit</button>
      </form>
    </div>

    <div v-else-if="popupName === 'delete'" class="center">
      <h3>Are you sure you want to delete this shop!</h3>
      <form @submit="handleDeleteSubmit($event)">
        <button class="red">Delete</button>
      </form>
    </div>
  </Popup>
</template>

<script lang="ts">
import Vue from 'vue'

import { apiServer } from "../../config/config"
import { parseCookies } from "../../utils/cookies"

export default Vue.extend({
  props: {
    popupName: {
      type: String,
      required: true,
    },
    initialShopName: {
      type: String,
      required: true,
    },
    initialShopDescription: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      shopName: this.initialShopName,
      shopDescription: this.initialShopDescription,
      shopImage: [],
      errors: {},
    }
  },

  methods: {
    async handleAddSubmit(event: { preventDefault: Function }) {
      event.preventDefault()

      const cookies = parseCookies(document.cookie)

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
        this.$emit("add", { shopName: this.shopName, shopDescription: this.shopDescription })
        this.$emit("close")
        
        this.errors = {}
      } else {
        this.errors = data
      }
    },

    async handleEditSubmit(event: { preventDefault: Function }) {
      event.preventDefault()

      const cookies = parseCookies(document.cookie)

      const res = await fetch(`${apiServer}/shops/${this.initialShopName}`, {
        method: "PUT",
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
        this.$emit("edit", { shopName: this.shopName, shopDescription: this.shopDescription })
        this.$emit("close")

        this.errors = {}
      } else {
        this.errors = data
      }
    },

    async handleEditImageSubmit(event: { preventDefault: Function }) {
      event.preventDefault()

      if(!this.shopImage[0]) return

      const cookies = parseCookies(document.cookie)
      
      const image = this.shopImage[0];
      const formData = new FormData();
      formData.append("image", image)

      const res = await fetch(`${apiServer}/shops/${this.initialShopName}`, {
        method: "PATCH",
        headers: {
          "X-Token": cookies.token
        },
        body: formData
      })
      const data = await res.json()

      if(data.message === "success") {
        this.$emit("edit-image", data.image)
        this.$emit("close")
      } else {
        this.errors = data
      }
    },

    async handleDeleteSubmit(event: { preventDefault: Function }) {
      event.preventDefault()

      const cookies = parseCookies(document.cookie)

      const res = await fetch(`${apiServer}/shops/${this.initialShopName}`, {
        method: "DELETE",
        headers: {
          "X-Token": cookies.token,
        },
      })
      const data = await res.json()
      
      if(data.message === "success") {
        this.$emit("delete")
        this.$emit("close")
      }
    },
  }
})
</script>

<style scoped>
  .popup-content {
    width: 768px;
    max-width: 100%;
  }

  h3 {
    margin-bottom: 1rem;
  }
</style>
