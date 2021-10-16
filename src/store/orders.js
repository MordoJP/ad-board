import { getDatabase, onValue, push, ref as refDb, set, update } from 'firebase/database'

class Order {
  constructor (name, phone, adId, done = false, id = null) {
    this.name = name
    this.phone = phone
    this.adId = adId
    this.done = done
    this.id = id
  }
}

export default {
  state: {
    orders: []
  },
  mutations: {
    // createOrder (state, payload) {
    //   state.orders.push(payload)
    // }
    loadOrders (state, payload) {
      state.orders = payload
    }
  },
  actions: {
    async createOrder ({ commit }, { name, phone, adId, ownerId }) {
      const order = new Order(name, phone, adId)
      commit('clearError')
      try {
        const db = await getDatabase()
        const databaseRef = await refDb(db, `/users/${ownerId}/orders`)
        const newPostRef = await push(databaseRef)
        set(newPostRef, order)
      } catch (error) {
        commit('setError', error.code)
        throw error
      }
    },
    async fetchOrders ({ commit, getters }) {
      commit('setLoading', true)
      commit('clearError')

      const resultOrders = []

      try {
        const db = await getDatabase()
        const databaseRef = await refDb(db, `/users/${getters.user.id}/orders`)

        await onValue(databaseRef, (fbVal) => {
          const orders = fbVal.val()

          Object.keys(orders).forEach(key => {
            const o = orders[key]
            resultOrders.push(
              new Order(o.name, o.phone, o.adId, o.done, key)
            )
          })
        }, {
          onlyOnce: true
        })

        commit('setLoading', false)
        commit('loadOrders', resultOrders)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.code)
      }
    },
    async markOrderDone ({ commit, getters }, payload) {
      commit('clearError')
      try {
        const db = await getDatabase()
        const databaseRef = await refDb(db, `/users/${getters.user.id}/orders`)
        const updates = {}
        updates[payload + '/done'] = true
        await update(databaseRef, updates)
      } catch (error) {
        commit('setError', error.code)
        throw error
      }
    }
  },
  getters: {
    doneOrders (state) {
      return state.orders.filter(o => o.done)
    },
    undoneOrders (state) {
      return state.orders.filter(o => !o.done)
    },
    orders (state, getters) {
      return getters.undoneOrders.concat(getters.doneOrders)
    }
  }
}
