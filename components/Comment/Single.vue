<template>
  <div class="comment">
    <div class="header">
      <span class="username">{{ username }}</span>
      <span class="dot">•</span>
      <span class="date">{{ (new Date(date)).toDateString() }}</span>
    </div>
    <p>{{ comment }}</p>
    <DropDown
      v-if="$store.state.username === username"
      @edit="showPopup = 'edit'"
      @delete="showPopup = 'delete'"
    />

    <Popup v-if="showPopup != null" @close="showPopup = null">
      <div v-if="$store.state.isLogin && showPopup == 'edit'">
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

      <div v-if="$store.state.isLogin && showPopup == 'delete'" class="center">
        <h3>Delete this comment</h3>
        <form @submit="handleDeleteSubmit($event)">
          <button class="red">Delete</button>
        </form>
      </div>

      <div v-else class="center">
        <h2>You must login to checkout</h2>
        <NuxtLink to="/login">
          <button class="blue-outline">Login</button>
        </NuxtLink>
      </div>
    </Popup>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { apiServer } from "../../config/config"

export default Vue.extend({
  props: {
    commentID: {
      type: Number,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      showPopup: null,
      commentValue: this.comment,
      errors: {},
    }
  },

  methods: {
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

        this.showPopup = null
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

        this.showPopup = null
        this.errors = {}
      } else {
        this.errors = data
      }
    },
  }
})
</script>

<style scoped>
  .comment {
    width: 100%;
    padding: .25rem 0;
    border-bottom: .125rem solid var(--light-gray);
    position: relative;
  }

  .comment:last-child {
    border-bottom: none;
  }

  .header {
    padding: .75rem 0 .25rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: .25rem;
  }

  .username {
    font-size: .75rem;
    font-weight: bold;
  }

  .dot {
    font-size: .75rem;
  }

  .date {
    font-size: .6rem;
    color: var(--dark-gray);
  }

  p {
    font-size: .75rem;
    line-height: 1.25;
    padding-top: .25rem;
    color: var(--dark-gray);
  }

  h2, h3 {
    margin-bottom: 1rem;
  }
</style>
