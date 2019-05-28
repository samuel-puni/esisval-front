<template>
  <div>
    <v-card flat>
    <v-toolbar color="blue darken-3" height="27">
      <v-btn v-if="getPrestamo.vigente==1" flat color="white" small class="mt-1 ml-0 elevation-0" @click="submit">
        <v-icon dark class="mr-1">save</v-icon> Grabar
      </v-btn>
    </v-toolbar>
    <v-card-text>
     <v-form ref="form" v-model="valid" lazy-validation>
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field
              v-model.trim="datos.codigo"
              :rules="[v => !!v || 'Registrar un código']"
              label="Código"
              required
              clearable
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              v-model.trim="datos.nombre"
              :rules="[v => !!v || 'Registrar una descripción del contrato de prestamo']"
              label="Descripción del Contrato"
              clearable
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-autocomplete
              v-model="datos.organismo_financiador_id"
              :items="organismos"
              :rules="[v => !!v || 'Seleccionar un financiador']"
              label="Organo Financiador"
              item-text="organismo_financiador"
              item-value="id"
              clearable
              autocomplete
              required
            >
              <template slot="item" slot-scope="data" >
                <v-list-tile-content>
                <v-list-tile-title v-html="data.item.organismo_financiador"></v-list-tile-title>
                <v-list-tile-sub-title class="orange--text" v-html="data.item.abreviacion"></v-list-tile-sub-title>
                </v-list-tile-content>
              </template>
            </v-autocomplete>
          </v-flex>
          <v-flex xs12>
            <v-text-field clearable label="Seleccionar Documento Adjunto" @click='selectedFile' v-model='nombre_documento' prepend-icon='attach_file'></v-text-field>
            <input
              type="file"
              style="display: none"
              ref="documento"
              @change="onFileSelected"
            >
          </v-flex>
        </v-layout>
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
        nombre_documento: null
      }
    },
    methods: {
      ...mapActions({
        updatePrestamos: 'updatePrestamos',
        fetchPrestamos: 'fetchPrestamos',
        fetchPrestamo: 'fetchPrestamo',
      }),
      selectedFile () {
        this.$refs.documento.click()
      },
      onFileSelected(e){
        const files = e.target.files
        if(files[0] !== undefined) {
          this.nombre_documento = files[0].name
          this.datos.documento_digital = files[0]
        }
      },
      submit () {
        let _datos = this.datos
        if (this.$refs.form.validate()) {
          if (this.datos.id !== 0){
            this.updatePrestamos(_datos)
            .then(() => {
              this.fetchPrestamos()
              this.fetchPrestamo(this.datos.id)
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
        organismos: 'get_cla_organismo',
        getPrestamo: 'get_prestamo',
        datos: 'get_datos_dat_contrato_prestamo',
      }),
    },
  }
</script>