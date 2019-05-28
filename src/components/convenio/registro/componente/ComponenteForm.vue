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
            v-model.trim="datos.componente_convenio"
            :rules="[v => !!v || 'Registrar el componente']"
            label="Componente"
            clearable
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            v-model.trim="datos.monto_presupuestado"
            :rules="[v => !!v || 'Registrar el monto_presupuestado']"
            label="Monto Presupuestado"
            clearable
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-autocomplete
              v-model="datos.componente_id"
              :items="componentesContrato"
              :rules="[v => !!v || 'Seleccionar el Componente del Contrato de Prestamo']"
              label="Componente Contrato de Prestamo"
              item-text="componente"
              item-value="id"
              clearable
              required
              hide-no-data
          ></v-autocomplete>
        </v-flex>
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
    name: 'componente-form',
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
        getConvenio: 'get_convenio',
        getPrestamo: 'get_prestamo',
        getClasificadorComponente: 'get_clasificador_componente'
      }),
      formTitle () {
        if(this.datos.id == null)
          return 'Nuevo Componente'
        else
          return 'Editar Componente'
      },
      componentesContrato() {
        return this.getClasificadorComponente.filter( data => data.contrato_prestamo_id === this.getConvenio.contrato_prestamo_id )
      }
    },
    methods: {
      ...mapActions({
        saveComponenteConvenio: 'saveComponenteConvenio',
        updateComponenteConvenio: 'updateComponenteConvenio',
        fetchConvenio: 'fetchConvenio',
        fetchConvenios: 'fetchConvenios'

      }),
      ...mapMutations({
        setLimpiarDatoDatComponenteConvenio: 'set_limpiar_dato_dat_componente_convenio',
      }),
      grabar() {
        let _datos = this.datos
        _datos.convenio_id = this.getConvenio.id
        if (this.$refs.form.validate()) {
          if(_datos.id === null){
           this.saveComponenteConvenio(_datos)
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
            this.updateComponenteConvenio(_datos)
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
        this.setLimpiarDatoDatComponenteConvenio()
        this.$refs.form.reset()
        this.$emit('cerrar')
      }
    },
}
</script>