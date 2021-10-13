export default {
  state: {
    loading: false,
    error: null,
    errors: [
      {
        code: 'auth/user-not-found',
        errorEng: 'Couldn’t find a account associated with this email. Please try again.'
      },
      {
        code: 'auth/wrong-password',
        errorEng: 'The password is invalid. Please try again.'
      }
    ]
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = state.errors.filter(err => err.code === payload).map(el => el.errorEng).toString()
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    setLoading ({ commit }, payload) {
      commit('setLoading', payload)
    },
    setError ({ commit }, payload) {
      commit('setError', payload)
    },
    clearError ({ commit }) {
      commit('clearError')
    }
  },
  getters: {
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
}
