<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
	<v-data-table
      v-model="selected"
      :headers="headers"
      :items="getDatContratoPrestamos"
      class="elevation-1"
      :search="search"
    >
      <template slot="items" slot-scope="props">
        <tr :active="props.selected">
          <td @click="seleccionar(props.item)">{{ props.item.codigo }}</td>
          <td @click="seleccionar(props.item)">{{ props.item.nombre }}</td>
          <td @click="seleccionar(props.item)">{{ props.item.organismo_financiador.organismo_financiador }} - {{ props.item.organismo_financiador.abreviacion }}</td>
          <td @click="seleccionar(props.item)">{{ props.item.usuario }}</td>
          <td class="justify-center layout px-0">
            <template v-if="props.item.vigente == 1">
            <v-icon small class="mr-2" color="blue darken-2" @click="cerrarItem(props.item)">
              lock_open
            </v-icon>
            <v-icon small @click="deleteItem(props.item)">
              delete
            </v-icon>  
            </template>
            <template v-else>
            <v-icon small class="mr-2" color="red" @click="cerrarItem(props.item)">
              lock
            </v-icon>
            </template>
          </td>
        </tr>
      </template>
      <template slot="pageText" slot-scope="props">
           {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
      </template>
      <template slot="no-data">
        <p class="text-xs-center">Sin Registro</p>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
  export default {
    name: 'registro-table',
    data: () => ({
      search: '',
      headers: [
        { text: 'Código',value: 'codigo' },
        { text: 'Contrato de Prestamo', value: 'nombre' },
        { text: 'Organismo', value: 'organismo_financiador.organismo_financiador' },
        { text: 'Usuario', value: 'organismo_financiador.usuario' },
        { text: 'Acciones', value: 'name', sortable: false }
      ],
      selected: []
    }),
    computed: {
      ...mapGetters({
        getDatContratoPrestamos: 'get_dat_contrato_prestamo',
        getPrestamo: 'get_prestamo'
      })
    },
    methods: {
      ...mapActions({
        fetchPrestamos: 'fetchPrestamos',
        deletePrestamos: 'deletePrestamos',
        updateVigente: 'updateVigente'
      }),
      ...mapMutations({
        setPrestamo: 'set_prestamo',
        setDatosDatContratoPrestamo: 'set_datos_dat_contrato_prestamo'
      }),
      seleccionar (item) {
        this.setPrestamo(item)
        this.selected = []
        this.selected.push(item)
        this.setDatosDatContratoPrestamo(item)
      },
      cerrarItem (item) {
        this.$confirmar('Desea cambiar estado del convenio '+ item.nombre +'?.')
        .then(res => {
          if(res){
            this.updateVigente(item)
            .then(() => {
              this.fetchPrestamos()
              this.$notificacion.success('Se cerro correctamente el convenio '+ item.nombre)
            })
            .catch(() => {
              this.$notificacion.error('Ocurrio un error al guardar los datos.')
            }) 
          }
        })
      },
      deleteItem (item) {
        this.$confirmar('Desea eliminar el Contrato '+ item.nombre +'?.')
        .then(res => {
          if(res){
            this.deletePrestamos(item.id).
            then(() => {
              this.fetchPrestamos()
              this.selected = []
              this.$notificacion.success('Se eliminó correctamente')
            })
          }
        })
        .catch(() => {
          this.$notificacion.error('Ocurrio un error al eliminar el contrato.')
        }) 
      },
    },
    mounted () {
      this.fetchPrestamos().then(() => {
        if (!this.getPrestamo){
          this.selected = []
        }
        else{
          this.selected.push(this.getPrestamo)
        }
      })
    },
  }

</script>

<style lang="css">
  table.v-table tbody tr[active] {
    background:  #ffffe6;
  }
  table.v-table tbody td, table.v-table tbody th {
    height: 30px;
  }
  table.v-table thead td, table.v-table thead th {
    height: 30px;
  }
</style>