import VueRouter, { Route } from 'vue-router'

declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter
    $route: Route
  }

  interface ComponentOptions {
    head: Function
  }
}
