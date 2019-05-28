<template>
  <v-card>
    <v-card-text class="pt-0">
      <v-flex xs12>
      <table width="100%" class="financiamiento">
        <thead>
          <tr>
            <th align="center">No</th>
            <th align="center">Carta de Solicitud</th>
            <th align="center">Fecha de Ingreso</th>
            <th align="center">Solicitud de Pago</th>
            <th align="center">Fecha de Pago</th>
            <th align="center">Importe</th>
            <th align="center">Total Financiamiento</th>
            <th align="center">Concepto de Desembolso</th>
            <th align="center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="item in datosDesembolsos">
            <tr :key="item.id*100" class="font-weight-bold font-italic">
              <td colspan="6" align="center" style="background: #D3D3D3;">{{ item.componente_convenio }}</td>
              <td align="right">{{ item.monto_presupuestado | currency('',',',2,'.') }}</td>
              <td colspan="2" style="background: #D3D3D3;"></td>
            </tr>
            <template v-for="(item1, index) in item.desembolsos">
              <tr :key="item1.id">
                <td>{{ index + 1 }}</td>
                <td>{{ item1.carta_solicitud }}</td>
                <td>{{ item1.fecha_ingreso }}</td>
                <td>{{ item1.solicitud_pago }}</td>
                <td>{{ item1.fecha_pago }}</td>
                <td align="right">{{ item1.importe | currency('',',',2,'.') }}</td>
                <td style="background: #D3D3D3;"></td>
                <td>{{ item1.concepto_desembolso }}</td>
                <td class="justify-center layout px-0">
                  <v-icon small class="mr-2" @click="editItem(item1)">
                    edit
                  </v-icon>
                  <v-icon small @click="deleteItem(item1)">
                    delete
                  </v-icon>
                </td>
              </tr>
            </template>
          </template>

        </tbody>
      </table>
      </v-flex>
    </v-card-text>
  </v-card>
</template>
<script>
import {mapActions, mapGetters, mapMutations} from 'vuex';
export default {
  name: 'desembolso-table',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      getConvenio: 'get_convenio',
      getDialog: 'get_dialog',
    }),
    datosDesembolsos() {
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
      deleteConvenioDesembolso: 'deleteConvenioDesembolso',
      fetchConvenio: 'fetchConvenio',
      fetchConvenios: 'fetchConvenios',
    }),
    ...mapMutations({
      setDialog: 'set_dialog',
      setDatoDatDesembolso: 'set_dato_dat_desembolso',
    }),
    editItem (item) {
      this.setDatoDatDesembolso(item)
      this.dialog = true
    },

    deleteItem (item) {
      this.$confirmar('Desea eliminar el Registro?.')
        .then(res => {
          if(res){
            this.deleteConvenioDesembolso(item.id).
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

<style scoped>
  table.financiamiento {  
    border-collapse: 
    collapse; border-spacing: 0; 
}

table.financiamiento td, table.financiamiento th {  
    border-left: 1px solid transparent; 
    border-right: 1px solid transparent; 
    border-bottom: 1px solid #D3D3D3; 
    height: 30px; 
    transition: all 0.3s;  
}

table.financiamiento th {  
    font-weight: bold;
}




</style>