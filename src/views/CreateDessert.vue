<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="10" class="mx-auto">
        <v-card class="pa-5">
          <v-card-title>Create New Dessert</v-card-title>
          <v-divider></v-divider>
          <v-form ref="form" @submit.prevent="submitForm" class="pa-5" enctype="multipart/form-data">
            <v-text-field label="ID" v-model="id" prepend-icon="mdi-note" :rules="rules"></v-text-field>

            <v-text-field label="Name" v-model="name" prepend-icon="mdi-note" :rules="rules"></v-text-field>

            <v-text-field label="English Name" v-model="engname" prepend-icon="mdi-note" :rules="rules"></v-text-field>

            <v-textarea label="Detail" v-model="detail" prepend-icon="mdi-information" :rules="rules"></v-textarea>

            <v-text-field label="Sweet Level" v-model="sweetlevel" prepend-icon="mdi-note" :rules="rules"></v-text-field>

            <v-text-field label="Dessert Zone" v-model="dessertzone" prepend-icon="mdi-flag" :rules="rules"></v-text-field>

            <v-file-input @change="selectFile" :rules="rules" show-size-counter multiple label="Select Image"></v-file-input>

            <v-btn type="submit" class="mt-3" color="primary">Create Dessert</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import router from '../router';

export default {
  data() {
    return {
      rules: [(value) => !!value || 'This field is required!'],
      id: '',
      name: '',
      engname: '',
      detail: '',
      sweetlevel: '',
      image: '',
      dessertzone: ''
    };
  },
  methods: {
    selectFile(file) {
      this.image = file[0];
    },
    submitForm() {
      const formData = new FormData();
      formData.append('id', this.id);
      formData.append('name', this.name);
      formData.append('engname', this.engname);
      formData.append('detail', this.detail);
      formData.append('sweetlevel', this.sweetlevel);
      formData.append('image', this.image);
      formData.append('dessertzone', this.dessertzone);

      const requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
      };

      fetch('http://klungkanomthai.sit.kmutt.ac.th:3000/desserts/create', requestOptions)
        .then(response => response.json())
        .then(result => {
          alert(result.message);
          if (result.status === 'ok') {
            router.push('/admin');
          }
        })
        .catch(error => console.log('error', error));
    }
  }
};
</script>
