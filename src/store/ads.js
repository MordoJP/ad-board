import { getDatabase, push, ref as refDb, set, onValue, update } from 'firebase/database'
import { getStorage, ref as refStorage, uploadBytes, getDownloadURL } from 'firebase/storage'

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
    },
    updateAd (state, { title, description, id }) {
      const ad = state.ads.find(a => {
        return a.id === id
      })

      ad.title = title
      ad.description = description
    }
  },
  actions: {
    async createAd ({ commit, getters }, payload) {
      commit('clearError')
      commit('setLoading', true)

      const image = payload.image

      try {
        const newAd = new Ad(
          payload.title,
          payload.description,
          getters.user.id,
          '',
          payload.promo
        )

        const db = await getDatabase()
        const databaseRef = await refDb(db, 'ads')
        const newPostRef = await push(databaseRef)
        // в уроке был await, но с ним не работает. В документации ничего толком не нашел про set
        set(newPostRef, newAd)

        const imageExt = image.name.slice(image.name.lastIndexOf('.'))

        // сохранение картинки на сервер
        const storage = await getStorage()
        const storageRef = await refStorage(storage, `ads/${newPostRef.key}.${imageExt}`)
        await uploadBytes(storageRef, image)
        // Получаем ссылку на изображение
        const imageSrc = await getDownloadURL(storageRef)
          .then((url) => {
            return url
          })
          .catch((error) => {
            console.log(error)
          })

        // обновляем ссылку в базе данных
        const updates = {}
        updates[newPostRef.key + '/imageSrc'] = imageSrc
        await update(databaseRef, updates)

        commit('createAd', {
          ...newAd,
          id: newPostRef.key,
          imageSrc
        })
        commit('setLoading', false)
      } catch (e) {
        commit('setError', e.code)
        commit('setLoading', false)
        throw e
      }
    },
    async fetchAds ({ commit }) {
      commit('clearError')
      commit('setLoading', true)

      const db = await getDatabase()
      const databaseRef = await refDb(db, 'ads')

      const resultAds = []

      try {
        await onValue(databaseRef, (fbVal) => {
          const ads = fbVal.val()

          Object.keys(ads).forEach(key => {
            const ad = ads[key]
            resultAds.push(
              new Ad(ad.title, ad.description, ad.ownedId, ad.imageSrc, ad.promo, key)
            )
          })
        }, {
          onlyOnce: true
        })
        commit('setLoading', false)
        commit('loadAds', resultAds)
      } catch (e) {
        commit('setError', e.code)
        commit('setLoading', false)
        throw e
      }
    },
    async updateAd ({ commit }, { title, description, id }) {
      commit('clearError')
      commit('setLoading', true)

      try {
        commit('setLoading', false)
        const db = await getDatabase()
        const databaseRef = await refDb(db, 'ads')
        const updates = {}
        updates[id + '/title'] = title
        updates[id + '/description'] = description
        await update(databaseRef, updates)

        commit('updateAd', {
          title, description, id
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
      return state.ads.filter(ad => ad.promo)
    },
    myAds (state, getters) {
      return state.ads.filter(ad => ad.ownedId === getters.user.id)
    },
    adById (state) {
      return adId => state.ads.find(ad => ad.id === adId)
    }
  }
}
