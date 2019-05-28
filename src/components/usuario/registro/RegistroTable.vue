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
      :items="getDatUsuario"
      class="elevation-1"
      :search="search"
    >
      <template slot="items" slot-scope="props">
        <tr :active="props.selected">
          <td @click="seleccionar(props.item)">{{ props.item.usuario }}</td>
          <td @click="seleccionar(props.item)">{{ props.item.nombre }}</td>
          <td @click="seleccionar(props.item)">{{ props.item.paterno}}</td>
          <td @click="seleccionar(props.item)">{{ props.item.materno}}</td>
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
        { text: 'Usuario',value: 'usuario' },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Paterno', value: 'paterno' },
        { text: 'Materno', value: 'materno' },
        { text: 'Unidad', value: 'unidad', sortable: false }
      ],
      selected: []
    }),
    computed: {
      ...mapGetters({
        getDatUsuario: 'get_dat_usuario',
        getUsuario: 'get_datos_dat_usuario'
      })
    },
    methods: {
      ...mapActions({
        fetchUsuarios: 'fetchUsuarios',
        deleteUsuarios: 'deleteUsuarios'
        //updateVigente: 'updateVigente'
      }),
      ...mapMutations({
        setUsuario: 'set_usuario',
        setDatosDatUsuario: 'set_datos_dat_usuario'
      }),
      seleccionar (item) {
        this.setUsuario(item)
        this.selected = []
        this.selected.push(item)
        this.setDatosDatUsuario(item)
      },
      /*cerrarItem (item) {
        this.$confirmar('Desea cambiar estado del convenio '+ item.nombre +'?.')
        .then(res => {
          if(res){
            this.updateVigente(item)
            .then(() => {
              this.fetchUsuarios()
              this.$notificacion.success('Se cerro correctamente el convenio '+ item.nombre)
            })
            .catch(() => {
              this.$notificacion.error('Ocurrio un error al guardar los datos.')
            }) 
          }
        })
      },*/
      /*deleteItem (item) {
        this.$confirmar('Desea eliminar el Contrato '+ item.nombre +'?.')
        .then(res => {
          if(res){
            this.deleteUsuarios(item.id).
            then(() => {
              this.fetchUsuarios()
              this.selected = []
              this.$notificacion.success('Se eliminó correctamente')
            })
          }
        })
        .catch(() => {
          this.$notificacion.error('Ocurrio un error al eliminar el contrato.')
        }) 
      },*/
    },
    mounted () {
      this.fetchUsuarios().then(() => {
        if (!this.getUsuario){
          this.selected = []
        }
        else{
          this.selected.push(this.getUsuario)
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