<template>
  <div>
    <v-tabs color="blue-grey lighten-5" slider-color="red" height="35">
      <v-tab
        v-for="(tab,index) in subTab"
        :key="index"
        :to="tab.ruta"
      >
        {{ tab.menu }}
      </v-tab>
    </v-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'tab-esclavo',
  computed: {
    ...mapGetters({
     getTabs: 'get_tabs'
    }),
    subTab() {
      let subtab = this.getTabs
      return subtab[0].menus_hijos
    },
    
  },
}
</script>