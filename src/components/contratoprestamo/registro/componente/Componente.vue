<template>
  <div>
    <v-toolbar color="blue darken-3" height="27">
    </v-toolbar>
    <v-layout row>
      <v-flex xs12 sm12 md12>
        <v-card>
          <v-card-actions class="pb-0">
            <v-flex xs10 sm9 md9>
              <div class=" font-weight-bold">
              <v-icon color="blue darken-3">label</v-icon>
              Componentes
              <v-icon v-if="getPrestamo.vigente==1" dark class="ml-2" color="green" @click="newComponente(null)">add_circle</v-icon>
              </div>
            </v-flex>
          </v-card-actions>
          <v-slide-y-transition>
            <v-card-text v-show="show" class="pt-0">
              <v-layout row wrap class="ml-4" v-for="componente in getPrestamo.componentes" :key="componente.id">
                <v-flex xs10 sm9 md9>
                  <v-icon color="blue darken-3">label_important</v-icon>
                  {{ componente.componente }}
                  <v-icon v-if="getPrestamo.vigente==1" color="green" @click="newComponente(componente.id)">add_circle</v-icon>
                  <v-icon v-if="componente.hijo_componentes.length==0" color="red" @click="deleteComponente(componente)">remove_circle</v-icon>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-layout row wrap v-for="subcomponente in componente.hijo_componentes" :key="subcomponente.id">
                  <v-flex xs10 sm9 md9>
                    <span class="ml-4">{{ subcomponente.componente }}</span>
                    <v-icon v-if="getPrestamo.vigente==1" color="red" @click="deleteComponente(subcomponente)">remove_circle</v-icon>
                  </v-flex>    
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog_nuevo" max-width="500px">
      <v-system-bar status color="blue darken-3" dark>
        <v-icon>create</v-icon>
        Nuevo Componente
        <v-spacer></v-spacer>
        <v-icon @click="dialog_nuevo=false">clear</v-icon>
      </v-system-bar>
      <v-card>
        <v-card-text>
          <v-text-field
            v-model.trim="componente"
            label="Componente"
            required
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn small color="primary" flat @click="submitComponente()">
            <v-icon dark class="mr-1">save</v-icon> Grabar
         </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>	
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data: () => ({
    show: true,
    dialog_nuevo: false,
    componente: 'COMPONENTE',
    componente_id: null
  }),
  computed: {
    ...mapGetters({
      getPrestamo: 'get_prestamo'
    }),
  },
  methods: {
    ...mapActions({
      saveComponente: 'saveComponente',
      eliminarComponente: 'eliminarComponente',
      fetchPrestamo: 'fetchPrestamo',
      fetchPrestamos: 'fetchPrestamos'
    }),
    newComponente(id){
      this.dialog_nuevo = true
      this.componente_id = id
    },
    submitComponente(){
      var dato = {componente_id: this.componente_id, componente: this.componente, contrato_prestamo_id: this.getPrestamo.id};
      this.saveComponente(dato).then(() => {
        this.fetchPrestamo(this.getPrestamo.id)
        this.fetchPrestamos()
        this.componente = 'COMPONENTE'
        this.dialog_nuevo = false
        this.$notificacion.success('Datos Guardados correctamente')
      })
      .catch(() => {
        this.$notificacion.error('Ocurrio un error al guardar los datos.')
      })
    },
    deleteComponente(componente){
      this.$confirmar('Desea eliminar el Componente "'+ componente.componente +'"?.')
        .then(res => {
          if(res){
            this.eliminarComponente(componente.id).
            then(() => {
              this.fetchPrestamos()
              this.fetchPrestamo(this.getPrestamo.id)
              this.$notificacion.success('Datos eliminados correctamente')
            })
          }
        })
        .catch(() => {
          this.$notificacion.error('Ocurrio un error al eliminar el registro.')
        }) 
    }
  }
}
</script>