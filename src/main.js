import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false
Vue.use(Vuelidate)

const firebaseConfig = {
  apiKey: 'AIzaSyCgBnWY4urrWCbBfIzh7J-JKApB-2gKzxM',
  authDomain: 'itc-ads-1937c.firebaseapp.com',
  projectId: 'itc-ads-1937c',
  databaseURL: 'https://itc-ads-1937c-default-rtdb.europe-west1.firebasedatabase.app',
  storageBucket: 'itc-ads-1937c.appspot.com',
  messagingSenderId: '131024350818',
  appId: '1:131024350818:web:68c3c516e698a30aae6b3b',
  measurementId: 'G-XG10YRM6WB'
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created () {
    const app = initializeApp(firebaseConfig)
    getDatabase(app)
    onAuthStateChanged(getAuth(), user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })
  }
}).$mount('#app')
