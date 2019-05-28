import { HTTP } from '@/packages/http'

const state = {
    usuario: [],
    dat_usuario: [],
    datos_dat_usuario: {
        id: null,
        usuario: null,
        nombre: null,
        paterno: null,
        materno: null,
        unidad: null,
        cargo: null,
        telefono_fijo: null,
        telefono_movil: null,
        email: null
    },
};

const actions = {
  fetchUsuarios: ({commit}) => {
    commit('startProcessing')
    return new Promise((resolve, reject) => {
      HTTP.get("rbac/users")
      .then(response => {
        commit('set_dat_usuario',response.data.data)
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
  fetchUsuario: ({commit},id) => {
    commit('startProcessing')
    return new Promise((resolve, reject) => {
      HTTP.get(`rbac/users/${id}`)
      .then(response => {
        commit('set_usuario',response.data.data)
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
/*
  saveConvenios: ({commit},dato) => {
    commit('startProcessing')
    return new Promise((resolve, reject) => {
      HTTP.post("prestamo/convenio", {
        convenio: dato.convenio.toUpperCase(),
        estudio: dato.estudio.toUpperCase(),
        monto_financiamiento: dato.monto_financiamiento,
        contrato_prestamo_id: dato.contrato_prestamo_id,
        entidad_id: dato.entidad_id,
        tipo_moneda_id: dato.tipo_moneda_id,
        etapa_id:dato.etapa_id,
        usuario:dato.usuario
      })
      .then(response => {
        commit('set_convenio',[])
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

  saveComponenteConvenio: ({commit},dato) => {
    commit('startProcessing')
    return new Promise((resolve, reject) => {
      HTTP.post("prestamo/conveniocomponente", {
        componente_convenio: dato.componente_convenio.toUpperCase(),
        monto_presupuestado: dato.monto_presupuestado,
        convenio_id:dato.convenio_id,
        componente_id:dato.componente_id
      })
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

  saveConvenioDesembolso: ({commit},dato) => {
    commit('startProcessing')
    return new Promise((resolve, reject) => {
      HTTP.post("prestamo/conveniodesembolso", {
        carta_solicitud: dato.carta_solicitud,
        solicitud_pago: dato.solicitud_pago,
        fecha_pago: dato.fecha_pago,
        importe: dato.importe,
        tipo_cambio: dato.tipo_cambio,
        concepto_desembolso: dato.concepto_desembolso,
        componente_convenio_id: dato.componente_convenio_id
      })
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

  updateConvenios: ({commit},dato) => {
    commit('startProcessing')
    return new Promise((resolve, reject) => {
      HTTP.put(`prestamo/convenio/${dato.id}`, { 
      convenio: dato.convenio.toUpperCase(),
        estudio: dato.estudio.toUpperCase(),
        monto_financiamiento: dato.monto_financiamiento,
        contrato_prestamo_id: dato.contrato_prestamo_id,
        entidad_id: dato.entidad_id,
        tipo_moneda_id: dato.tipo_moneda_id,
        etapa_id:dato.etapa_id,
        usuario:dato.usuario })
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

  updateComponenteConvenio: ({commit},dato) => {
    commit('startProcessing')
    return new Promise((resolve, reject) => {
      HTTP.put(`prestamo/conveniocomponente/${dato.id}`, {
        componente_convenio: dato.componente_convenio.toUpperCase(),
        monto_presupuestado: dato.monto_presupuestado,
        convenio_id:dato.convenio_id,
        componente_id:dato.componente_id
      })
      .then(response => {
        commit('set_limpiar_dato_dat_componente_convenio')
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

  updateConvenioDesembolso: ({commit},dato) => {
    commit('startProcessing')
    return new Promise((resolve, reject) => {
      HTTP.put(`prestamo/conveniodesembolso/${dato.id}`, {
        carta_solicitud: dato.carta_solicitud,
        solicitud_pago: dato.solicitud_pago,
        fecha_pago: dato.fecha_pago,
        importe: dato.importe,
        tipo_cambio: dato.tipo_cambio,
        concepto_desembolso: dato.concepto_desembolso,
        componente_convenio_id: dato.componente_convenio_id
      })
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

  deleteConvenio: ({commit},dato) => {
    commit('startProcessing')
    return new Promise((resolve, reject) => {
      HTTP.delete(`prestamo/convenio/${dato}`)
      .then(response => {
        commit('set_convenio',[])
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

  deleteComponenteConvenio: ({commit},dato) => {
    commit('startProcessing')
    return new Promise((resolve, reject) => {
      HTTP.delete(`prestamo/conveniocomponente/${dato}`)
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

  deleteConvenioDesembolso: ({commit},dato) => {
    commit('startProcessing')
    return new Promise((resolve, reject) => {
      HTTP.delete(`prestamo/conveniodesembolso/${dato}`)
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
  },*/

};

const getters = {
  get_dat_usuario: (state) => state.dat_usuario,
  get_datos_dat_usuario: (state) => state.datos_dat_usuario, 
};

const mutations = {
   set_datos_dat_usuario: (state,payload) => {
    state.datos_dat_usuario.usuario = payload.usuario
    state.datos_dat_usuario.nombre = payload.nombre
    state.datos_dat_usuario.paterno = payload.paterno
    state.datos_dat_usuario.materno = payload.materno
    state.datos_dat_usuario.unidad = payload.unidad
    state.datos_dat_usuario.cargo = payload.cargo
    state.datos_dat_usuario.email = payload.email
    state.datos_dat_usuario.telefono_fijo = payload.telefono_fijo
    state.datos_dat_usuario.telefono_movil = payload.telefono_movil
  },
  set_dat_usuario: (state,payload) => state.dat_usuario = payload,

  set_limpiar_datos_dat_usuario :  (state) => {
        state.datos_dat_usuario.usuario = null
        state.datos_dat_usuario.nombre = null
        state.datos_dat_usuario.paterno = null
        state.datos_dat_usuario.materno = null
        state.datos_dat_usuario.unidad = null
        state.datos_dat_usuario.cargo = null
        state.datos_dat_usuario.email = null
        state.datos_dat_usuario.telefono_fijo = null
        state.datos_dat_usuario.telefono_movil = null
  },
  set_usuario: (state,payload) => state.usuario = payload,

/*
  set_dato_dat_componente_convenio: (state,payload) => {
    state.dato_dat_componente_convenio.id = payload.id
    state.dato_dat_componente_convenio.componente_convenio = payload.componente_convenio
    state.dato_dat_componente_convenio.componente_id = payload.componente_id
    state.dato_dat_componente_convenio.monto_presupuestado = payload.monto_presupuestado
    state.dato_dat_componente_convenio.monto_ejecutado = payload.monto_ejecutado
    state.dato_dat_componente_convenio.convenio_id = payload.convenio_id
  },
  set_limpiar_dato_dat_componente_convenio :  (state) => {
    state.dato_dat_componente_convenio.id = null
    state.dato_dat_componente_convenio.componente_convenio = null
    state.dato_dat_componente_convenio.componente_id = null
    state.dato_dat_componente_convenio.monto_presupuestado = 0
    state.dato_dat_componente_convenio.monto_ejecutado = 0
    state.dato_dat_componente_convenio.convenio_id = null
  },
  set_dat_componente_convenio: (state,payload) => state.dat_componente_convenio = payload,

  set_dato_dat_desembolso: (state,payload) => {
    state.dato_dat_desembolso.id = payload.id
    state.dato_dat_desembolso.carta_solicitud = payload.carta_solicitud 
    state.dato_dat_desembolso.fecha_ingreso = payload.fecha_ingreso
    state.dato_dat_desembolso.solicitud_pago = payload.solicitud_pago
    state.dato_dat_desembolso.fecha_pago = payload.fecha_pago
    state.dato_dat_desembolso.importe = payload.importe
    state.dato_dat_desembolso.tipo_cambio = payload.tipo_cambio
    state.dato_dat_desembolso.concepto_desembolso = payload.concepto_desembolso
    state.dato_dat_desembolso.componente_convenio_id = payload.componente_convenio_id
  },
  set_limpiar_dato_dat_desembolso :  (state) => {
    state.dato_dat_desembolso.id = null
    state.dato_dat_desembolso.carta_solicitud = null 
    state.dato_dat_desembolso.fecha_ingreso = null
    state.dato_dat_desembolso.solicitud_pago = null
    state.dato_dat_desembolso.fecha_pago = null
    state.dato_dat_desembolso.importe = 0
    state.dato_dat_desembolso.tipo_cambio = 1
    state.dato_dat_desembolso.concepto_desembolso = null
    state.dato_dat_desembolso.componente_convenio_id = null
  },
  set_dat_desembolso: (state,payload) => state.dat_desembolso = payload,*/

};

export default {
  state,
  actions,
  getters,
  mutations,
}