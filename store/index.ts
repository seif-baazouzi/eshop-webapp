export const state = () => ({
  isLogin: false,
  username: null,
})

export const mutations = {
  setIsLogin(state: { isLogin: boolean }, value: boolean) {
    state.isLogin = value
  }
}
