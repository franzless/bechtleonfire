<template>
<div>
    
  <v-stepper v-model="stufe">
      <v-stepper-header vertical>
      <v-stepper-step :complete="stufe > 1" step="1">Team auswählen</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="stufe > 2" step="2">Informationen erfassen</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
            <v-stepper-content step="1">
                <v-card color="green lighten-4">
                    <v-card-text >                        
                           
                                 <v-select class="mx-5" v-model="team" :items="teams" label="Team auswählen"></v-select>
                            
                                 <v-btn @click="stufe=2" color="success">Weiter</v-btn>
                                 <v-btn @click="abbrechen" color="error">Abbrechen</v-btn>
                            
                                    
                        
                    </v-card-text>
                </v-card>

            </v-stepper-content>
            <v-stepper-content step="2">
                <v-card color="green lighten-4" class="px-3" >
                    <v-content grid-list-xs v-if="team==='Kärcher'">
                         <v-layout justify-center row wrap>
                                <v-flex xs12 sm6 lg4>
                                    <v-menu
                                        full-width
                                        transition="scale-transition">
                                    <v-text-field
                                    
                                    slot="activator"
                                    v-model="formattedDate"
                                    prepend-icon="event"
                                    label="Datum"
                                    readonly></v-text-field>
                                    <v-date-picker locale="de-de" v-model="datum"></v-date-picker>
                                    </v-menu>
                                </v-flex>
                                <v-flex xs12 sm6 lg4>
                                    <v-menu
                                    full-width
                                    transition="scale-transition"
                                    :close-on-content-click="false">
                                    <v-text-field
                                    readonly
                                    slot="activator"
                                    v-model="beginn"
                                    prepend-icon="access_time"
                                    label="Arbeitsbeginn"></v-text-field>
                                    <v-time-picker format="24hr" v-model="beginn"></v-time-picker>
                                    </v-menu>
                                </v-flex>
                                <v-flex xs12 sm6 lg4>
                                    <v-menu
                                    full-width
                                    transition="scale-transition"
                                    :close-on-content-click="false">
                                    <v-text-field
                                    readonly
                                    slot="activator"
                                    v-model="ende"
                                    prepend-icon="access_time"
                                    label="ArbeitsEnde"></v-text-field>
                                    <v-time-picker format="24hr" v-model="ende"></v-time-picker>
                                    </v-menu>
                                </v-flex>
                                <v-flex xs12 sm6 lg4>                                
                                    <v-text-field mask="##" prepend-icon="event_seat" v-model="pause" label="Pause in min"></v-text-field>
                                </v-flex>
                                 <v-flex xs12 sm6 lg4>                                
                                    <v-select :items="Leistungsscheine" prepend-icon="book" v-model="leistungsschein" label="Leistungsschein"></v-select>
                                </v-flex>
                                <v-flex xs12 sm6 lg4>                                
                                    <v-select :items="Serviceleistungen" prepend-icon="portrait" v-model="serviceleistung" label="Serviceleistung"></v-select>
                                </v-flex>


                            </v-layout>

                    </v-content>
                          <v-content grid-list-xs v-else>
                            <v-layout justify-center row wrap>
                                <v-flex xs12 sm6 lg4>
                                    <v-menu
                                    full-width
                                    transition="scale-transition">
                                    <v-text-field
                                    
                                    slot="activator"
                                    v-model="formattedDate"
                                    prepend-icon="event"
                                    label="Datum"
                                    readonly></v-text-field>
                                    <v-date-picker locale="de-de" v-model="datum"></v-date-picker>
                                    </v-menu>
                                </v-flex>
                                <v-flex xs12 sm6 lg4>
                                    <v-menu
                                    full-width
                                    transition="scale-transition"
                                    :close-on-content-click="false">
                                    <v-text-field
                                    readonly
                                    slot="activator"
                                    v-model="beginn"
                                    prepend-icon="access_time"
                                    label="Arbeitsbeginn"></v-text-field>
                                    <v-time-picker format="24hr" v-model="beginn"></v-time-picker>
                                    </v-menu>
                                </v-flex>
                                <v-flex xs12 sm6 lg4>
                                    <v-menu
                                    full-width
                                    transition="scale-transition"
                                    :close-on-content-click="false">
                                    <v-text-field
                                    readonly
                                    slot="activator"
                                    v-model="ende"
                                    prepend-icon="access_time"
                                    label="ArbeitsEnde"></v-text-field>
                                    <v-time-picker format="24hr" v-model="ende"></v-time-picker>
                                    </v-menu>
                                </v-flex>
                                <v-flex xs12 sm6 lg4>                                
                                    <v-text-field mask="##" prepend-icon="event_seat" v-model="pause" label="Pause in min"></v-text-field>
                                </v-flex>
                                


                            </v-layout>
                        </v-content>
                        <v-divider ></v-divider>
                        <div class="mt-3">                  
                
            <v-btn @click="addToFirestore()" color="success">Senden</v-btn>
            <v-btn @click="abbrechen" color="error">Abbrechen</v-btn>
            <v-btn @click="stufe=1" color="yellow">Zurück</v-btn> 
            </div>    
            </v-card>
            </v-stepper-content>
        </v-stepper-items>
  </v-stepper>
  
  
        
</div>    
</template>
<script>
import {db} from '../main'
export default {
      data() {
    return {
      stats:[],
      stufe: 0,
      teams: ["Kärcher", "AMG", "MHP", "Heller"],
      team: "",
      datum: "",
      beginn: "",
      ende: "",
      pause: "",
      snack:{status:false},
      leistungsschein:"",
      serviceleistung:"",
      
      Leistungsscheine: [
        'LS01-AK-Beschaffung',
        'LS02-AK-Lager & Logistik, Installation',
        'LS03-AK Rollout',
        'LS04-AK-Incident & VPN Token',
        'LS05-AK MAC OS X',
        'LS06-AK-Mobile Devices & Asset MGMT.',
        'LS07-AK-Produktion',
        'LS08-AK-Ersatzteile & Reperaturen',
        'LS09-AK-Sonderaufträge',
        'LS10-AK-Produktion & Testing'],
      Serviceleistungen: [
        'Service Techniker',
        'Service Techniker ""B""',
        'System Engineer',
        'Repräsentant / Projektleiter',
        'Senior Engineer / Consultant',
        'Auszubildende',
        'Praktikant',
        'DB Entwicklung'],
     
      
    }
  },
  mounted() {
    this.getdate();
  },
  computed:{
      formattedDate(){
          return this.formatDate(this.datum)
      },
      datetime(){
          return this.getdatetime(this.datum)
      },
       user(){
            return this.$store.getters.user
        }
  }  ,
  firestore(){
    return{
        stats: db.collection('tkn').doc(this.user.email).collection('data')    
    }
    }, 
  
  methods: {
    formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}.${month}.${year}`
      },
    getdatetime(d){
        const [year, month, day] = d.split('-')
        var date = new Date(`${year},${month},${day}`)
        return date.getTime()
      },
      
    getdate() {
      var today = new Date();
      var d = today.getDate();
      var m = today.getMonth() + 1;
      if(m<10){          
          m='0'+m
      } if(d<10){
         d= '0'+d       }
           
      var y = today.getFullYear();
      
      this.datum = y + "-" + m + "-" + d
      
    },
    abbrechen(){
      this.team=''
      this.$store.commit('dStepper',false)  
    },

    addToFirestore(){
        var newdaten = new Object
        if (this.team === 'Kärcher'){
                    newdaten = {Datum:this.formattedDate,Dtime:this.datetime,Team:this.team,Beginn:this.beginn,Ende:this.ende,Pause:this.pause,Leistungsschein:this.leistungsschein,Serviceleistung:this.serviceleistung}
                                          
                }else{
                    newdaten = {Datum:this.formattedDate,Dtime:this.datetime,Team:this.team,Beginn:this.beginn,Ende:this.ende,Pause:this.pause}
                                    }
              db.collection('tkn').doc(this.user.email).collection('data').add(newdaten).then(r=>{
            this.beginn=""
            this.ende=""
            this.pause=""
            this.team=""
            this.stufe=1            
            this.snack={status:true,text:'Daten erfolgreich übertragen',color:'success'}
            this.$store.commit('getsnack',this.snack)
        }).catch(f=>{
            this.snack={status:true,text:'Error: '+f,color:'error'}
            this.$store.commit('getsnack',this.snack)
        })         

       /*  var y= this.stats.filter(x=>x.Datum===this.formattedDate)
        console.log(y)
        if (y.length > 0){            
                if (this.team === 'Kärcher'){
                    newdaten = {Team:this.team,Beginn:this.beginn,Ende:this.ende,Pause:this.pause,Leistungsschein:this.leistungsschein,Serviceleistung:this.serviceleistung}
                    y[0].daten.push(newdaten)
                      
                }else{
                    newdaten = {Team:this.team,Beginn:this.beginn,Ende:this.ende,Pause:this.pause}
                    y[0].daten.push(newdaten) 
                }
              db.collection('tkn').doc('marcel.brodbeck@bechtle.com').collection('data').doc(y[0].id).set(y[0]).then(r=>{
            this.beginn=""
            this.ende=""
            this.pause=""
            this.team=""
            this.stufe=1            
            this.snack={status:true,text:'Daten erfolgreich übertragen',color:'success'}
            this.$store.commit('getsnack',this.snack)
        }).catch(f=>{
            this.snack={status:true,text:'Error: '+f,color:'error'}
            this.$store.commit('getsnack',this.snack)
        })         
             }else{
                 if (this.team === 'Kärcher'){
                    newdaten = {Datum:this.formattedDate,daten:[{Team:this.team,Beginn:this.beginn,Ende:this.ende,Pause:this.pause,Leistungsschein:this.leistungsschein,Serviceleistung:this.serviceleistung}]}   
                }else{
                    newdaten = {Datum:this.formattedDate,daten:[{Team:this.team,Beginn:this.beginn,Ende:this.ende,Pause:this.pause}]} 
                }
                db.collection('tkn').doc('marcel.brodbeck@bechtle.com').collection('data').add(newdaten).then(r=>{
                    this.beginn=""
                    this.ende=""
                    this.pause=""
                    this.team=""
                    this.stufe=1            
                    this.snack={status:true,text:'Daten erfolgreich übertragen',color:'success'}
                    this.$store.commit('getsnack',this.snack)
                }).catch(f=>{
                    this.snack={status:true,text:'Error: '+f,color:'error'}
                    this.$store.commit('getsnack',this.snack)
                })         */
            

        }
        
        
       
        
        

    
  }
};
</script>
