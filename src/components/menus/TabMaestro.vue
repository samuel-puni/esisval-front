<template>
  <v-tabs color="blue-grey lighten-5" slider-color="red" height="35">
    <v-tab
      v-for="(tab,index) in get_tabs"
      :key="index"
      :to="tab.ruta"
    >
      {{ tab.menu }}
    </v-tab>
  </v-tabs>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: 'tab-maestro',
  computed: {
    ...mapGetters(['get_tabs']),
  },
}
</script>