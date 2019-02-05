<template>
    <div class="py-3">
        <v-layout justify-center>
        <v-card width="80%" >
        <v-data-table
        :headers="headers"
        :items="daten"
        class="elevation-1"
        expand
        item-key="id">
            <template slot="items" slot-scope="props">
                <tr style="cursor:pointer" :class="tdcolor(props.item)" @click="filter(props.item.id), props.expanded=!props.expanded">
                <td>{{ props.item.Datum }}</td>
                <td>{{ props.item.Beginn }}</td>
                <td>{{ props.item.Ende }}</td>
                <td>{{ props.item.Pause }}</td>
                <td>{{ props.item.Team }}</td>
                
                <td >{{ props.item.Actions }} <v-btn class="mr-1" small icon ><v-icon color="primary">edit</v-icon></v-btn>
                <v-btn @click="del(props.item)" small icon ><v-icon color="pink">delete</v-icon></v-btn> </td>
                </tr>
            </template>
            <template slot="expand" slot-scope="props">
                <v-card>
                    <v-data-table
                    :items="filtered[0].daten"
                    :headers="ExpHeaders"
                    
                    hide-actions>
                        <template slot="items" slot-scope="props">
                            <tr  :class="tdcolor(props.item)">
                            <td>{{ props.item.Beginn }}</td>
                            <td>{{ props.item.Ende }}</td>
                            <td>{{ props.item.Pause }}</td>
                            <td>{{ props.item.Team }}</td>
                            <td>{{ props.item.Serviceleistung }}</td>
                            <td>{{ props.item.Leistungsschein }}</td>
                            </tr>
                        </template>
                    </v-data-table>
                </v-card>
            </template>

        </v-data-table>
       </v-card>
       </v-layout> 
    </div>
</template>
<script>
import {db} from '../main'
export default {
    data(){
        return{
            headers:[{text:'Datum',value:'Datum'},{text:'Arbeitsbeginn',value:'Beginn'},{text:'Arbeitsende',value:'Ende'},{text:'Pause',value:'Pause'},{text:'Kunde',value:'Team'},{text:'Actions',value:'Actions'}],
            daten:[],
            ExpHeaders:[],
            filtered:[]

        }
    },    
         
    firestore(){
            return{
                daten: db.collection('tkn').doc('marcel.brodbeck@bechtle.com').collection('data')    
                }
            },
    
    methods:{
        filter(key){
           this.ExpHeaders = []
           this.filtered = this.daten.filter(f=>f.id==key)
           var checkTeam = []
           checkTeam = this.filtered[0].daten.filter(x=>x.Team === 'Kärcher')
           if(checkTeam.length>0){
               this.ExpHeaders = [{text:'Arbeitsbeginn',value:'Beginn'},{text:'Arbeitsende',value:'Ende'},{text:'Pause',value:'Pause'},{text:'Kunde',value:'Team'},{text:'Leistungsschein',value:'leistungsschein'},{text:'Serviceleistung',value:'serviceleistung'}]
           }else{
               this.ExpHeaders = [{text:'Arbeitsbeginn',value:'Beginn'},{text:'Arbeitsende',value:'Ende'},{text:'Pause',value:'Pause'},{text:'Kunde',value:'Team'}]
           } 

        },
        del(i){            
            db.collection('tkn').doc('marcel.brodbeck@bechtle.com').collection('data').doc(i.id).delete()
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
        
       
    }
}
</script>