<template>
  <div>
    <NavBar />
    <div class="container">
      <div class="header">
        <h3>Shops List</h3>
        <button class="blue">Add new shop</button>
      </div>

      <div class="table">
        <table>
          <thead>
            <th>Shop Image</th>
            <th>Shop Name</th>
            <th>Edit Image</th>
            <th>Edit</th>
            <th>Delete</th>
          </thead>
          <tbody>
            <tr v-for="(shop) in shops" :key="shop.shopName">
              <td class="img"><img :src="apiServer + '/images/' + shop.shopImage" /></td>
              <td class="name"><NuxtLink :to="'/shops/' + shop.shopName">{{ shop.shopName }}</NuxtLink></td>
              <td class="btn"><button class="yellow-outline">Edit Image</button></td>
              <td class="btn"><button class="blue-outline">Edit</button></td>
              <td class="btn"><button class="red-outline">Delete</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { apiServer } from "../../config/config"
import { parseCookies } from "../../utils/cookies"

export default {
  name: "UserShopsPage",
  
  data() {
    return {
      selectedPage: (this.$route.query.page && !isNaN(this.$route.query.page)) ? parseInt(this.$route.query.page) : 1,
      pages: 0,
      shops: []
    }
  },

  created() {
    this.apiServer = apiServer
  },

  watch: {
    selectedPage: "$fetch"
  },

  async fetch() {
    const rawCookie = this.$nuxt?.context?.req?.headers.cookie || document.cookie || ""
    const cookies = parseCookies(rawCookie)

    const res = await fetch(`${apiServer}/shops/user?page=${this.selectedPage}`, {
      headers: {
        "X-Token": cookies.token
      }
    })    
    const { shops, pages } = await res.json()
    
    this.shops = shops
    this.pages = pages
  },
}
</script>

<style scoped>
  .container {
    max-width: 968px;
  }

  .header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  td.img {
    width: 8rem;
  }

  td.img img {
    aspect-ratio: 2 / 1;
    object-fit: cover;
  }

  td.name a {
    width: 100%;
    padding: .25rem;
    font-size: 1rem;
    color: var(--black);
  }

  td.btn {
    width: 6rem;
    text-align: center;
  }
</style>
