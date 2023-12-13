<template>
   <v-app>
     <v-main>
       <v-container fluid fill-height>
         <v-layout align-center justify-center>
           <v-flex xs12 sm8 md4>
             <v-card class="elevation-12">
               <v-toolbar dark color="primary">
                 <v-toolbar-title>แบบฟอร์มเข้าระบบ</v-toolbar-title>
               </v-toolbar>
               <v-card-text>
                 <v-form @submit.prevent="login">
                   <v-text-field
                     v-model="username"
                     label="ชื่อผู้ใช้"
                     type="text"
                     placeholder="ชื่อผู้ใช้"
                     required
                   ></v-text-field>
 
                   <v-text-field
                     v-model="password"
                     label="รหัสผ่าน"
                     type="password"
                     placeholder="รหัสผ่าน"
                     required
                   ></v-text-field>
                   <v-btn type="submit" class="mt-4" color="primary">เข้าสู่ระบบ</v-btn>
                 </v-form>
               </v-card-text>
             </v-card>
           </v-flex>
         </v-layout>
       </v-container>
     </v-main>
   </v-app>
 </template>
 
 <script>
 import router from "@/router";
 
 export default {
   name: "Login",
   data() {
     return {
       username: "",
       password: "",
     };
   },
   methods: {
     login() {
       const { username } = this;
       alert(`${username} ได้เข้าสู่ระบบ`);
       router.push("/admin");
     },
   },
 };
 </script>
 