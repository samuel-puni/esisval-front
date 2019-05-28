<template>
  <div>
    <v-list class="pa-0">
      <v-list-tile avatar v-if="datosUsuario">
        <v-list-tile-avatar>
          <img :src="require('@/assets/login.png')" >
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>
            {{ get_acceso.usuario.usuario }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>  
    </v-list>
    <v-list v-if="datosUsuario">
      <v-list-group
      v-for="item in get_acceso.menu"
      :key="item.menu"
      :prepend-icon="item.icono"
      no-action
      >
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title>{{ item.menu }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-for="subItem in item.menus_hijos" :key="subItem.menu" router :to="subItem.ruta">
          <v-list-tile-content>
            <v-list-tile-title>
            <v-tooltip top max-width="300">
              <span slot="activator">{{ subItem.menu }}</span>
              <span>{{ subItem.menu }}</span>
            </v-tooltip>
            </v-list-tile-title>  
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon>{{ subItem.icono }}</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list-group>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
  export default {
    computed: {
      ...mapGetters(['get_acceso']),
      datosUsuario() {
        return this.get_acceso
      }
    }

  }
</script>