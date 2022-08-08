<template>
  <div>
    <div class="comments-container" v-if="comments.length != 0">
      <h3>Comments</h3>
      <CommentSingle
        v-for="(comment) in comments"
        :key="comment.commentID"
        :username="comment.username"
        :comment="comment.commentValue"
      />
    </div>

    <div class="message-container">
      <h1>There is no comments yet</h1>
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
    margin: 1rem auto;
  }
</style>
