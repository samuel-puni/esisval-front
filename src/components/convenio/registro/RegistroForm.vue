<template>
  <v-card>
    <v-system-bar status color="blue darken-3" dark>
      <v-icon>create</v-icon>
      {{ formTitle }}
      <v-spacer></v-spacer>
      <v-icon @click="cancelar">clear</v-icon>
    </v-system-bar>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field
              v-model.trim="datos.convenio"
              :rules="[v => !!v || 'Registrar el Convenio']"
              label="Convenio CIF"
              required
              clearable
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-autocomplete
              v-model="datos.contrato_prestamo_id"
              :items="getContratos"
              :rules="[v => !!v || 'Seleccionar el contrato de convenio']"
              label="Fuente de Financiamiento"
              item-text="nombre"
              item-value="id"
              clearable
              required
              hide-no-data
            ></v-autocomplete>
          </v-flex>
          <v-flex xs12>
            <v-autocomplete
              v-model="datos.entidad_id"
              :items="getDatEntidades"
              :rules="[v => !!v || 'Seleccionar entidad beneficiaria']"
              label="Entidad Beneficiaria"
              item-text="entidad"
              item-value="id"
              clearable
              required
              hide-no-data
            ></v-autocomplete>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              v-model.trim="datos.estudio"
              :rules="[v => !!v || 'Registrar el estudio']"
              label="Estudio"
              clearable
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              v-model.trim="datos.monto_financiamiento"
              :rules="[v => !!v || 'Registrar el monto de financiamiento']"
              label="Monto de Financiamiento"
              clearable
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-autocomplete
              v-model="datos.tipo_moneda_id"
              :items="getClaTipoMonedas"
              :rules="[v => !!v || 'Seleccionar el tipo de moneda']"
              label="Tipo Moneda"
              item-text="tipo_moneda"
              item-value="id"
              clearable
              required
              hide-no-data
            ></v-autocomplete>
          </v-flex>
          <v-flex xs12>
            <v-autocomplete
              v-model="datos.etapa_id"
              :items="getClaEtapas"
              :rules="[v => !!v || 'Seleccionar la etapa']"
              label="Etapa"
              item-text="etapa"
              item-value="id"
              clearable
              required
              hide-no-data
            ></v-autocomplete>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn small color="primary" flat :disabled="!valid" @click="submit">
        <v-icon dark class="mr-1">save</v-icon> Grabar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    name: 'registro-form',
    props: {
      datos: {
        type: Object,
        required: true
      }
    },
    data: () => ({
      valid: false,
    }),
    computed: {
      ...mapGetters({
        getAcceso: 'get_acceso',
        getContratos: 'get_contratos',
        getDatEntidades: 'get_dat_entidad',
        getClaTipoMonedas: 'get_cla_tipo_moneda',
        getClaEtapas: 'get_cla_etapa'
      }),
      formTitle () {
        return "NUEVO"
      }
    },
    methods: {
      ...mapActions({
        fetchConvenios: 'fetchConvenios',
        saveConvenios: 'saveConvenios'
      }),
      submit () {
        let _datos = this.datos
        _datos.usuario = this.getAcceso.usuario.usuario
        this.valid = false
        if (this.$refs.form.validate()) {
          if(_datos.id === null){
            this.saveConvenios(_datos)
            .then(() => {
              this.$refs.form.reset()
              this.fetchConvenios()
              this.$emit('close')
              this.$notificacion.success('Datos Guardados correctamente')
            })
            .catch(() => {
              this.$notificacion.error('Ocurrio un error al guardar los datos.')
            }) 
          }
        }
      },
      cancelar() {
        this.$refs.form.reset()
        this.$emit('close')
      }
    }
  } 
</script>

<style scoped>
input {
  text-transform: uppercase
}
</style>