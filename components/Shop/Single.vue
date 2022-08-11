<template>
  <div class="shop">
    <img :src="apiServer + '/images/' + image" alt="">
    <div class="content">
      <Rate :value="rate" />
      <h2>{{ name }}</h2>

      <div class="description">
        <h5>Description:</h5>
        <p>{{ description }}</p>
      </div>

      <div class="rate" v-if="$store.state.isLogin">
        <h6>Your rate </h6>
        <Rate :value="rateValue" @change="(newRate) => editRate(newRate)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { apiServer } from "../../config/config"
import { parseCookies } from "../../utils/cookies"

export default {
  props: {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    rate: {
      type: Number,
      required: true
    },
  },

  created() {
    this.apiServer = apiServer
  },

  data() {
    return {
      rateValue: 0,
    }
  },

  methods: {
    editRate(newRate) {
      const rawCookie = this.$nuxt?.context?.req?.headers.cookie || document.cookie || ""
      const cookies = parseCookies(rawCookie)

      if(!cookies.token) return

      fetch(`${apiServer}/shops/${this.name}/rate`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          "X-Token": cookies.token
        },
        body: JSON.stringify({ rate: newRate })
      })

      this.rateValue = newRate
    },
  },

  async fetch() {
    const rawCookie = this.$nuxt?.context?.req?.headers.cookie || document.cookie || ""
    const cookies = parseCookies(rawCookie)

    if(!cookies.token) return

    const res = await fetch(`${apiServer}/shops/user/rate/${this.name}`, {
      headers: {
        "X-Token": cookies.token
      }
    })    
    const { rate } = await res.json()
    
    this.rateValue = rate
  },
}
</script>

<style scoped>
  .shop img {
    aspect-ratio: 2 / 1;
    object-fit: cover;
  }
  
  .content {
    padding: 1rem;
  }

  .content h2 {
    margin-top: .25rem;
  }

  .rate {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .rate h6 {
    margin-right: .25rem;
  }

  .description {
    margin: 2rem 0;
  }

  .description h5 {
    margin-bottom: .25rem;
  }

  .description p {
    font-size: .75rem;
    color: var(--dark-gray);
    line-height: 1.25;
  }

  @media screen and (min-width: 768px) {
    .shop {
      display: flex;
      align-items: flex-start;
    }

    .shop img {
      width: 60%;
    }

    .shop .content {
      width: 40%;
    }
  }
</style>
