<template>
  <div>
    <v-card>
      <v-system-bar status color="blue darken-3" dark>
      <v-icon>create</v-icon>
      {{ formTitle }}
      <v-spacer></v-spacer>
      <v-icon @click="cancelar">clear</v-icon>
    </v-system-bar>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-flex xs12>
          <v-text-field
            v-model.trim="datos.carta_solicitud"
            :rules="[v => !!v || 'Registrar la carta de solicitud']"
            label="Carta de Solicitud"
            clearable
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            v-model="datos.fecha_ingreso"
            label="Fecha Ingreso"
            type="date"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            v-model.trim="datos.solicitud_pago"
            label="Solicitud de Pago"
            clearable
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            v-model="datos.fecha_pago"
            label="Fecha Pago"
            type="date"
          ></v-text-field>
        </v-flex>
        <v-text-field
            v-model.trim="datos.importe"
            :rules="[v => !!v || 'Registrar en importe']"
            label="Importe"
            clearable
            required
          ></v-text-field>
        <v-text-field
            v-model.trim="datos.tipo_cambio"
            :rules="[v => !!v || 'Registrar el tipo de cambio']"
            label="Tipo de Cambio (Si el desembolso es en $us. registrar 1"
            clearable
            required
          ></v-text-field>
          <v-text-field
            v-model.trim="datos.concepto_desembolso"
            :rules="[v => !!v || 'Registrar concepto de desembolso']"
            label="Concepto de Desembolso"
            clearable
            required
          ></v-text-field>

          <v-autocomplete
              v-model="datos.componente_convenio_id"
              :items="datosComponenteConvenio"
              :rules="[v => !!v || 'Seleccionar el Componente del convenio']"
              label="Componente Convenio"
              item-text="componente_convenio"
              item-value="id"
              clearable
              required
              hide-no-data
          ></v-autocomplete>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn small color="primary" :disabled="!valid" @click="grabar">Grabar</v-btn>
    </v-card-actions>
	</v-card>
  </div>
</template>
<script>
import {mapActions, mapGetters, mapMutations} from 'vuex';
  export default {
    name: 'desembolso-form',
    data () {
      return {
        valid: true,
      }
    },
    props: {
      datos: {
        type: Object,
        required: true
      }
    },
    computed: {
      ...mapGetters({
        getConvenio: 'get_convenio'
      }),
      datosComponenteConvenio() {
        return this.getConvenio.componente_convenios
      },
      formTitle () {
        if(this.datos.id == null)
          return 'Nuevo Desembolso'
        else
          return 'Editar Desembolso'
      },
    },
    methods: {
      ...mapActions({
        saveConvenioDesembolso: 'saveConvenioDesembolso',
        updateConvenioDesembolso: 'updateConvenioDesembolso',
        fetchConvenio: 'fetchConvenio',
        fetchConvenios: 'fetchConvenios'
      }),
      ...mapMutations({
        setLimpiarDatoDatDesembolso: 'set_limpiar_dato_dat_desembolso',
      }),
      grabar() {
        let _datos = this.datos
        _datos.convenio_id = this.getConvenio.id
        if (this.$refs.form.validate()) {
          if(_datos.id === null){
           this.saveConvenioDesembolso(_datos)
            .then(() => {
              this.$refs.form.reset()
              this.fetchConvenio(this.getConvenio.id)
              this.fetchConvenios()
              this.$emit('cerrar')
              this.$notificacion.success('Datos Guardados correctamente')
            })
            .catch(() => {
              this.$notificacion.error('Ocurrio un error al guardar los datos.')
            })
          }
          else{
            this.updateConvenioDesembolso(_datos)
            .then(() => {
              this.$refs.form.reset()
              this.fetchConvenio(this.getConvenio.id)
              this.fetchConvenios()
              this.$emit('cerrar')
              this.$notificacion.success('Datos Modificados correctamente')
            })
            .catch(() => {
              this.$notificacion.error('Ocurrio un error al eliminar los datos.')
            })
          }
        }
      },
      cancelar() {
        this.setLimpiarDatoDatDesembolso()
        this.$refs.form.reset()
        this.$emit('cerrar')
      }
    }
}
</script>