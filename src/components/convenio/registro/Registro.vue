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
  import { mapGetters } from 'vuex'
  import RegistroForm from "@/components/convenio/registro/RegistroForm"
  import RegistroTable from "@/components/convenio/registro/RegistroTable"
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
        convenio: null,
        estudio: null,
        monto_financiamiento: null,
        fecha_emision: null,
        id: null,
        contrato_prestamo_id: null,
        entidad_id: null,
        tipo_moneda_id: null,
        etapa_id:null
      }
    }),
    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    computed: {
      ...mapGetters({
        getConvenio: 'get_convenio'
      }),
      estado() {
        if (this.getConvenio.length!=0)
          return true
        else
          return false
      }
    },
    methods: {    
      close () {
        this.dialog = false
      },
    },
    mounted() {
      this.$router.push('/convenio/registro/datosgenerales')
    },
  }
</script>
