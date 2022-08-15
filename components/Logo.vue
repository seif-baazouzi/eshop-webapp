<template>
  <svg :width="size" viewBox="0 0 180.4 218.7" style="enable-background:new 0 0 180.4 218.7" xml:space="preserve"><style>.st11,.st17{fill:none;stroke:#4f4fed;stroke-width:6.8376}.st17{stroke-linejoin:bevel}</style><g id="Layer_4"><path d="M68.8 54.7V23.9c0-11.3 9.2-20.5 20.5-20.5h37.6c11.3 0 20.5 9.2 20.5 20.5v30.8" style="fill:none;stroke:#9ac7f7;stroke-width:6.8376"/><path style="fill:#9ac7f7" d="M93.8 41h32v174.4H3V41h21.4"/><path class="st11" d="M31.7 54.7V23.9c0-11.3 9.2-20.5 20.5-20.5h37.6c11.3 0 20.5 9.2 20.5 20.5v30.8"/><path class="st11" d="M3.4 36.9h125.4v178.4H3.4z"/><path class="st17" d="M138.4 36.9H177v178.4l-24.1-9.6-24.1 9.6M152.9 205.7v-43.4M152.9 152.6V143M152.9 133.4v-9.7M152.9 114.1v-9.7"/></g></svg>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    size: {
      type: String,
      default: "1rem",
    },
  }
})
</script>