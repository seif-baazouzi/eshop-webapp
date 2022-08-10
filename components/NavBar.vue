<template>
  <nav :class="{ active: scrollValue > 80 }">
    <NuxtLink to="/" class="logo">E-shop</NuxtLink>

    <ul :class="{ hide: !isNavOpen }" @click="closeNav()" v-if="$store.state.isLogin === false">
      <li>
        <NuxtLink
          to="/"
          :class="{ active: $router.currentRoute.path === '/' }"
          >Home
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/items"
          :class="{ active: $router.currentRoute.path === '/items' }"
          >Items
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/shops"
          :class="{ active: $router.currentRoute.path === '/shops' }"
          >Shops
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/carts"
          :class="{ active: $router.currentRoute.path === '/carts' }"
          >Carts
        </NuxtLink>
      </li>

      <li><div class="spacer"></div></li>

      <NuxtLink to="/login" class="vav-btn">
        <button class="blue">Login</button>
      </NuxtLink>
      <NuxtLink to="/signup" class="vav-btn">
        <button class="blue-outline">Signup</button>
      </NuxtLink>
    </ul>

    <ul :class="{ hide: !isNavOpen }" @click="closeNav()" v-else>
      <li>
        <NuxtLink
          to="/"
          :class="{ active: $router.currentRoute.path === '/' }"
          >Home
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/items"
          :class="{ active: $router.currentRoute.path === '/items' }"
          >Items
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/shops"
          :class="{ active: $router.currentRoute.path === '/shops' }"
          >Shops
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/carts"
          :class="{ active: $router.currentRoute.path === '/carts' }"
          >Carts
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/manage-shops"
          :class="{ active: $router.currentRoute.path === '/manage-shops' }"
          >ManageShops
        </NuxtLink>
      </li>

      <li><div class="spacer"></div></li>

      <button class="blue" @click="logout()">Logout</button>
    </ul>

    <div class="burger" :class="{ x: isNavOpen }" @click="toggleNav()">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from "vue"

import { clearCookies } from "../utils/cookies"

export default Vue.extend({
  name: "NavBar",
  
  data() {
    return {
      isNavOpen: false,
      scrollValue: 0,
    }
  },

  created() {
    this.clearCookies = clearCookies

    globalThis?.window?.addEventListener("scroll", this.handleScroll)
  },
  destroyed() {
    globalThis?.window?.removeEventListener("scroll", this.handleScroll)
  },

  methods: {
    toggleNav() {
      this.isNavOpen = !this.isNavOpen
    },

    closeNav() {
      this.isNavOpen = false
    },

    handleScroll() {
      this.scrollValue = globalThis?.window?.scrollY
    },

    logout() {
      clearCookies()

      this.$store.commit("setIsLogin", false)
      this.$store.commit("setUsername", null)
      
      this.$router.push({ path: "/" })
    }
  }
})

</script>

<style scoped>
  nav {
    width: 100%;
    height: 2.5rem;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0; left: 0;
    background-color: var(--white);
    z-index: 1000;
  }

  nav.active {
    box-shadow: var(--shadow);
  }

  .logo {
    font-weight: bold;
    letter-spacing: .075em;
    color: var(--blue);
    transition: color .3s ease-out;
  }

  .logo:hover {
    color: var(--dark-gray);
  }

  ul {
    width: 100%;
    padding-bottom: .75rem;
    position: absolute;
    top: 2.5rem; left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    background-color: var(--white);
    transition: top .3s ease-out;
  }

  ul.hide {
    top: -500%;
  }

  ul li {
    width: 100%;
    list-style: none;
  }

  ul li a {
    width: 100%;
    display: block;
    font-size: .7rem;
    font-weight: bold;
    text-align: center;
    color: var(--dark-gray);
    padding: 0.25rem .25rem;
  }

  ul li a:hover {
    background-color: var(--light-gray);
  }

  ul li a.active {
    color: var(--blue);  
  }

  .vav-btn, ul button {
    width: 100%;
  }

  ul li .spacer {
    width: .5rem;
  }

  .burger {
    width: 1rem;
    cursor: pointer;
  }

  .burger div {
    width: 100%;
    height: .125rem;
    margin: .1rem 0;
    background-color: var(--black);
    transition: .3s;
  }

  .burger.x div:nth-child(1) {
    transform: rotate(45deg) translate(.25rem, .125rem);
  }

  .burger.x div:nth-child(2) {
    opacity: 0;
  }

  .burger.x div:nth-child(3) {
    transform: rotate(-45deg) translate(.25rem, -.125rem);
  }

  @media screen and (min-width: 768px) {
    ul {
      width: fit-content;
      padding: 0;
      position: relative;
      top: 0 !important; left: 0;
      flex-direction: row;
    }

    ul li a:hover {
      background: none;
    }

    .vav-btn {
      display: block;
      margin-left: .25rem;
    }

    .burger {
      display: none;
    }
  }

  @media screen and (max-width: 768px) {
    ul button {
      border: none;
      border-radius: 0;
    }

    ul button:hover {
      border: none;
    }
  }
</style>
