<template>
  <div>
    <tab-maestro></tab-maestro>
    <router-view></router-view>
  </div>
</template>

<script>
  import TabMaestro from "@/components/menus/TabMaestro"
  export default {
    components: {
      TabMaestro
    },
    mounted() {
      this.$router.push('/convenio/registro')
    }
  }
</script>