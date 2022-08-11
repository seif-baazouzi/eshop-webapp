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
      @edit="popupName = 'edit'"
      @delete="popupName = 'delete'"
    />

    <CommentPopups
      v-if="popupName != null"
      @close="popupName = null"

      :popupName="popupName"
      :commentID="commentID"
      :initialCommentValue="comment"
      @edit="(newComment) => { $emit('edit', newComment); popupName = null }"
      @delete="() => { $emit('delete'); popupName = null }"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

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
      popupName: null,
    }
  },
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
</style>
