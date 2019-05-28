<template>
  <div>
    <v-card class="py-0">
      <v-card-title class="py-0 px-0">
        <v-toolbar color="blue darken-3" height="27">
          <v-dialog v-model="dialog_fin" persistent  max-width="750px">
            <v-btn v-if="getPrestamo.vigente==1" slot="activator" flat color="white" small class="mt-1 ml-0 elevation-0">
              <v-icon dark class="mr-1">add_circle</v-icon> Nuevo
            </v-btn>
            <financiera-form :datos="datos" @cerrar="cerrar($event)"></financiera-form>
          </v-dialog>
          <v-spacer></v-spacer>
        </v-toolbar> 
      </v-card-title>  
      <v-card-text class="pb-0">
        <v-layout row wrap>
          <v-flex xs10>
            <v-autocomplete
              v-model="moneda"
              :items="monedas"
              label="Tipo de Moneda"
              item-text="tipo_moneda"
              item-value="id"
              clearable
              dense
              autocomplete
            ></v-autocomplete>
          </v-flex>
          <v-flex xs2 class="pt-2">
            <v-btn v-if="getPrestamo.vigente==1" block color="primary" dark small @click="modificar">
              <v-icon>save</v-icon> Grabar
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card-text>
      <financiera-table></financiera-table>
    </v-card>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapMutations} from 'vuex';
  import FinancieraForm from "@/components/clasificadorOrganismo/registro/financiera/FinancieraForm"
  import FinancieraTable from "@/components/clasificadorOrganismo/registro/financiera/FinancieraTable"
  export default {
    components: {
      FinancieraForm,
      FinancieraTable
    },
    data () {
      return {
        dato: {
          id: 0,
          tipo_moneda_id: null,
        },
      }
    },
    computed: {
      ...mapGetters({
        getDialog: 'get_dialog',
        monedas: 'get_cla_tipo_moneda',
        datos: 'get_datos_dat_programacion_prestamo',
        getPrestamo: 'get_prestamo'
      }),
      dialog_fin: {
        get () {
          return this.getDialog;
        },
        set (value) {
          this.setDialog(value)
        }
      },
      moneda: {
        get () {
          return this.getPrestamo.tipo_moneda_id;
        },
        set (value) {
          this.dato.tipo_moneda_id = value
        }
      },
    },
    methods: {
      ...mapMutations({      
        setDialog: 'set_dialog',
      }),
      ...mapActions({
        updatePrestamoMoneda: 'updatePrestamoMoneda',
        fetchPrestamo: 'fetchPrestamo',
        fetchPrestamos: 'fetchPrestamos'
      }),
      modificar() {
        if (typeof this.dato.tipo_moneda_id !== 'undefined'){
          this.dato.id = this.getPrestamo.id
          this.updatePrestamoMoneda(this.dato)
            .then(() => {
              this.fetchPrestamos()
              this.fetchPrestamo(this.dato.id)
              this.$notificacion.success('Tipo de Moneda guardada correctamente.')
            })
            .catch(() => {
              this.$notificacion.error('Ocurrio un error al grabar.')
            })
        }
        else
          this.$notificacion.error('Registrar el tipo de moneda.')
      },
      cerrar () {
        this.dialog_fin = false
      },
    },
  }
</script>