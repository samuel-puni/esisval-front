/*this.$confirmar('Se eliminará toda la información registrada del requerimiento. Desea eliminar el Registro?.')
        .then(res => {
          if(res){
            
          }
        })*/

import Confirm from './Confirmar.vue'

function Install (Vue, options) {
  const property = (options && options.property) || '$confirmar'
  function createDialogCmp (options) {
    return new Promise(resolve => {
      const cmp = new Vue(Object.assign(Confirm, {
        destroyed: () => {
          document.body.removeChild(cmp.$el)
          resolve(cmp.value)
        }
      }))
      Object.assign(cmp, Vue.prototype.$confirmar.options || {}, options)
      document.body.appendChild(cmp.$mount().$el)
    })
  }
  
  function show (message, options = {}) {
    options.message = message
    return createDialogCmp(options)
  }

  Vue.prototype[property] = show
  Vue.prototype[property].options = options || {}
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Install)
}

export default Install
