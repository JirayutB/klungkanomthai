<template>
    <v-container>
        <v-row no-gutters>
            <v-col sm="10" class="pa-4 mx-auto">
                <v-card class="pa-2">
                    <v-img width="1000" height="500" :src="`/${dessert.image}`"></v-img>
                    <v-card-actions class="pb-0">
                        <v-row class="mt-1 mx-1">
                            <v-col sm="2">
                                <v-btn small outlined color="primary">{{ dessert.dessertzone }}</v-btn>
                            </v-col>
                            <v-col sm="10" class="d-flex justify-end">
                                <v-btn color="success" text
                                    :to="{ name: 'edit-dessert', params: { id: dessert._id } }">แก้ไข</v-btn>
                                <v-btn color="red" text @click="removeDessert(dessert._id)">ลบ</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                    <v-card-subtitle class="headline">
                        <h3>{{ dessert.thainame + " / " + dessert.engname }}</h3>
                    </v-card-subtitle>
                    <v-card-text class="grey--text">
                        <p>{{ dessert.detail }}</p>
                    </v-card-text>
                    <v-card-subtitle class="grey--text">
                        <h4>ระดับความหวาน 
                            <v-tooltip slot="append" top>
                            <template v-slot:activator="{ on }">
                                <v-icon v-on="on">
                                    mdi-information
                                </v-icon>
                            </template>
                            <span>(1 = ไม่หวาน / 2 = หวานน้อย / 3 = หวานปานกลาง / 4 = หวาน / 5 = หวานมาก) </span>
                        </v-tooltip>
                            : {{ dessert.sweetlevel }}</h4>
                    </v-card-subtitle>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import API from "../api";
export default {
    data() {
        return {
            dessert: {},
        };
    },
    async created() {
        const response = await API.getDessertByID(this.$route.params.id);
        this.dessert = response;
    },
    methods: {
        async removeDessert(id) {
            const response = await API.deleteDessert(id);
            this.$router.push({ name: "admin", params: { message: response.message } })
        }
    }
}
</script>