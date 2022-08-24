<template>
  <div class="form-container">
    <h2 class="center">Update Your Username</h2>
    <form @submit="handleSubmit($event)" class="form-content-container">
      <Input
        type="text"
        label="NewUsername"
        :value="username"
        :error="errors.username"
        @input="(value) => username = value"
      />
      <Input
        type="password"
        label="Password"
        :value="password"
        :error="errors.password"
        @input="(value) => password = value"
      />
      <button class="block blue">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { apiServer } from "../../config/config"
import { parseCookies } from "../../utils/cookies"

export default Vue.extend({
  data() {
    return {
      username: "",
      password: "",
      errors: {},
    }
  },

  methods: {
    async handleSubmit(event: { preventDefault: Function }) {
      event.preventDefault()

      const rawCookie = this.$nuxt?.context?.req?.headers.cookie || document.cookie || ""
      const cookies = parseCookies(rawCookie)

      const res = await fetch(`${apiServer}/users/settings/update-username`, {
        method: "POST",
        headers: {
          "X-Token": cookies.token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: this.username, password: this.password })
      })
      const data = await res.json()

      if(data.message === "success") {
        this.errors = {}
        this.username = ""
        this.username = ""
      } else {
        this.errors = data
      }
    },
  }
})
</script>