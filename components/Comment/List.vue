<template>
  <div>
    <div class="comments-container">
      <div class="header">
        <h4>Comments</h4>
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
    }
  },

  async fetch() {
    let res = await fetch(`${apiServer}/comments/${this.itemID}`)
    const { comments } = await res.json()
    
    this.comments = comments
    console.log(comments);
    
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
  }
</style>
