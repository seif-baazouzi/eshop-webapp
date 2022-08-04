export const state = () => ({
  isLogin: false,
})

export const mutations = {
  setIsLogin(state: { isLogin: boolean }, value: boolean) {
    state.isLogin = value
  }
}
