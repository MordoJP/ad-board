import { getDatabase, ref, push, set, onValue } from 'firebase/database'

class Ad {
  constructor (title, description, ownedId, imageSrc = '', promo = false, id = null) {
    this.title = title
    this.description = description
    this.ownedId = ownedId
    this.imageSrc = imageSrc
    this.promo = promo
    this.id = id
  }
}

export default {
  state: {
    ads: []
  },
  mutations: {
    createAd (state, payload) {
      state.ads.push(payload)
    },
    loadAds (state, payload) {
      state.ads = payload
    }
  },
  actions: {
    async createAd ({ commit, getters }, payload) {
      commit('clearError')
      commit('setLoading', true)

      const db = getDatabase()
      const postListRef = ref(db, 'ads')
      const newPostRef = push(postListRef)

      try {
        const newAd = new Ad(
          payload.title,
          payload.description,
          getters.user.id,
          payload.imageSrc,
          payload.promo
        )
        // в уроке был await, но с ним не работает. В документации ничего толком не нашел про set
        set(newPostRef, newAd)

        commit('setLoading', false)
        commit('createAd', {
          ...newAd,
          id: newPostRef.key
        })
      } catch (error) {
        commit('setError', error.code)
        commit('setLoading', false)
        throw error
      }
    },
    async fetchAds ({ commit }) {
      commit('clearError')
      commit('setLoading', true)

      const db = getDatabase()
      const postListRef = ref(db, 'ads')

      const resultAds = []

      try {
        await onValue(postListRef, (fbVal) => {
          const ads = fbVal.val()

          Object.keys(ads).forEach(key => {
            const ad = ads[key]
            resultAds.push(
              new Ad(ad.title, ad.description, ad.ownedId, ad.imageSrc, ad.promo, key)
            )
          })
          commit('loadAds', resultAds)
          console.log(ads)
        }, {
          onlyOnce: true
        })
        commit('setLoading', false)
      } catch (e) {
        commit('setError', e.code)
        commit('setLoading', false)
        throw e
      }
    }
  },
  getters: {
    ads (state) {
      return state.ads
    },
    promoAds (state) {
      return state.ads.filter(ad => {
        return ad.promo
      })
    },
    myAds (state) {
      return state.ads
    },
    adById (state) {
      return adId => {
        return state.ads.find(ad => ad.id === adId)
      }
    }
  }
}
