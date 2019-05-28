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
      :items="getDatConvenios"
      class="elevation-1"
      :search="search"
    >
      <template slot="items" slot-scope="props">
        <tr :active="props.selected">
          <td @click="seleccionar(props.item)">{{ props.item.convenio }}</td>
          <td @click="seleccionar(props.item)">{{ props.item.estudio }}</td>
          <td @click="seleccionar(props.item)">{{ props.item.usuario }}</td>
          <td class="justify-center layout px-0">
            <v-icon small @click="deleteItem(props.item)">
              delete
            </v-icon> 
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
        { text: 'Convenio',value: 'convenio' },
        { text: 'Estudio', value: 'estudio' },
        { text: 'Usuario', value: 'usuario' },
        { text: 'Acciones', value: 'name', sortable: false }
      ],
      selected: []
    }),
    computed: {
      ...mapGetters({
        getDatConvenios: 'get_dat_convenio',
        getConvenio: 'get_convenio'
      })
    },
    methods: {
      ...mapActions({
        fetchConvenios: 'fetchConvenios',
        deleteConvenio: 'deleteConvenio',
      }),
      ...mapMutations({
        setConvenio: 'set_convenio',
        setDatosDatConvenio: 'set_datos_dat_convenio'
      }),
      seleccionar (item) {
        this.setConvenio(item)
        this.selected = []
        this.selected.push(item)
        this.setDatosDatConvenio(item)
      },
      deleteItem (item) { 
        this.$confirmar('Desea eliminar el CIF '+ item.estudio +'?.')
        .then(res => {
          if(res){
            this.deleteConvenio(item.id).
            then(() => {
              this.fetchConvenios()
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
      this.fetchConvenios().then(() => {
        if (!this.getConvenio){
          this.selected = []
        }
        else{
          this.selected.push(this.getConvenio)
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