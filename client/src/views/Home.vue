<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm="4" class="pa-3" v-for="dessert in desserts" :key="dessert._id">
        <v-card class="pa-1" :to="{name: 'dessert', params: { id: dessert._id}}">
          <v-img height="250" :src="`/${dessert.image}`"></v-img>
            <v-btn class="ml-4 mt-3" small outlined color="indigo">
              {{  dessert.dessertzone }}
            </v-btn>
          <v-card-title class="headline">
            {{ dessert.name }}
          </v-card-title>
          <v-card-text class="py-0">
            <p>{{ dessert.detail.substring(0,80) + "..." }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import API from '../api';

export default {
    name: "home",
    data() {
      return {
        desserts: [],
      };
    },
    async created() {
      this.desserts = await API.getAllDessert();
    }
  }
</script>
