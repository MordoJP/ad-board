import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { initializeApp } from 'firebase/app'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false
Vue.use(Vuelidate)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created () {
    initializeApp({
      apiKey: 'AIzaSyCgBnWY4urrWCbBfIzh7J-JKApB-2gKzxM',
      authDomain: 'itc-ads-1937c.firebaseapp.com',
      projectId: 'itc-ads-1937c',
      storageBucket: 'itc-ads-1937c.appspot.com',
      messagingSenderId: '131024350818',
      appId: '1:131024350818:web:68c3c516e698a30aae6b3b',
      measurementId: 'G-XG10YRM6WB'
    })
  }
}).$mount('#app')
