<template>
  <v-container>
    <v-row>
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

    <v-row no-gutters>
      <v-col sm="4" class="pa-3" v-for="dessert in paginatedDesserts" :key="dessert._id">
        <v-card class="pa-1" height="420" :to="{ name: 'dessert', params: { id: dessert._id } }">
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
    <v-row>
  <v-col>
    <v-pagination v-model="currentPage" :length="Math.ceil(filteredDesserts.length / dessertsPerPage)"></v-pagination>
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
      searchTerm: '',
      selectedCategory: null,
      dessertsPerPage: 6,
      currentPage: 1,
    };
  },
  async created() {
    this.desserts = await API.getAllDessert();
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
    clearCategory() {
      this.selectedCategory = null;
    },
    selectCategory(category) {
      this.selectedCategory = category;
    },
  },
};
</script>
