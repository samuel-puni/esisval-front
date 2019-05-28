import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import login from './modules/login';
import clasificadores from './modules/clasificadores';
import convenio from './modules/convenio';
import prestamo from './modules/prestamo';
import usuario from './modules/usuario';

export const store = new Vuex.Store({
  state: {
    processing: false,
    dialog: false,
  },
  mutations: {
    startProcessing: (state) => state.processing = true,
    stopProcessing: (state) => state.processing = false,
    set_dialog: (state,payload) => state.dialog = payload,
  },
  actions: {

  },
  getters: {
    get_processing: (state) => state.processing,
    get_dialog: (state) => state.dialog,
  },
  modules:{
    login,
    clasificadores,
    convenio,
    prestamo,
    usuario
  },
})