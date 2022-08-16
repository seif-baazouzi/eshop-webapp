<template>
  <svg :width="size" viewBox="0 0 48 48"><defs><style>.cls-4{fill:#edebf2}.cls-5{fill:#f26674}.cls-6{fill:#ffde76}</style></defs><g id="Found"><path d="M47 4v5H1V4a3 3 0 0 1 2.13-2.87C3.77.94 1 1 44 1a3 3 0 0 1 3 3z" style="fill:#374f68"/><path d="M47 4v3H7a3 3 0 0 1-3-3V1h40a3 3 0 0 1 3 3z" style="fill:#425b72"/><path d="M47 9c0 28.21.06 26.24-.13 26.87A3 3 0 0 1 44 38H4a3 3 0 0 1-3-3V9z" style="fill:#dad7e5"/><path class="cls-4" d="M47 9v26H7a3 3 0 0 1-3-3V9z"/><path class="cls-5" d="M5 6a1 1 0 0 1 0-2 1 1 0 1 1 0 2z"/><path class="cls-6" d="M9 6a1 1 0 0 1 0-2 1 1 0 1 1 0 2z"/><path d="M13 6a1 1 0 0 1 0-2 1 1 0 1 1 0 2z" style="fill:#b5e08c"/><path class="cls-5" d="M17 15v3h-2v-3a1 1 0 0 0-2 0v4a1 1 0 0 0 1 1h3v3a1 1 0 0 0 2 0v-8a1 1 0 0 0-2 0zM33 15v3h-2v-3a1 1 0 0 0-2 0v4a1 1 0 0 0 1 1h3v3a1 1 0 0 0 2 0v-8a1 1 0 0 0-2 0zM24 14a3 3 0 0 0-3 3v4a3 3 0 0 0 6 0v-4a3 3 0 0 0-3-3zm1 7a1 1 0 0 1-2 0v-4a1 1 0 0 1 2 0z"/><path class="cls-4" d="M43 6H27a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2z"/></g></svg>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    size: {
      type: String,
      default: "10rem",
    },
  }
})
</script>
