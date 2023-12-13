<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="10" class="mx-auto">
        <v-card class="pa-5">
          <v-card-title>เพิ่มขนมไทย</v-card-title>
          <v-divider></v-divider>
          <v-form ref="form" @submit.prevent="submitForm" class="pa-5" enctype="multipart/form-data">
            <v-text-field label="ชื่อภาษาไทย" v-model="thainame" prepend-icon="mdi-note" :rules="rules"></v-text-field>

            <v-text-field label="ชื่อภาษาอังกฤษ" v-model="engname" prepend-icon="mdi-note" :rules="rules"></v-text-field>

            <v-textarea label="คำอธิบาย" v-model="detail" prepend-icon="mdi-information" :rules="rules"></v-textarea>

            <v-select label="ภูมิภาค" v-model="dessertzone" prepend-icon="mdi-flag" :rules="rules"
              :items="['ภาคกลาง', 'ภาคเหนือ', 'ภาคตะวันออกเฉียงเหนือ', 'ภาคตะวันออก', 'ภาคใต้', 'ทุกภาค']" variant="outlined"></v-select>

            <v-select label="ระดับความหวาน" v-model="sweetlevel" prepend-icon="mdi-note" :rules="rules"
            :items="['1 ไม่หวาน', '2 หวานน้อย', '3 หวานปานกลาง', '4 หวาน', '5 หวานมาก']" variant="outlined"></v-select>

            <v-file-input @change="selectFile" :rules="rules" show-size-counter multiple
              label="เลือกรูปภาพขนม"></v-file-input>

            <v-btn type="submit" class="mt-3" color="primary">เพิ่มขนม</v-btn>
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
        thainame: "",
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
    async submitForm() {
      const formData = new FormData();
      formData.append('image', this.image);
      formData.append('thainame', this.thainame);
      formData.append('engname', this.engname);
      formData.append('detail', this.detail);
      formData.append('dessertzone', this.dessertzone);
      formData.append('sweetlevel', this.sweetlevel);

      if (this.$refs.form.validate()) {
        const response = await API.addDessert(formData);
        this.$router.push({ name: "admin", params: { message: response.message } });
      }

    }
  }
};
</script>
