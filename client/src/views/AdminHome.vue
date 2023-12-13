<template>
  <v-container>
    <v-row>
      <v-card-text>
        <v-btn type="submit" class="mt-3" color="primary" @click="onCreate">เพิ่มขนม</v-btn>
      </v-card-text>
      <v-col cols="12" md="6" class="mb-4">
        <v-text-field v-model="searchTerm" label="ค้นหา" placeholder="ค้นหาโดยใช้ชื่อ" clearable></v-text-field>
      </v-col>
      <v-col cols="12" md="6" class="mb-4">
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-filter</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="category in categories" :key="category">
          <v-list-item-content @click="selectCategory(category)">
            <v-list-item-title>{{ category }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="selectedCategory">
          <v-list-item-content @click="clearCategory">
            <v-list-item-title>ไม่เลือกหมวดมู่</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
    <span v-if="selectedCategory" class="ml-2">
      หมวดหมู่: {{ selectedCategory }}
    </span>
  </v-col>
    </v-row>

    <v-alert border="left" close-text="Close Alert" color="green accent-4" dark dismissible
      v-if="this.$route.params.message" :value="alert">
      {{ this.$route.params.message }}</v-alert>

    <v-row no-gutters>
      <v-col sm="4" class="pa-3" v-for="dessert in paginatedDesserts" :key="dessert._id">
        <v-card class="pa-1" height="420" :to="{ name: 'admindessert', params: { id: dessert._id } }">
          <v-img height="250" :src="`/${dessert.image}`"></v-img>
          <v-btn class="ml-4 mt-3" small outlined color="indigo">
            {{ dessert.dessertzone }}
          </v-btn>
          <v-card-title class="headline">
            {{ dessert.thainame }}
          </v-card-title>
          <v-card-text class="py-0">
            <p>{{ dessert.detail.substring(0, 80) + "..." }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-col sm="4" class="pa-3" v-for="dessert in paginatedDesserts" :key="dessert._id">
</v-col>

  </v-container>
</template>

<script>
import API from '../api';

export default {
  name: "home",
  data() {
    return {
      desserts: [],
      alert: true,
      searchTerm: '',
      selectedCategory: null,
      dessertsPerPage: 6,
      currentPage: 1,
    };
  },
  async created() {
    this.desserts = await API.getAllDessert();
    setTimeout(() => {
      this.alert = false;
    }, 3000);
  },
  computed: {
    filteredDesserts() {
      return this.desserts.filter(dessert =>
        (dessert.thainame.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
        (!this.selectedCategory || dessert.dessertzone === this.selectedCategory))
      );
    },
    paginatedDesserts() {
    const startIndex = (this.currentPage - 1) * this.dessertsPerPage;
    const endIndex = startIndex + this.dessertsPerPage;
    return this.filteredDesserts.slice(startIndex, endIndex);
    },
    categories() {
      return [...new Set(this.desserts.map(dessert => dessert.dessertzone))];
    },
  },
  methods: {
    onCreate() {
      this.$router.push({ name: "create-dessert" });
    },
    selectCategory(category) {
      this.selectedCategory = category;
    },
    clearCategory() {
      this.selectedCategory = null;
    },
  },
};
</script>