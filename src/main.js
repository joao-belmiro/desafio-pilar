import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.filter('formatcurrecy', function (value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
});

new Vue({
  render: h => h(App),
}).$mount('#app')
