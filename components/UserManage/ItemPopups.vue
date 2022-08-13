<template>
  <Popup @close="$emit('close')">
    <div class="popup-content" v-if="popupName === 'add'">
      <h3 class="center">Add new item</h3>
      <form @submit="handleAddSubmit($event)">
        <Input
          type="text"
          label="ItemName"
          :value="itemName"
          :error="errors.itemName"
          @input="(value) => itemName = value"
        />
        <Input
          type="number"
          label="ItemPrice"
          :value="itemPrice"
          :error="errors.itemPrice"
          @input="(value) => itemPrice = value"
        />
        <Input
          type="textarea"
          label="ItemDescription"
          :value="itemDescription"
          :error="errors.itemDescription"
          @input="(value) => itemDescription = value"
        />
        <button class="block blue">Submit</button>
      </form>
    </div>

    <div v-else-if="popupName === 'edit'" class="popup-content">
      <h3 class="center">Edit Item</h3>
      <form @submit="handleEditSubmit($event)">
        <Input
          type="text"
          label="ItemName"
          :value="itemName"
          :error="errors.itemName"
          @input="(value) => itemName = value"
        />
        <Input
          type="number"
          label="ItemPrice"
          :value="itemPrice"
          :error="errors.itemPrice"
          @input="(value) => itemPrice = value"
        />
        <Input
          type="textarea"
          label="ItemDescription"
          :value="itemDescription"
          :error="errors.itemDescription"
          @input="(value) => itemDescription = value"
        />
        <button class="block blue">Submit</button>
      </form>
    </div>

    <div v-else-if="popupName === 'edit-image'">
      <h3 class="center">Edit Item Image</h3>
      <form @submit="handleEditImageSubmit($event)">
        <Input
          type="file"
          label="Image"
          :value="itemImage"
          :error="errors.message"
          @change="(value) => itemImage = value"
        />
        <button class="block blue">Submit</button>
      </form>
    </div>

    <div v-else-if="popupName === 'delete'" class="center">
      <h3>Are you sure you want to delete this item!</h3>
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
    shopName: {
      type: String,
      required: true,
    },
    itemID: {
      type: Number,
      required: true,
    },
    initialItemName: {
      type: String,
      required: true,
    },
    initialItemPrice: {
      type: Number,
      required: true,
    },
    initialItemDescription: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      itemName: this.initialItemName,
      itemPrice: this.initialItemPrice,
      itemDescription: this.initialItemDescription,
      itemImage: [],
      errors: {},
    }
  },

  methods: {
    async handleAddSubmit(event) {
      event.preventDefault()

      const cookies = parseCookies(document.cookie)

      const res = await fetch(`${apiServer}/items/${this.shopName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Token": cookies.token,
        },
        body: JSON.stringify({
          itemName: this.itemName,
          itemPrice: parseInt(this.itemPrice),
          itemDescription: this.itemDescription,
        })
      })
      const data = await res.json()
      
      if(data.message === "success") {
        this.$emit("add", {
          itemID: data.itemID,
          itemName: this.itemName,
          itemPrice: parseInt(this.itemPrice),
          itemDescription: this.itemDescription
        })
        this.$emit("close")
        
        this.errors = {}
      } else {
        this.errors = data
      }
    },

    async handleEditSubmit(event) {
      event.preventDefault()

      const cookies = parseCookies(document.cookie)

      const res = await fetch(`${apiServer}/items/${this.itemID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Token": cookies.token,
        },
        body: JSON.stringify({
          itemName: this.itemName,
          itemPrice: parseInt(this.itemPrice),
          itemDescription: this.itemDescription,
        })
      })
      const data = await res.json()
      
      if(data.message === "success") {
        this.$emit("edit", {
          itemID: data.itemID,
          itemName: this.itemName,
          itemPrice: parseInt(this.itemPrice),
          itemDescription: this.itemDescription
        })
        this.$emit("close")

        this.errors = {}
      } else {
        this.errors = data
      }
    },

    async handleEditImageSubmit(event) {
      event.preventDefault()

      if(!this.itemImage[0]) return

      const cookies = parseCookies(document.cookie)
      
      const image = this.itemImage[0];
      const formData = new FormData();
      formData.append("image", image)

      const res = await fetch(`${apiServer}/items/${this.itemID}`, {
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

    async handleDeleteSubmit(event) {
      event.preventDefault()

      const cookies = parseCookies(document.cookie)

      const res = await fetch(`${apiServer}/items/${this.itemID}`, {
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
