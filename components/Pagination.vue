<template>
  <div class="pagination-container" v-if="pages > 1">
    <button
      @click="$emit('set-selected-page', selectedPage-1)"
      :disabled="selectedPage === 1"
      >prev
    </button>
    
    <button
      v-for="page in pagesList"
      :key="page"
      @click="$emit('set-selected-page', page)"
      :class="{ blue: selectedPage === page }"
      >{{ page }}
    </button>
    
    <button
      @click="$emit('set-selected-page', selectedPage+1)"
      :disabled="selectedPage === pages"
      >next
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    pages: {
      type: Number,
      required: true
    },
    selectedPage: {
      type: Number,
      required: true
    },
  },

  data() {
    return {
      pagesList: []
    }
  },

  mounted() { this.setPagesList() },
  beforeUpdate() { this.setPagesList() },

  methods: {
    setPagesList() {
      const newList = []

      if(this.pages <= 5) {
        for(let i=1; i<=this.pages; i++) newList.push(i)
      }

      else if(this.selectedPage <= 4 || this.selectedPage === this.pages) {
        for(let i=1; i<=4; i++) newList.push(i)
        newList.push(this.pages)
      }

      else {
        for(let i=1; i<=3; i++) newList.push(i)
        newList.push(this.selectedPage)
        newList.push(this.pages)
      }

      this.pagesList = newList
    }
  }
})
</script>

<style scoped>
  .pagination-container {
    width: fit-content;
    margin: 1rem auto;
  }

  button {
    font-size: .525rem;
    margin: 0 .125rem;
  }
</style>
