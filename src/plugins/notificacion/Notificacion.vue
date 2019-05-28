<template>
  <v-snackbar
      :timeout="timeout"
      :color="color"
      :auto-height = "autoHeight"
      :multi-line = "multiLine"
      :vertical = "vertical"
      v-model="active"
  >
    {{ message }}
    <v-btn
        dark
        flat
        @click="dismiss"
      >
      Cerrar
    </v-btn>
  </v-snackbar>
</template>

<script>
  export default {
    props: {
      color: {
        type: String,
        default: 'info'
      },
      message: {
        type: String
      },
      timeout: {
        type: Number,
        default: 3000
      },
      dismissable: {
        type: Boolean,
        default: true
      },
      autoHeight: {
        type: Boolean,
        default: false
      },
      multiLine: {
        type: Boolean,
        default: false
      },
      vertical: {
        type: Boolean,
        default: false
      }
    },
    data: () => ({
      active: false
    }),
    mounted() {
      this.$nextTick(() => this.show())
    },
    methods: {
      show() {
        this.active = true
      },
      close() {
        this.active = false
      },
      dismiss() {
        if (this.dismissable) {
          this.close()
        }
      }
    }
  }
</script>