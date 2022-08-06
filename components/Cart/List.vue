<template>
  <div>
    <div v-if="Object.keys(itemsList).length > 0">
      <h4>{{ shopName }} Cart Items</h4>
      <div class="table">
        <table>
          <thead>
            <th>Product</th>
            <th></th>
            <th>Price</th>
            <th>Amount</th>
          </thead>
          <tbody>
            <CartCard
              v-for="(amount, itemID) in itemsList"
              :key="amount"
              :itemID="itemID"
              :amount="amount"
              :shopName="shopName"
              @zero-amount="(id) => deleteItemFromCart(id)"
              @zero-items="(shopName) => $emit('zero-items', shopName)"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    shopName: {
      type: String,
      required: true,
    },
    items: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      itemsList: this.items
    }
  },

  methods: {
    deleteItemFromCart(itemID) {
      delete this.itemsList[itemID]
      this.$forceUpdate()
    },
  }
}
</script>

<style scoped>
  .table {
    width: 100%;
    background-color: var(--white);
    overflow-x: auto;
    border-radius: .125rem;
  }

  .table table {
    width: 100%;
    border-collapse: collapse;
  }

  .table table th {
    text-align: left;
    font-size: .75rem;
    color: var(--dark-gray);
  }

  .table table :is(td, th) {
    padding: .25rem;
  } 

  .table table tbody tr:hover {
    background-color: var(--light-gray);
  }
</style>