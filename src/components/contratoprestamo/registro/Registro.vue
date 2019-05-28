<template>
  <div>
    <v-toolbar color="blue darken-3" height="27" class="pl-0">
      <v-dialog v-model="dialog" persistent max-width="700px">
        <v-btn slot="activator" flat color="white">
          <v-icon dark class="mr-1">add_circle</v-icon> Nuevo
        </v-btn>
        <registro-form :datos="datos" v-on:close="close($event)" />
      </v-dialog>
      <v-spacer></v-spacer>
    </v-toolbar>
    <registro-table />
    <div v-if="estado">
      <tab-esclavo></tab-esclavo>
      <router-view></router-view> 
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import RegistroForm from "@/components/contratoprestamo/registro/RegistroForm"
  import RegistroTable from "@/components/contratoprestamo/registro/RegistroTable"
  import TabEsclavo from "@/components/menus/TabEsclavo"
  
  export default {
    components: {
      RegistroForm,
      RegistroTable,
      TabEsclavo
    },
    data: () => ({
      dialog: false,
      datos: {
        codigo: null,
        nombre: null,
        organismo_financiador_id: null,
        id: null
      }
    }),
    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    computed: {
      ...mapGetters({
        getPrestamo: 'get_prestamo'
      }),
      estado() {
        if (this.getPrestamo.length!=0)
          return true
        else
          return false
      }
    },
    methods: {
      ...mapMutations({
        setPrestamo: 'set_prestamo'
      }),     
      close () {
        this.dialog = false
      },
    },
    mounted() {
      this.$router.push('/contratoprestamo/registro/datosgenerales')
    },
  }
</script>
