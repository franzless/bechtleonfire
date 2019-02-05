<template>
<div>
  <v-container grid-list-md>
    <v-layout
       justify-center row  wrap
      
    >
     
      <v-flex xs12 md4 sm6 >
         <v-hover style="cursor:pointer">
          <v-card @click="dialog=true" height="600"
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2}`">
        
            <v-card-text class="text-xs-center">
              Neuen Zeitnachweiß erstellen</v-card-text>
          </v-card>   
         </v-hover> 
      </v-flex>

      <v-flex xs12 md4 sm6>
         <v-hover style="cursor:pointer">
          <v-card height="600"
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2}`"
          @click="route"
          >                
            <v-card-text class="text-xs-center">              
              Alle Einträge ansehen
              </v-card-text>
          </v-card>   
         </v-hover>

      </v-flex><v-flex xs12 md4 sm6>
         <v-hover style="cursor:pointer">
          <v-card height="600"
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2}`">
        
            <v-card-text class="text-xs-center">
              Einstellungen</v-card-text>
          </v-card>   
         </v-hover> 
      </v-flex>
      
    </v-layout>
    <v-dialog width="700" v-model="dialog" persistent>
      <stepper></stepper>
  </v-dialog>
  </v-container>
  <v-snackbar v-model="snack.status"
  :color="snack.color"
  
  >
    {{snack.text}}

    <v-btn flat color="primary" @click.native="snack.status = false">Close</v-btn>
  </v-snackbar>
  </div>
</template>

<script>

export default {
  
  data: () => ({
               
    
  }),
  computed:{
    snack(){
      return this.$store.getters.snack
      },
    dialog:{
      set(d){
        this.$store.commit('dStepper',d) 
      },
      get(){
        return this.$store.getters.Stepper
      }      
      
      }
    
  },
  methods:{
    route(){
      this.$router.push('daten')
    },
   
  }
};
</script>

<style>
</style>
