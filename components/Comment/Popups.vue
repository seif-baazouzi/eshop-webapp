<template>
  <Popup @close="$emit('close')">
    <div v-if="$store.state.isLogin && popupName == 'add'" class="content">
      <h3 class="center">Add new Comment</h3>
      <form @submit="handleAddSubmit($event)">
        <Input
          type="text"
          label="Comment"
          :value="commentValue"
          :error="errors.commentValue"
          @input="(value) => commentValue = value"
        />
        <button class="block blue">Submit</button>
      </form>
    </div>

    <div v-else-if="$store.state.isLogin && popupName == 'edit'" class="content">
      <h3 class="center">Edit Comment</h3>
      <form @submit="handleEditSubmit($event)">
        <Input
          type="text"
          label="Comment"
          :value="commentValue"
          :error="errors.commentValue"
          @input="(value) => commentValue = value"
        />
        <button class="block blue">Submit</button>
      </form>
    </div>

    <div v-else-if="$store.state.isLogin && popupName == 'delete'" class="center content">
      <h3>Are you sure you want to delete this comment!</h3>
      <form @submit="handleDeleteSubmit($event)">
        <button class="red">Delete</button>
      </form>
    </div>

    <div v-else class="center content">
      <h2>You must login to be able to add comments</h2>
      <NuxtLink to="/login">
        <button class="blue-outline">Login</button>
      </NuxtLink>
    </div>
  </Popup>
</template>

<script lang="ts">
import Vue from 'vue'

import { apiServer } from "../../config/config"

export default Vue.extend({
  props: {
    popupName: {
      type: String,
      required: true,
    },
    commentID: {
      type: Number,
    },
    itemID: {
      type: Number,
    },
    initialCommentValue: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      commentValue: this.initialCommentValue,
      errors: {},
    }
  },

  methods: {
    async handleAddSubmit(event) {
      event.preventDefault()

      const res = await fetch(`${apiServer}/comments/${this.itemID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Token": document.cookie.split("=")[1],
        },
        body: JSON.stringify({ commentValue: this.commentValue })
      })
      const data = await res.json()
      
      if(data.message === "success") {
        const newComment = {
          commentID: data.commentID,
          commentValue: this.commentValue,
          commentDate: new Date(),
          username: this.$store.state.username,
        }

        this.$emit("add", newComment)
        this.errors = {}
      } else {
        this.errors = data
      }
    },

    async handleEditSubmit(event) {
      event.preventDefault()

      const res = await fetch(`${apiServer}/comments/${this.commentID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Token": document.cookie.split("=")[1],
        },
        body: JSON.stringify({ commentValue: this.commentValue })
      })
      const data = await res.json()
      
      if(data.message === "success") {
        this.$emit("edit", this.commentValue)
        this.errors = {}
      } else {
        this.errors = data
      }
    },
    
    async handleDeleteSubmit(event) {
      event.preventDefault()

      const res = await fetch(`${apiServer}/comments/${this.commentID}`, {
        method: "DELETE",
        headers: {
          "X-Token": document.cookie.split("=")[1],
        },
      })
      const data = await res.json()
      
      if(data.message === "success") {
        this.$emit("delete")
        this.errors = {}
      } else {
        this.errors = data
      }
    },
  }
})
</script>

<style scoped>
  .content {
    width: 480px;
    max-width: 100%;
  }

  h2, h3 {
    margin-bottom: 1rem;
  }
</style>
