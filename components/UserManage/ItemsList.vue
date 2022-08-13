<template>
  <div>
    <div class="header">
      <h3>{{ shopName }} Items List</h3>
      <button class="blue" @click="showPopup = true">Add new item</button>
    </div>
    <div class="table">
      <table>
        <thead>
          <th>Item Image</th>
          <th>Item Name</th>
          <th>Edit Image</th>
          <th>Edit</th>
          <th>Delete</th>
        </thead>
        <tbody>
          <UserManageItem
            v-for="(item) in items"
            :key="item.itemID"
            :id="item.itemID"
            :name="item.itemName"
            :rate="item.rate"
            :price="item.itemPrice"
            :image="item.itemImage"
            :description="item.itemDescription"

            @edit-image="(image) => editItemImage(item.itemID, image)"
            @edit="(newData) => editItem(item.itemID, newData)"
            @delete="() => deleteItem(item.itemID)"
          />
        </tbody>
      </table>
    </div>

    <UserManageItemPopups
      v-if="showPopup"
      @close="showPopup = false"
    
      popupName="add"
      :shopName="shopName"
      initialItemName=""
      initialItemPrice="1"
      initialItemDescription=""
      @add="(newItem) => addItem(newItem)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { apiServer } from "../../config/config"

export default Vue.extend({
  props: {
    items: {
      type: Array,
      required: true,
    },
    shopName: {
      type: String,
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
    addItem(newItem) {      
      this.$emit('change', [ newItem, ...this.items ])
    },

    editItem(oldItemID, { itemName, itemPrice, itemDescription }) {
      this.$emit('change', this.items.map(i => {
        if(i.itemID === oldItemID) {
          i.itemName = itemName
          i.itemPrice = itemPrice
          i.itemDescription = itemDescription
        }

        return i
      }))
    },

    editItemImage(itemID, image) {      
      this.$emit('change', this.items.map(i => {
        if(i.itemID === itemID) {
          i.itemImage = image
        }

        return i
      }))
    },

    deleteItem(itemID) {
      this.$emit('change', this.items.filter(i => i.itemID != itemID))
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
