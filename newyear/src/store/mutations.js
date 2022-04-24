const mutations = {

  setUserInfo (state, data) {
    if (data) {
      state.userInfo = data
    } else {
      state.userInfo = []
    }
  }
}
export default mutations
