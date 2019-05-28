<template>
  <div>
    <v-card>
      <v-card-title class="py-0 px-0">
        <v-toolbar color="blue darken-3" height="27">
          <v-dialog v-model="dialog" persistent  max-width="750px">
          <v-btn slot="activator" flat color="white" small class="mt-1 ml-0 elevation-0">
            <v-icon dark class="mr-1">add_circle</v-icon> Nuevo
          </v-btn>
            <desembolso-form :datos="datos" @cerrar="cerrar($event)"></desembolso-form>
          </v-dialog>
          <v-spacer></v-spacer>
        </v-toolbar> 
      </v-card-title>
      <v-card-text>
        <v-layout row wrap>
          <v-flex xs4>
            <p class="title">
              Solicitado: {{ getConvenio.monto_financiamiento | currency('',',',2,'.') }}
              {{ getConvenio.tipo_moneda.abreviacion }}
            </p>
          </v-flex>
          <v-flex xs4>
            <p class="title">
              Desembolsado: {{ totalDesembolsado | currency('',',',2,'.') }}
              {{ getConvenio.tipo_moneda.abreviacion }}
            </p>
          </v-flex>
          <v-flex xs4>
            <p class="title">
              Saldo: {{ saldo | currency('',',',2,'.') }}
              {{ getConvenio.tipo_moneda.abreviacion }}
            </p>
          </v-flex>
        </v-layout>
      </v-card-text>
      <desembolso-table />
    </v-card>
  </div>
</template>
<script>
import DesembolsoForm from "@/components/convenio/registro/desembolso/DesembolsoForm"
import DesembolsoTable from "@/components/convenio/registro/desembolso/DesembolsoTable"
import { mapGetters, mapMutations} from 'vuex';
export default {
    components: {
      DesembolsoForm,
      DesembolsoTable
    },
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters({
        getDialog: 'get_dialog',
        getConvenio: 'get_convenio',
        datos: 'get_dato_dat_desembolso'
      }),
      totalDesembolsado() {
        let _total = 0
        for ( let i = 0; i < this.getConvenio.componente_convenios.length; i++ ) {
          for ( let j = 0; j < this.getConvenio.componente_convenios[i].desembolsos.length; j++ ) {
            _total = parseFloat(_total) + parseFloat(this.getConvenio.componente_convenios[i].desembolsos[j].importe)
          }
        }
        return _total
      },
      saldo() {
        return parseFloat(this.getConvenio.monto_financiamiento) - parseFloat(this.totalDesembolsado)
      },
      dialog: {
        get () {
          return this.getDialog;
        },
        set (value) {
          this.setDialog(value)
        }
      },
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