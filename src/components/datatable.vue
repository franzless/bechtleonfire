<template>
    <div class="py-3">
        <v-dialog width="700" v-model="stepper" persistent>
      <stepper></stepper>
        </v-dialog>
        
        <v-layout justify-center>
        <v-card width="80%" >
            
             <v-expansion-panel color="primary" dark >
         <v-expansion-panel-content>
            <div slot="header">Filter</div>
              <v-card>
              
                  <v-container grid-list-md>
                  <v-layout row wrap justify-center>
                      <v-flex xs12 sm6 lg5>
                            <v-menu full-width
                            transition="scale-transition"
                            v-model="menufilter1"
                            max-width="400px"
                            min-width="200px"
                            >
                                <v-text-field v-model="filterdatum1" prepend-icon="access_time" readonly label="Unteres Datum" slot="activator"></v-text-field>
                                <v-date-picker full-width locale="de" v-model="filterdatum1"></v-date-picker>
                            </v-menu>
                      </v-flex>
                       <v-flex xs12 sm6 lg5>
                            <v-menu full-width
                            v-model="menufilter2"
                            transition="scale-transition"
                            max-width="400px"
                            min-width="200px"
                            >
                                <v-text-field v-model="filterdatum2" prepend-icon="access_time" readonly label="Oberes Datum" slot="activator"></v-text-field>
                                <v-date-picker full-width locale="de" v-model="filterdatum2"></v-date-picker>
                            </v-menu>
                      </v-flex>
                       <v-flex xs12 sm6 lg5>
                           <v-btn @click="filter" round color="primary">filtern</v-btn>
                           <v-btn @click="data = storedata" round color="red">Filter löschen</v-btn>
                          
                      </v-flex>
                  </v-layout>
                </v-container>           
                
               
               </v-card>
        </v-expansion-panel-content>
         </v-expansion-panel>            
        <v-toolbar color="primary">
            <v-icon>fas fa-user-secret</v-icon>
            <v-toolbar-title>Mein Zeitnachweiß</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
            <v-btn slot="activator" icon @click="exportData()"><v-icon>fas fa-file-excel</v-icon></v-btn>
            <span>Daten in Excel Datei exportieren</span>
            </v-tooltip>
            <v-tooltip bottom>
            <v-btn slot="activator" icon @click="stepper=true"><v-icon>fas fa-plus-circle</v-icon></v-btn>
            <span>Dialog öffnen um neuen Eintrag zu erstellen</span>
            </v-tooltip>
            </v-toolbar>    
        <v-data-table
        :headers="headers"
        :items="data"
        class="elevation-1"
        v-bind:pagination.sync="pagination"
        >
            <template slot="items" slot-scope="props">
                <tr  :class="tdcolor(props.item)">
                <td>{{ props.item.Datum }}</td>
                <td>{{ props.item.Beginn}}</td>
                <td>{{ props.item.Ende }}</td>
                <td>{{ props.item.Pause }}</td>
                <td>{{ props.item.Team }}</td>
                
                <td >{{ props.item.Actions }} <v-btn @click="edi(props.item)" class="mr-1" small icon ><v-icon color="primary">edit</v-icon></v-btn>
                <v-btn @click="del(props.item)" small icon ><v-icon color="pink">delete</v-icon></v-btn> </td>
                </tr>
            </template>
            
        </v-data-table>       
       </v-card>
       </v-layout>
       <v-dialog v-model="dialog" width="50%" persistent>
          
               <v-card v-if="e">
                    <v-toolbar color="primary"><v-toolbar-title>Edit</v-toolbar-title></v-toolbar>
               <v-container grid-list-xl>
                            <v-layout justify-center row wrap>
                                <v-flex xs12 sm6 lg4>
                                    <v-menu full-width transition="scale-transition">
                                    <v-text-field                                    
                                    slot="activator"
                                    v-model="e.Datum"
                                    prepend-icon="event"
                                    label="Datum"
                                    readonly></v-text-field>
                                    <v-date-picker locale="de-de" @input="formatDate" v-model="e.Datum"></v-date-picker>
                                    </v-menu>
                                </v-flex>
                                <v-flex xs12 sm6 lg4>
                                    <v-menu
                                    full-width
                                    :close-on-content-click="false"
                                    transition="scale-transition">
                                    <v-text-field
                                    readonly
                                    slot="activator"
                                    v-model="e.Beginn"
                                    prepend-icon="access_time"
                                    label="Arbeitsbeginn"></v-text-field>
                                    <v-time-picker format="24hr" v-model="e.Beginn"></v-time-picker>
                                    </v-menu>
                                </v-flex>
                                <v-flex xs12 sm6 lg4>
                                    <v-menu
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    full-width>
                                    <v-text-field
                                    readonly
                                    slot="activator"
                                    v-model="e.Ende"
                                    prepend-icon="access_time"
                                    label="ArbeitsEnde"></v-text-field>
                                    <v-time-picker format="24hr" v-model="e.Ende"></v-time-picker>
                                    </v-menu>
                                </v-flex>
                                <v-flex xs12 sm6 lg4>                                
                                    <v-text-field mask="##" prepend-icon="event_seat" v-model="e.Pause" label="Pause in min"></v-text-field>
                                </v-flex>
                                
                            </v-layout>                            
                        </v-container>
                        
                                <v-btn @click="submit" color="success"><v-icon>save</v-icon></v-btn>
                                <v-btn color="error" @click="canceledit"><v-icon>pan_tool</v-icon></v-btn>
                        
           </v-card>
           </v-dialog>
           <v-snackbar v-model="snack.status"
                    :color="snack.color">
                    {{snack.text}}
             <v-btn flat color="primary" @click.native="snack.status = false">Close</v-btn>
            </v-snackbar> 
    </div>
</template>
<script>
import {db} from '../main'
import {json2excel, excel2json} from 'js2excel'
export default {
    data(){
        return{
            headers:[{text:'Datum',value:'Dtime'},{text:'Arbeitsbeginn',value:'Beginn',sortable:false},{text:'Arbeitsende',value:'Ende',sortable:false},{text:'Pause',value:'Pause',sortable:false},{text:'Kunde',value:'Team'},{text:'Actions',value:'Actions',sortable:false}],
            data:[],
            e:[],
            dialog:false,
            menufilter1:false,
            menufilter2:false,
            filterdatum1:'',
            filterdatum2:'',
            storedata:[],
            snack:{status:false},
            pagination : {sortBy: 'Dtime', descending: true}
            
        }
    },
    computed:{
        convertdatum1(){
            
            var [year,month, day] = this.filterdatum1.split('-')
            var date= new Date(`${year},${month},${day}`)            
            return date.getTime()  
        },
        convertdatum2(){
            var [year,month, day] = this.filterdatum2.split('-')
            var date= new Date(`${year},${month},${day}`)            
            return date.getTime()
        },
        stepper:{
            set(d){
                this.$store.commit('dStepper',d) 
            },
            get(){
                return this.$store.getters.Stepper
            }      
        },
        user(){
            return this.$store.getters.user
        }},   
             
    firestore(){
            return{
                data: db.collection('tkn').doc('marcel.brodbeck@bechtle.com').collection('data')   
                }
            }, 
        
    methods:{
        
        filter(){
        this.storedata = []    
        var filtered = this.data.map(d=>{
            var [day, month, year] = d.Datum.split('.')
            var date= new Date(`${year},${month},${day}`)            
            var gt = date.getTime()            
            if(gt > this.convertdatum2 || gt < this.convertdatum1){                
                return null               
            }else{            
                return d
            }
        }).filter(f=> f != null)
        this.storedata = this.data
        this.data = filtered    
        },
              
        del(i){            
            db.collection('tkn').doc('marcel.brodbeck@bechtle.com').collection('data').doc(i.id).delete()
        },
        edi(i){
            this.e = []
            this.e = i
            this.dialog=true
                        
        },
        tdcolor(c){
            if (c.Team=='AMG'){
                return 'grey lighten-1'
            }
            else if(c.Team=='Kärcher'){
                return 'yellow'
            }
            else if(c.Team=='MHP'){
                return 'blue lighten-3'
            }
            else if(c.Team=='Heller'){
                return 'blue darken-3'
            }
        },
        submit(){
            db.collection('tkn').doc('marcel.brodbeck@bechtle.com').collection('data').doc(this.e.id).set(this.e).then(r=>{
                this.snack={status:true,text:'Daten erfolgreich geändert',color:'success'}
                this.dialog = false
            }).catch(f=>{
                this.snack={status:true,text:'Fehler :'+f,color:'error' }
            })
            
        },
        canceledit(){
            this.data = db.collection('tkn').doc('marcel.brodbeck@bechtle.com').collection('data') 
            this.dialog=false
        },
        exportData(){
            
             let data = this.data
                    try {
            json2excel({
                data,
                name: 'user-info-data',
                formateDate: 'dd.mm.yyyy'
            });
        } catch (e) {
            console.error('export error');
        } 
                },
        formatDate(){
        
        const [year, month, day] = this.e.Datum.split('-')
        this.e.Datum = `${day}.${month}.${year}`    
        }
        
       
    }
   
    
}
</script>