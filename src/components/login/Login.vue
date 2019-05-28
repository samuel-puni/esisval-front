<template>
  <v-app id="inspire">
    <v-content>
      <div v-if="processing">
        <loading></loading>
      </div>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <v-card class="elevation-12">
              <v-toolbar dark color="light-blue darken-4">
                <v-toolbar-title>Seguimiento de Desembolsos</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-container fluid grid-list-md  class="pa-0 ma-0">
                <v-layout row wrap justify-center align-center>
                <v-flex xs12 md5>
                  <v-img
                    :src="require('@/assets/dgpp_blanco.jpg')"
                    height="200px"
                    width="200px"
                  ></v-img>
                </v-flex>
                <v-flex xs12 md7 >
                  <v-form>
                    <v-text-field prepend-icon="person" v-model="login.usuario" label="Usuario" type="text"></v-text-field>
                    <v-text-field prepend-icon="lock" v-model="login.password" label="Contraseña" type="password"></v-text-field>
                  </v-form>
                </v-flex>
                </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="light-blue darken-4" class="white--text" :disabled="!verificarBoton" @click="ingresar">
                  <v-icon class="mr-2">arrow_forward</v-icon> Ingresar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import loading from "@/components/utils/Loading";
  export default {
    components:{
      loading,
    },
    data() {
      return {
        error_login : false,
        login: {
          usuario: null,
          password: null
        },
      }
    },
    computed: {
      ...mapGetters({
        processing: 'get_processing',
      }),
      verificarBoton() {
        return this.login.usuario && this.login.password
      }
    },
    methods: {
      ...mapActions({
        autenticar: 'autenticar',
      }),
      ingresar() {
        this.autenticar({usuario:this.login.usuario,password:this.login.password})
        .then(
          () => {
            this.$notificacion.success('Bienvenidos al Sistema de Seguimiento de Desembolsos')
          },
          () => {
            this.$notificacion.error('Usuario/contraseña incorrecta.')
          }
        )
      }
    }
  }
</script>