import { apiServer } from "~/config/config"
import { parseCookies } from "~/utils/cookies"

export const state = () => ({
  isLogin: false,
  username: null,
})

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    const rawCookie = req.headers.cookie || ""
    const cookies = parseCookies(rawCookie)

    if (cookies.token) {
      const res = await fetch(`${apiServer}/username`, {
        headers: {
          "X-Token": cookies.token
        }
      })
      const data = await res.json()
      console.log(data);

      if (data.username) {
        commit("setIsLogin", true)
        commit("setUsername", data.username)
      }
    }
  }
}

export const mutations = {
  setIsLogin(state: { isLogin: boolean }, value: boolean) {
    state.isLogin = value
  },

  setUsername(state: { username: string }, value: string) {
    state.username = value
  },
}
