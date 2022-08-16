<template>
  <tr>
    <td class="img"><img :src="apiServer + '/images/' + image" :alt="name" /></td>
    <td class="name">
      <Rate :value="rate" />
      <NuxtLink :to="'/items/' + id">{{ name }}</NuxtLink>
    </td>
    <td class="btn">
      <button class="yellow-outline" @click="popupName = 'edit-image'">Edit Image</button>
    </td>
    <td class="btn">
      <button class="blue-outline" @click="popupName = 'edit'">Edit</button>
    </td>
    <td class="btn">
      <button class="red-outline" @click="popupName = 'delete'">Delete</button>
    </td>

    <UserManageItemPopups
      v-if="popupName != null"
      @close="popupName = null"
    
      :popupName="popupName"
      :itemID="id"
      :initialItemName="name"
      :initialItemPrice="price"
      :initialItemDescription="description"
      @edit="(newItem) => $emit('edit', newItem)"
      @edit-image="(newImage) => $emit('edit-image', newImage)"
      @delete="() => $emit('delete')"
    />
  </tr>
</template>

<script lang="ts">
import Vue from 'vue'

import { apiServer } from "../../config/config"

export default Vue.extend({
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rate: {
      type: Number,
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

  data() {
    return {
      popupName: null,

      apiServer: apiServer,
    }
  },
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

  td.name {
    padding: .5rem;
  }

  td.name a {
    width: 100%;
    padding: .125rem 0;
    font-size: 1rem;
    color: var(--black);
    display: inline-block;
  }

  td.btn {
    width: 6rem;
    text-align: center;
  }
</style>
