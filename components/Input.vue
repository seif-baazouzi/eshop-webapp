<template>
  <div class="input-box">
    <label :for="label">{{ label }}</label>
    <textarea
      v-if="type === 'textarea'"
      :value="value"
      @keyup="$emit('input', $event.target.value)"
    />
    <input
      v-else-if="type === 'file'"
      :id="label"
      :type="type"
      @change="$emit('change', $event.target.files)"
    />
    <input
      v-else
      :id="label"
      :type="type"
      :value="value"
      @keyup="$emit('input', $event.target.value)"
    />
    <span>{{ error }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    error: {
      type: String,
      required: true,
    },
  }
})
</script>

<style scoped>
  .input-box {
    width: 100%;
    margin-bottom: .5rem;
  }

  .input-box :is(label, input, span) {
    width: 100%;
    display: block;
    font-size: .75rem;
  }

  .input-box label {
    font-weight: bold;
  }

  .input-box :is(input, textarea) {
    padding: .5em;
    border-radius: .25em;
    background-color: var(--light-gray);
    border: .125em solid var(--light-gray);
  }

  .input-box :is(input, textarea):focus {
    border: .125em solid var(--blue);
  }

  .input-box textarea {
    width: 100%;
    height: 7rem;
    resize: vertical;
  }

  .input-box span {
    color: var(--red);
    font-weight: bold;
    font-size: .6rem;
  }
</style>
