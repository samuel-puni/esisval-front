<template>
  <div>
    <v-card>
      <v-card-title class="py-0 px-0">
        <v-toolbar color="blue darken-3" height="27">
        <v-dialog v-model="dialog" persistent  max-width="750px">
          <v-btn slot="activator" flat color="white" small class="mt-1 ml-0 elevation-0">
            <v-icon dark class="mr-1">add_circle</v-icon> Nuevo
          </v-btn>
            <componente-form :datos="datos" @cerrar="cerrar($event)"></componente-form>
        </v-dialog>
        <v-spacer></v-spacer>
        </v-toolbar> 
      </v-card-title>
      <v-card-text>
        <v-layout row wrap>
          <v-flex xs6>
            <p class="title">
              Total Financiamiento: {{ getConvenio.monto_financiamiento | currency('',',',2,'.') }} 
              {{ getConvenio.tipo_moneda.abreviacion }}
            </p>
          </v-flex>
          <v-flex xs6>
            <p class="title">
              Total Componentes: {{ total | currency('',',',2,'.') }}
              {{ getConvenio.tipo_moneda.abreviacion }}
            </p>
          </v-flex>
        </v-layout>
      </v-card-text>
      <componente-table />
    </v-card>
  </div>
</template>
<script>
import ComponenteForm from "@/components/convenio/registro/componente/ComponenteForm"
import ComponenteTable from "@/components/convenio/registro/componente/ComponenteTable"
import { mapGetters, mapMutations} from 'vuex';
export default {
    components: {
      ComponenteForm,
      ComponenteTable
    },
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters({
        getDialog: 'get_dialog',
        getConvenio: 'get_convenio',
        datos: 'get_dato_dat_componente_convenio'
      }),
      dialog: {
        get () {
          return this.getDialog;
        },
        set (value) {
          this.setDialog(value)
        }
      },
      total() {
        let _total = 0
        for ( let i = 0; i < this.getConvenio.componente_convenios.length; i++ ) {
          _total = _total + this.getConvenio.componente_convenios[0].monto_presupuestado
        }
        return _total
      }
    },
    methods: {
      ...mapMutations({
        setDialog: 'set_dialog',
      }),
      cerrar () {
        this.dialog = false
      },

    }

  }
</script>