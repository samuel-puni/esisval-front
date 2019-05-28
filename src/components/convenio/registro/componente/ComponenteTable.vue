<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="datosComponentes"	
        hide-actions
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.componente_convenio }}</td>
        <td>{{ props.item.monto_presupuestado | currency('',',',2,'.') }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)">
            edit
          </v-icon>
          <v-icon small @click="deleteItem(props.item)">
            delete
          </v-icon>
        </td>
        </template>     
        <template slot="no-data">
          <div class="text-xs-center">NO EXISTEN REGISTROS</div>
        </template>
    </v-data-table>
  </div>
</template>
<script>
import {mapActions, mapGetters, mapMutations} from 'vuex';
export default {
  name: 'componente-table',
  data () {
      return {
        headers: [
          { text: 'Componente', value: 'componente_convenio' },
          { text: 'Monto Presupuesto', value: 'monto_presupuesto' },
          { text: 'Acciones', value: 'acciones' },
        ],
      }
  },
  computed: {
    ...mapGetters({
      getConvenio: 'get_convenio',
      getDialogSispro: 'get_dialog',
    }),
    datosComponentes() {
      return this.getConvenio.componente_convenios
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
    ...mapActions({
      deleteComponenteConvenio: 'deleteComponenteConvenio',
      fetchConvenio: 'fetchConvenio',
      fetchConvenios: 'fetchConvenios',
    }),
    ...mapMutations({
      setDialog: 'set_dialog',
      setDatoDatComponenteConvenio: 'set_dato_dat_componente_convenio',
    }),
    editItem (item) {
      this.setDatoDatComponenteConvenio(item)
      this.dialog = true
    },

    deleteItem (item) {
      this.$confirmar('Desea eliminar el Registro?.')
        .then(res => {
          if(res){
            this.deleteComponenteConvenio(item.id).
            then(() => {
              this.fetchConvenios()
              this.fetchConvenio(this.getConvenio.id)
              this.$notificacion.success('Se eliminó correctamente')
            })
          }
        })
        .catch(() => {
          this.$notificacion.error('Ocurrio un error al eliminar el registro.')
        })
    },
  }
}
</script>