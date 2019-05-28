<template>
  <v-card>
    <v-system-bar status color="blue darken-3" dark>
      <v-icon>create</v-icon>
        {{ formTitle }}
        <v-spacer></v-spacer>
      <v-icon @click="cancelar">clear</v-icon>
    </v-system-bar>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-layout wrap>
          <v-flex xs12>
           <v-autocomplete
              v-model="datos.componente_id"
              :items="componentes"
              label="Componente"
              item-text="componente"
              item-value="id"
              required
              :rules="[v => !!v || 'Seleccionar componente']"
              clearable
            >
            </v-autocomplete>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              v-model="datos.presupuesto_inicial"
              :rules="[v => !!v || 'Registrar presupuesto inicial']"
              label="Presupuesto Inicial"
              required
              clearable
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              v-model="datos.presupuesto_modificado"
              label="Presupuesto Modificado"
              clearable
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn small color="primary" flat :disabled="!valid" @click="submit">
        <v-icon dark class="mr-1">save</v-icon> Grabar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import {mapActions, mapGetters, mapMutations} from 'vuex';
  export default {
    name: 'financiera-form',
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
        getPrestamo: 'get_prestamo',
      }),
      componentes() {
        let _componentes = []
        for ( let i = 0; i < this.getPrestamo.componentes.length; i++ ) {
          let p = this.getPrestamo.componentes[i]
          _componentes.push({'header':p.componente})
          for ( let i = 0; i < p.hijo_componentes.length; i++ ) {
            _componentes.push(p.hijo_componentes[i])
          }
        }
        return _componentes
      },
      formTitle () {
        if(this.datos.id!==null){
          return 'Editar Financiamiento'
        }
        else{
          return 'Nuevo Financiamiento'
        }
      },
    },
    methods: {
      ...mapActions({
        saveFinanciera: 'saveFinanciera',
        fetchPrestamo: 'fetchPrestamo',
        fetchPrestamos: 'fetchPrestamos',
        updateFinanciera: 'updateFinanciera'
      }),
      ...mapMutations({
        setLimpiarDatosDatProgramacionPrestamo: 'set_limpiar_datos_dat_programacion_prestamo',
      }),
      submit() {
        let _datos = this.datos 
        if(_datos.presupuesto_modificado == null)
          _datos.presupuesto_modificado = 0

        if (this.$refs.form.validate()) {
          if(_datos.id === null){
            this.saveFinanciera(_datos)
            .then(() => {
              this.$refs.form.reset()
              this.fetchPrestamo(this.getPrestamo.id)
              this.fetchPrestamos()
              this.$emit('cerrar')
              this.$notificacion.success('Datos Guardados correctamente')
            })
            .catch(() => {
              this.$notificacion.error('Ocurrio un error al guardar los datos.')
            })
          }
          else{
            this.updateFinanciera(_datos)
            .then(() => {
              this.$refs.form.reset()
              this.fetchPrestamo(this.getPrestamo.id)
              this.fetchPrestamos()
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
        this.setLimpiarDatosDatProgramacionPrestamo()
        this.$refs.form.reset()
        this.$emit('cerrar')
      }
    }
}
</script>