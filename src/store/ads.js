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
    createAd ({ commit }, payload) {
      payload.id = `${Math.floor(Math.random() * 1000)}`

      commit('createAd', payload)
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
