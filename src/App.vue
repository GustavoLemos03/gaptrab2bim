<template>
  <v-app id="inspire">

   
    <router-view />
    <v-app-bar class="px-3" color="white" flat density="compact">
      

      <v-spacer></v-spacer>

      <v-tabs centered color="grey-darken-2">
        <v-tab to="/"> <router-link to="/">Home</router-link> </v-tab>

        <v-tab to="/frutas"> <router-link to="/frutas">Estoque de Frutas</router-link>

        </v-tab>
        <v-tab to="/cadastro"> <router-link to="/cadastro">Clientes</router-link>

        </v-tab>
        <v-tab to="/encomendas"> <router-link to="/encomendas">Encomendas</router-link>

        </v-tab>
      </v-tabs>
      <v-spacer></v-spacer>

     
    </v-app-bar>



  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',

  components: {
    //HelloWorld,
  },

  data: () => ({
    
  }),
}
</script>
<style>

</style>
