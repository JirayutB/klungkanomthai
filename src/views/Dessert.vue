<template>
    <v-container>
        <v-row no-gutters>
            <v-col sm="10" class="pa-4 mx-auto">
                <v-card class="pa-2">
                    <v-img :src="`/${dessert.image}`"></v-img>
                    <v-card-actions class="pb-0">
                        <v-row class="mt-1 mx-1">
                            <v-col sm="10" class="d-flex justify-end"></v-col>
                            <v-btn color="succees" text>Edit</v-btn>
                            <v-btn color="red" text>Delete</v-btn>
                        </v-row>
                    </v-card-actions>
                    <v-card-subtitle class="headline">
                        <h3>{{ dessert.name }}</h3>
                    </v-card-subtitle>
                    <v-card-text class="grey--text">
                        <p>{{ dessert.detail }}</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            dessert: {},
        };
    }

}
</script>