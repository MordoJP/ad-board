import { getDatabase, ref, push, set } from 'firebase/database'

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
    ads: [
      {
        title: 'First ad',
        description: 'Hello i am description',
        promo: false,
        showInfo: false,
        imageSrc: 'https://images.unsplash.com/photo-1619006179863-f65e2b0c8fba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80',
        id: '123'
      },
      {
        title: 'Second ad',
        description: 'Hello i am description',
        promo: true,
        showInfo: false,
        imageSrc: 'https://images.unsplash.com/photo-1618489517037-66555962ff37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
        id: '1234'
      },
      {
        title: 'Third ad',
        description: 'Hello i am description',
        promo: true,
        showInfo: false,
        imageSrc: 'https://images.unsplash.com/photo-1511878587934-516d7ca5465b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1830&q=80',
        id: '12345'
      },
      {
        title: 'Fourth ad',
        description: 'Hello i am description',
        promo: true,
        showInfo: false,
        imageSrc: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1706&q=80',
        id: '123456'
      },
      {
        title: 'Fifth ad',
        description: 'Hello i am description',
        promo: true,
        showInfo: false,
        imageSrc: 'https://images.unsplash.com/photo-1502920970741-47c1bafc8d49?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80',
        id: '1234567'
      }
    ]
  },
  mutations: {
    createAd (state, payload) {
      state.ads.push(payload)
    }
  },
  actions: {
    async createAd ({ commit, getters }, payload) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const newAd = new Ad(
          payload.title,
          payload.description,
          getters.user.id,
          payload.imageSrc,
          payload.promo
        )
        const db = getDatabase()
        const postListRef = ref(db, 'ads')
        const newPostRef = push(postListRef)
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
