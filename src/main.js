import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import auth from './packages/auth'
import { store } from './store'
import confirmar from './plugins/confirmar'
import Notificacion from './plugins/notificacion'
import VueCurrencyFilter from 'vue-currency-filter'

Vue.use(auth)

Vue.use(confirmar)
Vue.use(Notificacion)
Vue.use(VueCurrencyFilter)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
