<template>
  <div class="container">
    <h2>Delete Account</h2>
    <p>After you delete your account, you will not be able to sign, your shops and carts will be deleted, but you will need a new account to be able to sign.</p>
    <button class="red" @click="deleteAccount()">Delete</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { apiServer } from "../../config/config"
import { parseCookies, clearCookies } from "../../utils/cookies"

export default Vue.extend({
  methods: {
    async deleteAccount() {
      const rawCookie = this.$nuxt?.context?.req?.headers.cookie || document.cookie || ""
      const cookies = parseCookies(rawCookie)

      const res = await fetch(`${apiServer}/users/settings/delete-account`, {
        method: "DELETE",
        headers: {
          "X-Token": cookies.token,
        },
      })
      const data = await res.json()

      if(data.message === "success") {
        clearCookies()

        this.$store.commit("setIsLogin", false)
        this.$store.commit("setUsername", null)
      
        this.$router.push({ path: "/" })
      }
    },
  }
})
</script>

<style scoped>
  .container {
    max-width: 768px;
    margin-top: 3rem;
  }

  p {
    margin: 1rem 0 .5rem;
    color: var(--dark-gray);
  }
</style>
