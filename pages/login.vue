<template>
  <div>
    <NavBar />

    <div class="form-container">
      <h2 class="center">Welcome Back</h2>
      <form @submit="handleSubmit($event)" class="form-content-container">
        <Input
          type="text"
          label="E-mail"
          :value="email"
          :error="errors.email"
          @input="(value) => email = value"
        />
        <Input
          type="password"
          label="Password"
          :value="password"
          :error="errors.password"
          @input="(value) => password = value"
        />
        <button class="block blue">Login</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { apiServer } from "../config/config"

export default Vue.extend({
  name: "LoginPage",

  data() {
    return {
      email: "",
      password: "",
      errors: {},
    }
  },

  methods: {
    async handleSubmit(event: { preventDefault: Function }) {
      event.preventDefault()

      const res = await fetch(`${apiServer}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: this.email, password: this.password })
      })
      const data = await res.json()

      if(data.token) {
        document.cookie = "token=" + data.token
        this.$store.commit("setIsLogin", true)
        window.location.pathname = "/"
      } else {
        this.errors = data
      }
    },
  }
})
</script>
