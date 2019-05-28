import { HTTP } from '@/packages/http'

const state = {
  prestamo: [],
  dat_contrato_prestamo: [],
  datos_dat_contrato_prestamo: {
    codigo: null,
    nombre: null,
    organismo_financiador_id: null,
    id: null
  },
  dat_programacion_prestamo: [],
  datos_dat_programacion_prestamo: {
    presupuesto_inicial: 0,
    presupuesto_modificado: 0,
    presupuesto_vigente: 0,
    componente_id: null,
    id: null
  }

};

const actions = {
  fetchPrestamos: ({commit}) => {
    commit('startProcessing')
    return new Promise((resolve, reject) => {
      HTTP.get("prestamo/prestamo")
      .then(response => {
        commit('set_dat_contrato_prestamo',response.data.data)
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
  fetchPrestamo: ({commit},id) => {
    commit('startProcessing')
    return new Promise((resolve, reject) => {
      HTTP.get(`prestamo/prestamo/${id}`)
      .then(response => {
        commit('set_prestamo',response.data.data)
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

  savePrestamos: ({commit},dato) => {
    commit('startProcessing')
    return new Promise((resolve, reject) => {
      let formData = new FormData()
      if (typeof dato.documento_digital != 'undefined' && dato.documento_digital)
        formData.append('documento_digital', dato.documento_digital,dato.documento_digital.name)
        formData.append('codigo', dato.codigo.toUpperCase())
        formData.append('nombre', dato.nombre.toUpperCase())
        formData.append('usuario', dato.usuario)
        formData.append('organismo_financiador_id', dato.organismo_financiador_id)
      HTTP.post("prestamo/prestamo", formData)
      .then(response => {
        commit('set_prestamo',[])
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
  saveComponente: ({commit},dato) => {
    commit('startProcessing')
    return new Promise((resolve, reject) => {
      HTTP.post("prestamo/componente", { componente: dato.componente.toUpperCase(),
      componente_id: dato.componente_id,
      contrato_prestamo_id: dato.contrato_prestamo_id })
      .then(response => {
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

  saveFinanciera: ({commit},dato) => {
    commit('startProcessing')
    return new Promise((resolve, reject) => {
      HTTP.post("prestamo/programacion", { componente_id: dato.componente_id,
      presupuesto_inicial: dato.presupuesto_inicial,
      presupuesto_modificado: dato.presupuesto_modificado,
      presupuesto_vigente: parseInt(dato.presupuesto_inicial) + parseInt(dato.presupuesto_modificado) })
      .then(response => {
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


  updatePrestamos: ({commit},dato) => {
    commit('startProcessing')
    return new Promise((resolve, reject) => {
      let formData = new FormData()
      if (typeof dato.documento_digital != 'undefined' && dato.documento_digital)
        formData.append('documento_digital', dato.documento_digital,dato.documento_digital.name)
      formData.append('codigo', dato.codigo.toUpperCase())
      formData.append('nombre', dato.nombre.toUpperCase())
      formData.append('usuario', dato.usuario)
      formData.append('organismo_financiador_id', dato.organismo_financiador_id)
      formData.append('_method', 'put')
      HTTP.post(`prestamo/prestamo/${dato.id}`, formData)
      .then(response => {
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
  updatePrestamoMoneda: ({commit},dato) => {
    commit('startProcessing')
    return new Promise((resolve, reject) => {
      HTTP.put(`prestamo/prestamo/${dato.id}`, { 
        tipo_moneda_id: dato.tipo_moneda_id })
      .then(response => {
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

  updateFinanciera: ({commit},dato) => {
    commit('startProcessing')
    return new Promise((resolve, reject) => {
      HTTP.put(`prestamo/programacion/${dato.id}`, { 
      presupuesto_inicial: dato.presupuesto_inicial,
      presupuesto_modificado: dato.presupuesto_modificado,
      presupuesto_vigente: parseInt(dato.presupuesto_inicial) + parseInt(dato.presupuesto_modificado) })
      .then(response => {
        commit('set_limpiar_datos_dat_programacion_prestamo')
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

  updateVigente: ({commit},dato) => {
    commit('startProcessing')
    return new Promise((resolve, reject) => {
      HTTP.put(`prestamo/prestamo/${dato.id}`, { 
      vigente: dato.vigente })
      .then(response => {
        commit('set_prestamo',[])
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

  deletePrestamos: ({commit},dato) => {
    commit('startProcessing')
    return new Promise((resolve, reject) => {
      HTTP.delete(`prestamo/prestamo/${dato}`)
      .then(response => {
        commit('set_prestamo',[])

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

  eliminarComponente: ({commit},dato) => {
    commit('startProcessing')
    return new Promise((resolve, reject) => {
      HTTP.delete(`prestamo/componente/${dato}`)
      .then(response => {
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
  eliminarProgramacion: ({commit},dato) => {
    commit('startProcessing')
    return new Promise((resolve, reject) => {
      HTTP.delete(`prestamo/programacion/${dato}`)
      .then(response => {
        commit('set_limpiar_datos_dat_programacion_prestamo')
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
};

const getters = {
  get_dat_contrato_prestamo: (state) => state.dat_contrato_prestamo,
  get_datos_dat_contrato_prestamo: (state) => state.datos_dat_contrato_prestamo,
  get_prestamo: (state) => state.prestamo,

  get_dat_programacion_prestamo: (state) => state.dat_programacion_prestamo,
  get_datos_dat_programacion_prestamo: (state) => state.datos_dat_programacion_prestamo
};

const mutations = {
  set_datos_dat_contrato_prestamo: (state,payload) => {
    state.datos_dat_contrato_prestamo.codigo = payload.codigo
    state.datos_dat_contrato_prestamo.nombre = payload.nombre
    state.datos_dat_contrato_prestamo.organismo_financiador_id = payload.organismo_financiador_id
    state.datos_dat_contrato_prestamo.id = payload.id
  },
  set_dat_contrato_prestamo: (state,payload) => state.dat_contrato_prestamo = payload,
  set_limpiar_datos_dat_contrato_prestamo :  (state) => {
    state.datos_dat_contrato_prestamo.codigo = null
    state.datos_dat_contrato_prestamo.nombre = null
    state.datos_dat_contrato_prestamo.organismo_financiador_id = null
    state.datos_dat_contrato_prestamo.id = null
  },


  set_datos_dat_programacion_prestamo: (state,payload) => {
    state.datos_dat_programacion_prestamo.presupuesto_inicial = payload.presupuesto_inicial
    state.datos_dat_programacion_prestamo.presupuesto_modificado = payload.presupuesto_modificado
    state.datos_dat_programacion_prestamo.presupuesto_vigente = payload.presupuesto_vigente
    state.datos_dat_programacion_prestamo.componente_id = payload.componente_id
    state.datos_dat_programacion_prestamo.id = payload.id
  },
  set_dat_programacion_prestamo: (state,payload) => state.dat_programacion_prestamo = payload,
  set_limpiar_datos_dat_programacion_prestamo :  (state) => {
    state.datos_dat_programacion_prestamo.presupuesto_inicial = 0
    state.datos_dat_programacion_prestamo.presupuesto_modificado = 0
    state.datos_dat_programacion_prestamo.presupuesto_vigente = 0
    state.datos_dat_programacion_prestamo.componente_id = null
    state.datos_dat_programacion_prestamo.id = null
  },
  set_prestamo: (state,payload) => state.prestamo = payload 
};

export default {
  state,
  actions,
  getters,
  mutations,
}