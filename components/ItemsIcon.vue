<template>
  <svg :width="size" viewBox="0 0 48 48"><defs><style>.cls-1{fill:#df8761}.cls-2{fill:#f29b75}.cls-3{fill:#fc6}.cls-4{fill:#ffde76}.cls-6{fill:#edebf2}</style></defs><g id="product_stack" data-name="product stack"><path class="cls-1" d="M7 21h34v26H7z"/><path class="cls-2" d="M41 21v24H12a3 3 0 0 1-3-3V21z"/><path class="cls-1" d="M11 1h26v20H11z"/><path class="cls-2" d="M37 1v18H16a3 3 0 0 1-3-3V1z"/><path class="cls-3" d="M21 1h6v6h-6z"/><path class="cls-4" d="M27 1v4a4 4 0 0 1-4-4z"/><path class="cls-3" d="M20 21h8v8h-8z"/><path class="cls-4" d="M28 21v6a6 6 0 0 1-6-6z"/><path style="fill:#dad7e5" d="M11 37h10v6H11z"/><path class="cls-6" d="M21 37v4h-4a4 4 0 0 1-4-4zM37 44h-7a1 1 0 0 1 0-2h7a1 1 0 0 1 0 2zM33 18h-4a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2z"/></g></svg>
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
