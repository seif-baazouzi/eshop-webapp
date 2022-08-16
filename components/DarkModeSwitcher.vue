<template>
  <svg width="1.5rem" @click="toggleMode()" fill="var(--black)" viewBox="0 0 24 24"><path d="M11.993,3a9.326,9.326,0,0,0-1.138,4.477,8.8,8.8,0,0,0,8.569,9.015c.2,0,.385-.017.576-.03A8.5,8.5,0,0,1,12.569,21,8.8,8.8,0,0,1,4,11.985,8.83,8.83,0,0,1,11.993,3Z"/></svg>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      colorMode: "light",
    }
  },
  
  mounted() {
    const colorMode = localStorage.getItem("color-mode")
    this.setMode(colorMode)
  },

  methods: {
    setMode(mode) {
      this.colorMode = mode
      localStorage.setItem("color-mode", mode)

      if(this.colorMode === "dark") {
        globalThis?.window?.document.body.classList.add("dark")
      } else {
        globalThis?.window?.document.body.classList.remove("dark")
      }
    },

    toggleMode() {
      let mode = "light"
      if(this.colorMode === "light") mode = "dark"

      this.setMode(mode)
    }
  }
})
</script>

<style scoped>
  svg {
    display: block;
    padding: .25rem;
    cursor: pointer;
  }
</style>
