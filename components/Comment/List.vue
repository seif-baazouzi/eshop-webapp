<template>
  <div>
    <div class="comments-container">
      <div class="header">
        <h4>Comments</h4>
        <button class="blue" @click="showAddPopup = true">Add new comment</button>
      </div>

      <div v-if="comments.length != 0">
        <CommentSingle
          v-for="(comment) in comments"
          :key="comment.commentID"
          :username="comment.username"
          :comment="comment.commentValue"
          :date="comment.commentDate"
        />
      </div>

      <div class="message-container" v-else>
        <h2>There is no comments yet</h2>
      </div>
    </div>

    <Popup v-if="showAddPopup" @close="showAddPopup = false">
      <div v-if="$store.state.isLogin">
        <h3 class="center">Add new Comment</h3>
        <form @submit="handleSubmit($event)">
          <Input
            type="text"
            label="Comment"
            :value="comment"
            :error="errors.comment"
            @input="(value) => comment = value"
          />
          <button class="block blue">Submit</button>
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
import { apiServer } from "../../config/config"
import Popup from '../Popup.vue'

export default {
  components: { Popup },
  props: {
    itemID: {
      type: Number,
      required: true,
    }
  },
  
  data() {
    return {
      comments: [],
      comment: "",
      errors: {},
      showAddPopup: false,
    }
  },

  async fetch() {
    let res = await fetch(`${apiServer}/comments/${this.itemID}`)
    const { comments } = await res.json()
    
    this.comments = comments
  },

  methods: {
    async handleSubmit(event) {
      event.preventDefault()

      const res = await fetch(`${apiServer}/comments/${this.itemID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Token": document.cookie.split("=")[1],
        },
        body: JSON.stringify({ commentValue: this.comment })
      })
      const data = await res.json()
      
      if(data.message === "success") {
        const newComment = {
          commentID: data.commentID,
          commentValue: this.comment,
          commentDate: new Date(),
          username: this.$store.state.username,
        }

        this.comments = [ newComment, ...this.comments ]
        
        this.showAddPopup = false
        this.comment = ""
        this.errors = {}
      } else {
        this.errors = data
      }
    }
  },
}
</script>

<style scoped>
  .comments-container {
    width: 100%;
    max-width: 520px;
    margin: 1rem auto 4rem;
  }

  .header {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  h2, h3 {
    margin-bottom: 1rem;
  }
</style>
