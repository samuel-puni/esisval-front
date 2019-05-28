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
      nombre_documento: null
    }),
    computed: {
      ...mapGetters({
        getAcceso: 'get_acceso',
        organismos: 'get_cla_organismo'
      }),
      formTitle () {
        if(this.datos.id === null)
          return "NUEVO"
        else{
          return "EDITAR REGISTRO"
        }
      }
    },
    methods: {
      ...mapActions({
        fetchPrestamos: 'fetchPrestamos',
        savePrestamos: 'savePrestamos'
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
        _datos.usuario = this.getAcceso.usuario.usuario
        this.valid = false
        if (this.$refs.form.validate()) {
          if(_datos.id === null){
            this.savePrestamos(_datos)
            .then(() => {
              this.$refs.form.reset()
              this.fetchPrestamos()
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