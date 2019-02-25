// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'mint-ui/lib/style.css'
import { DatetimePicker, Picker, Popup } from 'mint-ui'
Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Picker.name, Picker)
Vue.component(Popup.name, Popup)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
