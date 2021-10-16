import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'

class User {
  constructor (id) {
    this.id = id
  }
}

export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    async registerUser ({ commit }, { email, password }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const user = await createUserWithEmailAndPassword(getAuth(), email, password)
        commit('setLoading', false)
        commit('setUser', new User(user.uid))
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.code)
        throw error
      }
    },
    async loginUser ({ commit }, { email, password }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const user = await signInWithEmailAndPassword(getAuth(), email, password)
        commit('setLoading', false)
        commit('setUser', new User(user.uid))
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.code)
        throw error
      }
    },
    autoLoginUser ({ commit }, payload) {
      commit('setUser', new User(payload.uid))
    },
    logoutUser ({ commit }) {
      signOut(getAuth()).then(() => {
        commit('setUser', null)
      })
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    isUserLoggedIn (state) {
      // подумать как задействовать onAuthStateChanged наблюдатель входа
      return state.user !== null
    }
  }
}
