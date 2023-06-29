<template>
    <v-container>
        <v-row no-gutters>
            <v-btn type="submit" class="mt-3" color="primary" @click="onCreate" >Create Dessert</v-btn>
            <v-col sm="4" class="pa-3" v-for="dessert in desserts" :key="dessert.id">
                <v-card class="pa-1" :to="{ name: 'dessert', params: { id: dessert.id } }">
                    <v-img height="250" :src="`/${dessert.image}`"></v-img>
                    <v-card-title class="headline">
                        {{ dessert.name }}
                    </v-card-title>
                    <v-card-text class="py-0">
                        <p>{{ dessert.detail }}</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script setup>
import router from '../router'

const onCreate = () => {
    router.push('/create-dessert')
}
</script>