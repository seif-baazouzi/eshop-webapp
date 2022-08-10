<template>
  <tr>
    <td class="img"><img :src="apiServer + '/images/' + image" /></td>
    <td class="name">
      <NuxtLink :to="'/shops/' + name">{{ name }}</NuxtLink>
    </td>
    <td class="btn">
      <button class="yellow-outline" @click="showPopup = 'edit-image'">Edit Image</button>
    </td>
    <td class="btn">
      <button class="blue-outline" @click="showPopup = 'edit'">Edit</button>
    </td>
    <td class="btn">
      <button class="red-outline" @click="showPopup = 'delete'">Delete</button>
    </td>

    <Popup v-if="showPopup != null" @close="showPopup = null">
      <div v-if="showPopup === 'edit'" class="popup-content edit-popup">
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

      <div v-if="showPopup === 'edit-image'" class="popup-content">
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

      <div v-if="showPopup === 'delete'" class="popup-content center">
        <h3>Are you sure you want to delete this shop!</h3>
        <form @submit="handleDeleteSubmit($event)">
          <button class="red">Delete</button>
        </form>
      </div>
    </Popup>
  </tr>
</template>

<script lang="ts">
import Vue from 'vue'

import { apiServer } from "../../config/config"
import { parseCookies } from "../../utils/cookies"

export default Vue.extend({
  props: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },

  created() {
    this.apiServer = apiServer
  },

  data() {
    return {
      showPopup: null,
      shopName: this.name,
      shopImage: [],
      shopDescription: this.description,
      errors: {},
    }
  },

  methods: {
    async handleEditSubmit(event) {
      event.preventDefault()

      const rawCookie = this.$nuxt?.context?.req?.headers.cookie || document.cookie || ""
      const cookies = parseCookies(rawCookie)

      const res = await fetch(`${apiServer}/shops/${this.name}`, {
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

        this.showPopup = null
        this.errors = {}
      } else {
        this.errors = data
      }
    },

    async handleEditImageSubmit(event) {
      event.preventDefault()

      if(!this.shopImage[0]) return

      const rawCookie = this.$nuxt?.context?.req?.headers.cookie || document.cookie || ""
      const cookies = parseCookies(rawCookie)
      
      const image = this.shopImage[0];
      const formData = new FormData();
      formData.append("image", image)

      const res = await fetch(`${apiServer}/shops/${this.name}`, {
        method: "PATCH",
        headers: {
          "X-Token": cookies.token
        },
        body: formData
      })
      const data = await res.json()

      if(data.message === "success") {
        this.$emit("edit-image", data.image)
        this.showPopup = null
      } else {
        this.errors = data
      }
    },

    async handleDeleteSubmit(event) {
      event.preventDefault()

      const rawCookie = this.$nuxt?.context?.req?.headers.cookie || document.cookie || ""
      const cookies = parseCookies(rawCookie)

      const res = await fetch(`${apiServer}/shops/${this.name}`, {
        method: "DELETE",
        headers: {
          "X-Token": cookies.token,
        },
      })
      const data = await res.json()
      
      if(data.message === "success") {
        this.$emit("delete")
        this.showPopup = null
      }
    },
  }
})
</script>

<style scoped>
  td.img {
    width: 8rem;
  }

  td.img img {
    aspect-ratio: 2 / 1;
    object-fit: cover;
  }

  td.name a {
    width: 100%;
    padding: .25rem;
    font-size: 1rem;
    color: var(--black);
  }

  td.btn {
    width: 6rem;
    text-align: center;
  }

  .edit-popup {
    width: 768px;
    max-width: 100%;
  }

  .popup-content h3 {
    margin-bottom: 1rem;
  }
</style>
