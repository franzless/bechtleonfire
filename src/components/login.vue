<template>
    <div>
        <v-img :src="bild">
        <v-container fluid fill-height>
        <v-layout justify-center align-center>
        <v-flex xs12 sm9 md7 lg5>
        <v-card class="elevation-12">
            <v-toolbar color="primary">
                <v-icon>fas fa-sign-in-alt</v-icon>
                <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-actions>
                <v-layout row justify-center wrap>
                    <v-flex xs11 sm9>
                        <v-text-field type="text" prepend-icon="person" label="Email" v-model="email"></v-text-field>
                    </v-flex>
                    <v-flex xs11 sm9>
                        <v-text-field type="password" prepend-icon="lock" label="Password" v-model="passwort"></v-text-field>
                    </v-flex>
                </v-layout>                
            </v-card-actions>
                    <v-card-actions>                          
                        <v-btn color="primary" @click="signin">Ok</v-btn>               
                        
            </v-card-actions>
            <v-card-text>
                <v-alert dismissible type="error" v-model="err.status">{{err.Code}}: {{err.Message}}</v-alert>
            </v-card-text>
                  
        </v-card>
        </v-flex>
        </v-layout>
        </v-container>
        </v-img>
    </div>
</template>
<script>
import firebase from 'firebase'
export default {
    data(){
        return{
            email:'',
            passwort:'',
            err:{Message:'Fehler',status:false,Code:''},
            bild:require("@/assets/LoginBack.jpg")           
        }
    },
    methods:{
        signin(){
            firebase.auth().signInWithEmailAndPassword(this.email, this.passwort).then(r=>{
                this.$store.commit('addUser',r.user)              
                this.$router.push('/')
                    }).catch(error => {                        
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        this.err = {Message:errorMessage,Code:errorCode,status:true}                        
                    })}
    }
}
</script>