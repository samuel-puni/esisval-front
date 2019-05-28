import Vue from 'vue'
import { HTTP } from '@/packages/http'
import config from '@/config'

const state = {
  acceso : null,
  isLogged : false,
  modulos: null

}

const actions = {
  autenticar: ({commit}, login) => {
    commit('startProcessing')
    return new Promise((resolve, reject) => {
      HTTP.post("oauth/token", { 
        client_id: config.client_id,
        client_secret: config.client_secret,
        grant_type: config.grant_type,
        username: login.usuario,
        password: login.password,
        sistema_id: config.sistema_id, })
      .then(response => {
        Vue.auth.setToken(response.data.token)
        commit('set_isLogged')
        commit('set_acceso',response.data.acceso)
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
      .finally(() => {
        commit('stopProcessing')
      })
    })
  },

  accesos: ({commit}) => {
    commit('startProcessing')
    return new Promise((resolve, reject) => {
      HTTP.get(`rbac/users/${state.user}/acceso/${config.sistema_id}`)
      .then(response => {
        commit('set_acceso',response.data.acceso)
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
      .finally(() => {
        commit('stopProcessing')
      })
    })
  },



  cerrarSesion: ({commit}) => {
    Vue.auth.destroyToken()
    commit('set_isLogged')
  }
}

const getters = {
  get_isLogged: (state) => state.isLogged,
  get_acceso: (state) => state.acceso,
  get_user: (state) => state.user,
  get_tabs: (state) => state.modulos,
}

const mutations = {
  set_isLogged: (state) => {
    if(Vue.auth.isAuthenticated()){
      state.isLogged = true
      const token = Vue.auth.getToken()
      const jwtDecode = require('jwt-decode')
      let deco_token = jwtDecode(token); 
      state.user = deco_token.sub
    }
    else{
      state.isLogged = false
    }
  },
  set_acceso: (state,payload) => {
    state.acceso = payload
  },
  set_tabs: (state,payload) => {
    if (state.acceso != null){
      let modulo = state.acceso.menu.filter(dato => dato.descripcion === payload.modulo)
      if(modulo.length > 0){
        let aux = modulo[0].menus_hijos.filter(dato => dato.descripcion === payload.submodulo)
        state.modulos = aux[0].menus_hijos
      }
      else
        state.modulos = null
    }
  }

}

export default {
  state,
  actions,
  getters,
  mutations,
}