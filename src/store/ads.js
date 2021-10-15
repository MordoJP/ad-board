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
    }
  },
  actions: {
    async createAd ({ commit, getters }, payload) {
      commit('clearError')
      commit('setLoading', true)

      const image = payload.image

      const db = getDatabase()
      const databaseRef = refDb(db, 'ads')
      const newPostRef = push(databaseRef)

      try {
        const newAd = new Ad(
          payload.title,
          payload.description,
          getters.user.id,
          '',
          payload.promo
        )
        // в уроке был await, но с ним не работает. В документации ничего толком не нашел про set
        set(newPostRef, newAd)

        const imageExt = image.name.slice(image.name.lastIndexOf('.'))

        // сохранение картинки на сервер
        // как в уроке
        // const fileData = await fb.storage().ref(`ads/${ad.key}.${imageExt}`).put(image)
        // const imageSrc = fileData.metadata.downloadUrls[0]
        // await fb.database().ref('ads').child(ad.key).update({
        //   imageSrc
        // })
        const storage = getStorage()
        const storageRef = refStorage(storage, `ads/${newPostRef.key}.${imageExt}`)
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

        commit('setLoading', false)
        commit('createAd', {
          ...newAd,
          id: newPostRef.key,
          imageSrc
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
      const databaseRef = refDb(db, 'ads')

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
          commit('loadAds', resultAds)
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
