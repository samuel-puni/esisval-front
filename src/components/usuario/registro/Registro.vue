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
  import RegistroForm from "@/components/usuario/registro/RegistroForm"
  import RegistroTable from "@/components/usuario/registro/RegistroTable"
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
        usuario: null,
        nombre: null,
        paterno: null,
        materno: null,
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
        getUsuario: 'get_dat_usuario'
      }),
      estado() {
        if (this.getUsuario.length!=0)
          return true
        else
          return false
      }
    },
    methods: {
      ...mapMutations({
        setUsuario: 'set_usuario'
      }),     
      close () {
        this.dialog = false
      },
    },
    mounted() {
      this.$router.push('/usuario/registro/datosgenerales')
    },
  }
</script>
