<template>
  <div v-if="datosComponentes.length > 0 ">
    <v-card>
      <v-card-text class="pt-0">
        <v-flex xs12>
        <table width="100%" class="financiamiento">
          <thead>
            <tr>
              <th colspan="5">{{ getPrestamo.organismo_financiador.organismo_financiador }} ({{ getPrestamo.organismo_financiador.abreviacion }})</th>
            </tr>
            <tr>
              <th align="center">Componente</th>
              <th align="center">Presupuesto Inicial</th>
              <th align="center">Presupuesto Modificado</th>
              <th align="center">Presupuesto Actual</th>
              <th align="center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="item in datosComponentes">
              <tr :key="item.id" class="font-weight-bold font-italic">
                <td>{{ item.componente }}</td>
                <td align="right">{{ totalComponente(item.id,1) | currency('',',',2,'.') }}</td>
                <td align="right">{{ totalComponente(item.id,2) | currency('',',',2,'.') }}</td>
                <td align="right">{{ totalComponente(item.id,3) | currency('',',',2,'.') }}</td>
                <td></td>
              </tr>
              <template v-for="item1 in item.hijo_componentes">
                <tr :key="item1.id">
                  <td>{{ item1.componente }}</td>
                  <td v-if="item1.programacion_prestamos.length > 0" align="right">{{ item1.programacion_prestamos[0].presupuesto_inicial  | currency('',',',2,'.') }}</td>
                  <td v-else align="right">0.00</td>
                  <td v-if="item1.programacion_prestamos.length > 0" align="right">{{ item1.programacion_prestamos[0].presupuesto_modificado  | currency('',',',2,'.') }}</td>
                  <td v-else align="right">0.00</td>
                  <td v-if="item1.programacion_prestamos.length > 0" align="right">{{ item1.programacion_prestamos[0].presupuesto_vigente  | currency('',',',2,'.') }}</td>
                  <td v-else align="right">0.00</td>
                  <td class="justify-center layout px-0">
                    <v-icon v-if="item1.programacion_prestamos.length > 0" small class="mr-2" @click="editItem(item1)">
                      edit
                    </v-icon>
                    <v-icon v-if="item1.programacion_prestamos.length > 0" small @click="deleteItem(item1)">
                      delete
                    </v-icon>
                  </td>
                </tr>
              </template>
            </template>
          </tbody>
          <tfoot>
            <tr>
              <th align="left">Total:</th>
              <th align="right">{{ total(1) | currency('',',',2,'.') }}</th>
              <th align="right">{{ total(2) | currency('',',',2,'.') }}</th>
              <th align="right">{{ total(3) | currency('',',',2,'.') }}</th>
            </tr>
          </tfoot>
        </table>
        </v-flex>
      </v-card-text>
    </v-card>
  </div>
  <div v-else>
    <p class="text-xs-center pb-3 body-2">REGISTRAR COMPONENTES</p>  
  </div>
</template>
<script>
import {mapActions, mapGetters, mapMutations} from 'vuex';
export default {
  name: 'financiera-table',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters({
      getPrestamo: 'get_prestamo',
      getDialog: 'get_dialog',
    }),
    dialog_fin: {
      get () {
        return this.getDialog;
      },
      set (value) {
        this.setDialog(value)
      }
    },
    datosComponentes() {
      return this.getPrestamo.componentes
    },
  },
  methods: {
    ...mapActions({
      eliminarProgramacion: 'eliminarProgramacion',
      fetchPrestamo: 'fetchPrestamo',
    }),
    ...mapMutations({
      setDialog: 'set_dialog',
      setDatosDatProgramacionPrestamo: 'set_datos_dat_programacion_prestamo',
    }),
    totalComponente(id,tipo){
      let _dato = this.getPrestamo.componentes.filter(dato => dato.id === id)
      let _total = 0
      for ( let i = 0; i < _dato[0].hijo_componentes.length; i++ ) {
        if (typeof _dato[0].hijo_componentes[i].programacion_prestamos[0] !== 'undefined'){
          if(tipo == 1)
            _total = parseInt(_total) + parseInt(_dato[0].hijo_componentes[i].programacion_prestamos[0].presupuesto_inicial)
          if(tipo == 2)
            _total = parseInt(_total) + parseInt(_dato[0].hijo_componentes[i].programacion_prestamos[0].presupuesto_modificado)
          if(tipo == 3)
            _total = parseInt(_total) + parseInt(_dato[0].hijo_componentes[i].programacion_prestamos[0].presupuesto_vigente)
        }
      }
      return _total
    },
    total(tipo) {
      let _total = 0
      for ( let i = 0; i < this.getPrestamo.componentes.length; i++ ) {
        for ( let j = 0; j < this.getPrestamo.componentes[i].hijo_componentes.length; j++ ) {
          if (typeof this.getPrestamo.componentes[i].hijo_componentes[j].programacion_prestamos[0] !== 'undefined'){
            if(tipo == 1)
              _total = parseInt(_total) + parseInt(this.getPrestamo.componentes[i].hijo_componentes[j].programacion_prestamos[0].presupuesto_inicial)
            if(tipo == 2)
              _total = parseInt(_total) + parseInt(this.getPrestamo.componentes[i].hijo_componentes[j].programacion_prestamos[0].presupuesto_modificado)
            if(tipo == 3)
              _total = parseInt(_total) + parseInt(this.getPrestamo.componentes[i].hijo_componentes[j].programacion_prestamos[0].presupuesto_vigente)
          }
        }
      }
      return _total
    },    
    deleteItem (item) {
      this.$confirmar('Desea eliminar el Registro?.')
        .then(res => {
          if(res){
            this.eliminarProgramacion(item.programacion_prestamos[0].id).
            then(() => {
              this.fetchPrestamo(item.contrato_prestamo_id)
              this.$notificacion.success('Se eliminó correctamente')
            })
          }
        })
        .catch(() => {
          this.$notificacion.error('Ocurrio un error al eliminar el registro.')
        })
    },
    editItem (item) {
      this.setDatosDatProgramacionPrestamo(item.programacion_prestamos[0])
      this.dialog_fin = true
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


table.financiamiento tr:nth-child(even) td { background: #F1F1F1; }   

table.financiamiento tr:nth-child(odd) td { background: #FEFEFE; }  

table.financiamiento tr:hover td { background: #D3D3D3; }  

</style>