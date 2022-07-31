<template>
  <div class="container">
    <h1>Items List</h1>
    <div class="items-list">
      <ItemCard
        v-for="(item, index) in items"
        :key="index"
        :name="item.name"
        :rate="item.rate"
        :price="item.price"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    items: {
      type: Array,
      required: true
    },
  }
})
</script>

<style scoped>
.container {
  padding: .25rem 1rem;
}

h1 {
  font-size: 1.75rem;
}

.items-list {
  width: 100%;
  display: grid;
  padding-bottom: 5rem;
  grid-template-rows: auto;
  grid-template-columns: 1fr;
  gap: .25rem;
}

@media screen and (min-width: 520px) {
  .items-list { grid-template-columns: 1fr 1fr }
}

@media screen and (min-width: 920px) {
  .items-list { grid-template-columns: 1fr 1fr 1fr }
}

@media screen and (min-width: 1200px) {
  .items-list { grid-template-columns: 1fr 1fr 1fr 1fr }
}
</style>
