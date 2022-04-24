const actions = {
  setUserInfo ({commit}, data) {
    return new Promise(resolve => {
      commit('setUserInfo', data)
      resolve()
    })
  }
}

export default actions
