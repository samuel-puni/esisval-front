import { HTTP } from '@/packages/http'

const state = {
  cla_organismo: [],
  cla_tipo_moneda: [],
  cla_etapa: [],
  dat_entidad: [],
  contratos: [],
  clasificador_componente: []
};

const actions = {
  fetchClasificadores: ({commit}) => {
    commit('startProcessing')
    return new Promise((resolve, reject) => {
      HTTP.get("prestamo/clasificadores")
      .then(response => {
        commit('set_cla_organismo',response.data.organimos)
        commit('set_cla_tipo_moneda',response.data.monedas)
        commit('set_cla_etapa',response.data.etapas)
        commit('set_dat_entidad',response.data.entidades)
        commit('set_contratos',response.data.contratos)
        commit('set_clasificador_componente',response.data.componentes)
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
      .finally(() => {
        commit('stopProcessing')
      })
    })
  }
};

const getters = {
  get_cla_organismo: (state) => state.cla_organismo,
  get_cla_tipo_moneda: (state) => state.cla_tipo_moneda,
  get_cla_etapa: (state) => state.cla_etapa,
  get_dat_entidad: (state) => state.dat_entidad,
  get_contratos: (state) => state.contratos,
  get_clasificador_componente: (state) => state.clasificador_componente,
};

const mutations = {
  set_cla_organismo: (state,payload) => state.cla_organismo = payload,
  set_cla_tipo_moneda: (state,payload) => state.cla_tipo_moneda = payload,
  set_cla_etapa: (state,payload) => state.cla_etapa = payload,
  set_dat_entidad: (state,payload) => state.dat_entidad = payload,
  set_contratos: (state,payload) => state.contratos = payload,
  set_clasificador_componente: (state,payload) => state.clasificador_componente = payload
};

export default {
  state,
  actions,
  getters,
  mutations,
}