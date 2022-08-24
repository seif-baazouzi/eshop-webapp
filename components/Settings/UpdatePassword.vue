<template>
  <div class="form-container">
    <h2 class="center">Update Your Password</h2>
    <form @submit="handleSubmit($event)" class="form-content-container">
      <Input
        type="password"
        label="OldPassword"
        :value="oldPassword"
        :error="errors.oldPassword"
        @input="(value) => oldPassword = value"
      />
      <Input
        type="password"
        label="NewPassword"
        :value="newPassword"
        :error="errors.newPassword"
        @input="(value) => newPassword = value"
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
      oldPassword: "",
      newPassword: "",
      errors: {},
    }
  },

  methods: {
    async handleSubmit(event: { preventDefault: Function }) {
      event.preventDefault()

      const rawCookie = this.$nuxt?.context?.req?.headers.cookie || document.cookie || ""
      const cookies = parseCookies(rawCookie)

      const res = await fetch(`${apiServer}/users/settings/update-password`, {
        method: "POST",
        headers: {
          "X-Token": cookies.token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ oldPassword: this.oldPassword, newPassword: this.newPassword })
      })
      const data = await res.json()

      if(data.message === "success") {
        this.errors = {}
        this.oldPassword = ""
        this.newPassword = ""
      } else {
        this.errors = data
      }
    },
  }
})
</script>