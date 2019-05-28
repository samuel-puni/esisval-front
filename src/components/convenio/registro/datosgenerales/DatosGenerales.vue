<template>
  <div>
    <v-card flat>
    <v-toolbar color="blue darken-3" height="27">
      <v-btn flat color="white" small class="mt-1 ml-0 elevation-0" @click="submit">
        <v-icon dark class="mr-1">save</v-icon> Grabar
      </v-btn>
    </v-toolbar>
    <v-card-text>
     <v-form ref="form" v-model="valid" lazy-validation>
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
      </v-form>
    </v-card-text>
	</v-card>
  </div>
</template>
<script>
  import {mapActions, mapGetters} from 'vuex';
  export default {
    data () {
      return{
        valid: true,
      }
    },
    methods: {
      ...mapActions({
        updateConvenios: 'updateConvenios',
        fetchConvenios: 'fetchConvenios',
        fetchConvenio: 'fetchConvenio',
      }),
      submit () {
        let _datos = this.datos
        if (this.$refs.form.validate()) {
          if (this.datos.id !== 0){
            _datos.usuario = this.getAcceso.usuario.usuario
            this.updateConvenios(_datos)
            .then(() => {
              this.fetchConvenios()
              this.fetchConvenio(this.datos.id)
              this.$notificacion.success('Datos Modificados correctamente')
            })
            .catch(() => {
              this.$notificacion.error('Ocurrio un error al modificar los datos.')
            })
          }
        }
      }
    },
    computed: {
      ...mapGetters({
        getAcceso: 'get_acceso',
        getContratos: 'get_contratos',
        getDatEntidades: 'get_dat_entidad',
        getClaTipoMonedas: 'get_cla_tipo_moneda',
        getClaEtapas: 'get_cla_etapa',
        getConvenio: 'get_convenio',
        datos: 'get_datos_dat_convenio',
      }),
    },
  }
</script>