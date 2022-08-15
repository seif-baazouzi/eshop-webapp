<template>
  <div class="item">
    <img :src="apiServer + '/images/' + image" :alt="description">
    <div class="content">
      <Rate :value="rate" />
      <h1>{{ name }}</h1>
      <span>by <NuxtLink :to="'/shops/' + shopName">{{ shopName }}</NuxtLink></span>
      <div class="price">{{ formatPrice(price) }} {{ priceCurrency }}</div>
      <div class="description">
        <h5>Description:</h5>
        <p>{{ description }}</p>
      </div>
      <div class="rate" v-if="$store.state.isLogin">
        <h6>Your rate </h6>
        <Rate :value="rateValue" @change="(newRate) => editRate(newRate)" />
      </div>

      <ItemAddToCart
        :itemID="id"
        :shopName="shopName"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { apiServer, priceCurrency } from "../../config/config"
import { parseCookies } from "../../utils/cookies"
import formatPrice from "../../utils/format-price"

export default {
  props: {
    id: {
      type: Number,
      required: true
    },
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
    price: {
      type: Number,
      required: true
    },
    rate: {
      type: Number,
      required: true
    },
    shopName: {
      type: String,
      required: true  
    }
  },
  
  created() {
    this.apiServer = apiServer
    this.priceCurrency = priceCurrency
    this.formatPrice = formatPrice
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
      
      fetch(`${apiServer}/items/${this.id}/rate`, {
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

    const res = await fetch(`${apiServer}/items/user/rate/${this.id}`, {
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
  .content {
    padding: 1rem;
  }

  h1 {
    margin: .25rem 0;
  }

  span {
    font-size: .75rem;
    font-weight: bold;
    position: relative;
    top: -0.5rem;
  }

  .price {
    font-size: .75rem;
    font-weight: bold;
    color: var(--dark-gray);
  }

  .rate {
    margin: 1rem 0 2rem;
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
    .item {
      display: flex;
      align-items: flex-start;
    }

    img {
      width: 60%;
    }

    .content {
      width: 40%;
      padding: 1rem;
    }
  }
</style>
