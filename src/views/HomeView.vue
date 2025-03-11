<template>
    <v-row>
        <v-col cols="12" sm="4" class="d-flex">
            <v-card class="mx-auto custom-card" max-width="500" flat>
                <v-list-item class="px-6" height="88">
                    <template v-slot:prepend>
                        <v-avatar color="surface-light" size="32">🎯</v-avatar>
                    </template>

                    <template v-slot:title> Set an earnings goal. </template>

                    <template v-slot:append>
                        <v-btn class="text-none" color="primary" text="Create goal" variant="text" slim></v-btn>
                    </template>
                </v-list-item>

                <v-divider></v-divider>

                <v-card-text class="text-medium-emphasis pa-6">
                    <div class="text-h6 mb-6">Earn my first $100</div>

                    <div class="text-h4 font-weight-black mb-4">0%</div>

                    <v-progress-linear bg-color="surface-variant" class="mb-6" color="primary" height="10"
                        model-value="2" rounded="pill"></v-progress-linear>

                    <div>$0 of $100 earned — 7 days left</div>
                </v-card-text>
            </v-card>
        </v-col>

        <v-col cols="12" sm="4" class="d-flex">
            <v-card class="mx-auto custom-card" max-width="500" flat>
                <v-list-item class="px-6" height="88">
                    <template v-slot:prepend>
                        <v-avatar color="surface-light" size="32">🎯</v-avatar>
                    </template>

                    <template v-slot:title> Set an earnings goal. </template>

                    <template v-slot:append>
                        <v-btn class="text-none" color="primary" text="Create goal" variant="text" slim></v-btn>
                    </template>
                </v-list-item>

                <v-divider></v-divider>

                <v-card-text class="text-medium-emphasis pa-6">
                    <div class="text-h6 mb-6">Earn my first $100</div>

                    <div class="text-h4 font-weight-black mb-4">0%</div>

                    <v-progress-linear bg-color="surface-variant" class="mb-6" color="primary" height="10"
                        model-value="2" rounded="pill"></v-progress-linear>

                    <div>$0 of $100 earned — 7 days left</div>
                </v-card-text>
            </v-card>
        </v-col>

        <v-col cols="12" sm="4" class="d-flex">
            <v-card class="mx-auto custom-card" max-width="500" flat>
                <v-list-item class="px-6" height="88">
                    <template v-slot:prepend>
                        <v-avatar color="surface-light" size="32">🎯</v-avatar>
                    </template>

                    <template v-slot:title> Set an earnings goal. </template>

                    <template v-slot:append>
                        <v-btn class="text-none" color="primary" text="Create goal" variant="text" slim></v-btn>
                    </template>
                </v-list-item>

                <v-divider></v-divider>

                <v-card-text class="text-medium-emphasis pa-6">
                    <div class="text-h6 mb-6">Earn my first $100</div>

                    <div class="text-h4 font-weight-black mb-4">0%</div>

                    <v-progress-linear bg-color="surface-variant" class="mb-6" color="primary" height="10"
                        model-value="2" rounded="pill"></v-progress-linear>

                    <div>$0 of $100 earned — 7 days left</div>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>

</template>

<style scoped>
.custom-card {
    border-radius: 16px;
    /* Torna os cantos arredondados */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* Adiciona sombra */
}
</style>