<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="10" class="mx-auto">
        <v-card class="pa-5">
          <v-card-title>Edit This Dessert</v-card-title>
          <v-divider></v-divider>
          <v-form ref="form" @submit.prevent="updateForm" class="pa-5" enctype="multipart/form-data">
            <v-text-field label="Name" v-model="name" prepend-icon="mdi-note" :rules="rules"></v-text-field>

            <v-text-field label="English Name" v-model="engname" prepend-icon="mdi-note" :rules="rules"></v-text-field>

            <v-textarea label="Detail" v-model="detail" prepend-icon="mdi-information" :rules="rules"></v-textarea>

            <v-select label="Dessert Zone" v-model="dessertzone" prepend-icon="mdi-flag" :rules="rules"
              :items="['ภาคกลาง', 'ภาคเหนือ', 'ภาคตะวันออกเฉียงเหนือ', 'ภาคตะวันออก', 'ภาคใต้', 'ทุกภาค']"
              variant="outlined"></v-select>

            <v-select label="Sweet Level" v-model="sweetlevel" prepend-icon="mdi-note" :rules="rules"
              :items="['1', '2', '3', '4', '5']" variant="outlined"></v-select>

            <v-file-input @change="selectFile" show-size-counter multiple label="Select Image"></v-file-input>
            <v-img :src="`/${dessert.image}`" width="120"></v-img>

            <v-btn type="submit" class="mt-3" color="success">Update Dessert</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import API from "../api"

export default {
  data() {
    return {
      rules: [(value) => !!value || 'This field is required!'],
      dessert: {
        name: "",
        engname: "",
        detail: "",
        dessertzone: "",
        sweetlevel: "",
        image: ""
      },
      image: ""
    };
  },
  methods: {
    selectFile(file) {
      this.image = file[0];
    },
    async updateForm() {
      const formData = new FormData();
      formData.append('image', this.image);
      formData.append('name', this.name);
      formData.append('engname', this.engname);
      formData.append('detail', this.detail);
      formData.append('dessertzone', this.dessertzone);
      formData.append('sweetlevel', this.sweetlevel);
      formData.append('old_image', this.dessert.image);

      if (this.$refs.form.validate()) {
        const response = await API.updateDessert(this.$route.params.id, formData);
        this.$router.push({ name: "admin", params: { message: response.message } });
      }

    }
  }
};
</script>
