<template>
  <div>
    <NavBar />

    <div class="form-container">
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
import { apiServer } from "../config/config"

export default {
  name: "LoginPage",

  data() {
    return {
      email: "",
      password: "",
      errors: {},
    }
  },

  methods: {
    async handleSubmit(event) {
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
        this.$router.push({ path: "/" })
      } else {
        this.errors = data
      }
    },
  }
}
</script>
