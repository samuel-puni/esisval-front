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

        </v-layout>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>

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
        usuarios: 'get_dat_usuario'
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
        fetchUsuarios: 'fetchUsuarios'
        //saveUsuarios: 'saveUsuarios'
      }),
      selectedFile () {
        this.$refs.documento.click()
      },
      /*onFileSelected(e){
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
            this.saveUsuarios(_datos)
            .then(() => {
              this.$refs.form.reset()
              this.fetchUsuarios()
              this.$emit('close')
              this.$notificacion.success('Datos Guardados correctamente')
            })
            .catch(() => {
              this.$notificacion.error('Ocurrio un error al guardar los datos.')
            }) 
          }
        }
      },*/
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