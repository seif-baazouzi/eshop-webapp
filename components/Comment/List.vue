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
          :commentID="comment.commentID"
          :username="comment.username"
          :comment="comment.commentValue"
          :date="comment.commentDate"

          @edit="(newComment) => editComment(comment.commentID, newComment)"
          @delete="() => deleteComment(comment.commentID)"
        />

        <div class="center" style="margin-top: 1rem" v-if="loadMore">
          <button class="blue-outline" @click="fetchMoreComments()">Load More</button>
        </div>
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
            :value="commentValue"
            :error="errors.commentValue"
            @input="(value) => commentValue = value"
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

export default {
  props: {
    itemID: {
      type: Number,
      required: true,
    }
  },
  
  data() {
    return {
      comments: [],
      commentValue: "",
      errors: {},
      showAddPopup: false,

      commentsPage: 1,
      loadMore: true,
    }
  },

  async fetch() {
    let res = await fetch(`${apiServer}/comments/${this.itemID}`)
    const { comments } = await res.json()
    
    this.comments = [ ...this.comments, ...comments ]

    if(comments.length >= 20) {
      this.commentsPage += 1
    } else {
      this.loadMore = false
    }
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

        this.comments = [ newComment, ...this.comments ]
        
        this.showAddPopup = false
        this.commentValue = ""
        this.errors = {}
      } else {
        this.errors = data
      }
    },

    editComment(commentID, newComment) {      
      this.comments = this.comments.map(c => {
        if(c.commentID === commentID) {
          c.commentValue = newComment
        }

        return c
      })
    },

    deleteComment(commentID) {      
      this.comments = this.comments.filter(c => c.commentID != commentID)
    },

    async fetchMoreComments() {
      let res = await fetch(`${apiServer}/comments/${this.itemID}?page=${this.commentsPage}`)
      const { comments } = await res.json()
      
      this.comments = [ ...this.comments, ...comments ]

      if(comments.length >= 20) {
        this.commentsPage += 1
      } else {
        this.loadMore = false
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
    padding: 1rem;
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
