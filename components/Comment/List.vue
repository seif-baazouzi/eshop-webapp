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

    <CommentPopups
      v-if="showAddPopup"
      @close="showAddPopup = false"

      popupName="add"
      :itemID="itemID"
      initialCommentValue=""
      @add="(newComment) => addComment(newComment)"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue"

import { apiServer } from "../../config/config"

export default Vue.extend({
  props: {
    itemID: {
      type: Number,
      required: true,
    }
  },
  
  data() {
    return {
      showAddPopup: false,

      comments: [] as any[],
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
    addComment(newComment: any) {      
      this.comments = [ newComment ,...this.comments ]
      this.showAddPopup = false
    },
    
    editComment(commentID: number, newComment: any) {      
      this.comments = this.comments.map(c => {
        if(c.commentID === commentID) {
          c.commentValue = newComment
        }

        return c
      })
    },

    deleteComment(commentID: number) {
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
})
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
</style>
