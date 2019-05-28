import Vue from 'vue'
import Router from 'vue-router'

import Inicio from '@/components/Inicio'

import ContratoPrestamo from '@/components/contratoprestamo/ContratoPrestamo'
import Registro from '@/components/contratoprestamo/registro/Registro'
import Componente from '@/components/contratoprestamo/registro/componente/Componente'
import Financiera from '@/components/contratoprestamo/registro/financiera/Financiera'
import DatosGenerales from '@/components/contratoprestamo/registro/datosgenerales/DatosGenerales'

import Convenio from '@/components/convenio/Convenio'
import RegistroCon from '@/components/convenio/registro/Registro'
import ComponenteCon from '@/components/convenio/registro/componente/Componente'
import Desembolso from '@/components/convenio/registro/desembolso/Desembolso'
import DatosGeneralesCon from '@/components/convenio/registro/datosgenerales/DatosGenerales'

import Usuario from '@/components/usuario/Usuario'
import RegistroUsuario from '@/components/usuario/registro/Registro'
import DatosGeneralesUsu from '@/components/usuario/registro/datosgenerales/DatosGenerales'

Vue.use(Router)

import { store } from '@/store';

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: Inicio,
      meta: {
        privado: false,
        title: 'Seguimiento de Desembolsos',
        modulo: null
      }
    },
    {
      path: '/usuario',
      name: 'usuario',
      component: Usuario,
      meta: {
        privado: true,
        title: 'usuarios',
        modulo: 'SISEG_CLA',
        submodulo: 'SISEG_CLA_USER'
      },
      children: [
        {
          path: 'registro',
          name: 'registrousuario',
          component: RegistroUsuario,
          meta: {
            privado: true,
            title: 'Registro Usuario',
            modulo: 'SISEG_CLA',
            submodulo: 'SISEG_CLA_USER'
          },
          children: [
            {
              path: 'datosgenerales',
              name: 'datosgeneralesusu',
              component: DatosGeneralesUsu,
              meta: {
                privado: true,
                title: '',
                modulo: 'SISEG_REG',
                submodulo: 'SISEG_REG_USER'
              }
            }
          ]
        },
        ]
    },    
    {
      path: '/contratoprestamo',
      name: 'contratoprestamo',
      component: ContratoPrestamo,
      meta: {
        privado: true,
        title: 'Registro Contrato',
        modulo: 'SISEG_REG',
        submodulo: 'SISEG_REG_CON'
      },
      children: [
        { 
          path: 'registro',
          name: 'registro',
          component: Registro,
          meta: {
            privado: true,
            title: 'Registro de Contrato de Prestamo',    
            modulo: 'SISEG_REG',
            submodulo: 'SISEG_REG_CON'
          },
          children: [
            { 
              path: 'datosgenerales',
              name: 'datosgenerales',
              component: DatosGenerales,
              meta: {
                privado: true,
                title: '',    
                modulo: 'SISEG_REG',
                submodulo: 'SISEG_REG_CON'
              }
            },
            { 
              path: 'componente',
              name: 'componente',
              component: Componente,
              meta: {
                privado: true,
                title: '',    
                modulo: 'SISEG_REG',
                submodulo: 'SISEG_REG_CON'
              }
            },
            { 
              path: 'financiera',
              name: 'financiera',
              component: Financiera,
              meta: {
                privado: true,
                title: '',    
                modulo: 'SISEG_REG',
                submodulo: 'SISEG_REG_CON'
              }
            }
          ]    
        }
      ]
    },
    {
      path: '/convenio',
      name: 'convenio',
      component: Convenio,
      meta: {
        privado: true,
        title: 'CIF',
        modulo: 'SISEG_REG',
        submodulo: 'SISEG_REG_FIN'
      },
      children: [
        { 
          path: 'registro',
          name: 'registrocon',
          component: RegistroCon,
          meta: {
            privado: true,
            title: 'Registro de CIF',    
            modulo: 'SISEG_REG',
            submodulo: 'SISEG_REG_FIN'
          },
          children: [
            { 
              path: 'datosgenerales',
              name: 'datosgeneralescon',
              component: DatosGeneralesCon,
              meta: {
                privado: true,
                title: '',    
                modulo: 'SISEG_REG',
                submodulo: 'SISEG_REG_FIN'
              }
            },
            { 
              path: 'componente',
              name: 'componentecon',
              component: ComponenteCon,
              meta: {
                privado: true,
                title: '',    
                modulo: 'SISEG_REG',
                submodulo: 'SISEG_REG_FIN'
              }
            },
            { 
              path: 'desembolso',
              name: 'desembolso',
              component: Desembolso,
              meta: {
                privado: true,
                title: '',    
                modulo: 'SISEG_REG',
                submodulo: 'SISEG_REG_FIN'
              }
            }
          ]    
        }
      ]
    },
    
    /*{
      path: '*',
      component: NoEncontrado
    }*/
  ]
})


router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  
  if(to.meta.privado){
    if(!Vue.auth.isAuthenticated()){
      window.location.href = "/";
    }
    else{
      if(!store.state.login.isLogged){        
        store.commit('set_isLogged')
        next({name: 'inicio'})
      }
      store.dispatch('accesos').then(()=>{
        if(to.meta.modulo){
          store.commit('set_tabs',{
          modulo:to.meta.modulo,
          submodulo:to.meta.submodulo
          })  
        }
        else {
            store.commit('set_tabs',{
            modulo:null,
            submodulo:null
          })
        }  
      })
      next()
      
      
    }
  }
  else{
    next()
  }
}) 

export default router
