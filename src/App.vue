<template>
  <v-app>
    <div v-if="logged">
      <v-app id="inspire">
        <v-navigation-drawer
          :clipped="$vuetify.breakpoint.lgAndUp"
          v-model="drawer"
          fixed
          app
        >
          <v-list dense>
            <menu-principal />
          </v-list>
        </v-navigation-drawer>
        <v-toolbar
          :clipped-left="$vuetify.breakpoint.lgAndUp"
          color="light-blue darken-4"
          dark
          app
          fixed
        >
          <v-toolbar-title style="width: 300px">
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn flat @click="salir">
              <v-icon>power_settings_new</v-icon> Salir
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-content>
          <v-fade-transition mode="out-in">
            <router-view></router-view>
          </v-fade-transition>
        </v-content>
      </v-app>
    </div>
    <div v-else>
      <v-dialog v-model="dialog" fullscreen hide-overlay>
        <v-card>
          <login />
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</template>

<script>
import Vue from 'vue'
import Login from '@/components/login/Login.vue'
import MenuPrincipal from "@/components/menus/MenuPrincipal.vue"
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  components:{
    Login,
    MenuPrincipal
  },
  name: 'App',
  data () {
    return {
      drawer: null,
    }
  },
  methods:{
    ...mapMutations({
      setIsLogged: 'set_isLogged'
    }),
    ...mapActions({
      accesos: 'accesos',
      cerrarSesion: 'cerrarSesion',
      fetchClasificadores: 'fetchClasificadores'
    }),
    salir() {
      //this.$confirm('Do you really want to exit?').then(res => {
      //  if(res){
          this.cerrarSesion()
          window.location.href = "/"
      //  }
      //})
    }
  },
  computed: {
    ...mapGetters({
      processing: 'get_processing',
      logged: 'get_isLogged',
      getAcceso: 'get_acceso',
      getUser: 'get_user'
    }),
    dialog(){
      if (this.logged)
        return false
      else
        return true
    }
  },
  mounted(){
    this.fetchClasificadores()
    this.setIsLogged()
    if (Vue.auth.isAuthenticated())
      this.accesos(this.getUser)
  }
}
</script>
