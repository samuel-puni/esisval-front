<template>
  <v-layout row justify-center>
    <v-dialog
        v-model="value"
        content content-class="centered-dialog"
        persistent
        width="200"
      >
        <v-card
          color="primary"
          dark
        >
          <v-card-text>
            Espere por favor....
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
    export default {
        name: "Loading",
        data: function () {
            return {
              value: true
            }
        }
    }
</script>

<style>
  .dialog.centered-dialog {
    background: #282c2dad;
    box-shadow: none;
    border-radius: 6px;
    width: 250px;
    color: whitesmoke;
  }
</style>