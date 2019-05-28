<template>
  <v-layout row justify-center>
    <v-dialog @input="change" value="true" persistent :max-width="width">
      <v-toolbar v-if="!!title" dark :color="color" dense>
        <v-icon v-if="!!icon">{{ icon }}</v-icon>
        <v-toolbar-title class="white--text" v-text="title"/>
      </v-toolbar>
      <v-card tile>
        <v-card-text v-html="message"/>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :color="buttonTrueColor" flat @click="choose(true)">{{ buttonTrueText }}</v-btn>
          <v-btn :color="buttonFalseColor" flat @click="choose(false)">{{ buttonFalseText }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>


<script>

export default {
  props: {
    buttonTrueText: {
      type: String,
      default: 'Si'
    },
    buttonFalseText: {
      type: String,
      default: 'No'
    },
    buttonTrueColor: {
      type: String,
      default: 'primary'
    },
    buttonFalseColor: {
      type: String,
      default: 'red'
    },
    color: {
      type: String,
      default: 'light-blue darken-4'
    },
    icon: {
      type: String,
      default: 'error_outline'
    },
    message: {
      type: String
    },
    title: {
      type: String,
      default: 'Confirmar'
    },
    width: {
      type: Number,
      default: 350
    }
  },
  data () {
    return {
      value: false
    }
  },
  methods: {
    choose (value) {
      this.$emit('result', value)
      this.value = value
      this.$destroy()
    },

    change () {
      this.$destroy()
    }
  }
}
</script>
