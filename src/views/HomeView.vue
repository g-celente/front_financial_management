<script setup>
import { ref, onMounted } from "vue";
import { useFinancialStore } from "@/stores/financial";
import BaseLoading from '@/components/loading/BaseLoading.vue';
import PieChart from '@/views/partials/PieChart.vue'; // Importando o PieChart
import BarChart from '@/views/partials/BarChart.vue'; // Importando o BarChart

const financialStore = useFinancialStore();
const dashboardData = ref({ entradas: 0, saidas: 0, saldo: 0 });
const loading = ref(false);

const getDashboardData = async () => {
    loading.value = true;

    try {
        const data = await financialStore.getDashboardData();

        if (data) {
            dashboardData.value = data;
            console.log(dashboardData.value)
            loading.value = false;
        }

    } catch (e) {
        console.error("Erro ao carregar os dados do dashboard:", e);
    }
}

onMounted(async () => {
    await getDashboardData()
});
</script>

<template>
    <v-container v-if="!loading">
        <v-row>
            <!-- Cards para Entradas, Saídas e Saldo -->
            <v-col sm="4" class="d-flex">
                <v-card class="mx-auto custom-card" width="100%" flat>
                    <v-list-item class="px-6" height="88">
                        <template v-slot:prepend>
                            <v-avatar color="surface-light" size="32">💰</v-avatar>
                        </template>
                        <template v-slot:title> Entradas </template>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-card-text class="text-medium-emphasis pa-6">
                        <div class="text-h4 font-weight-black mb-4" style="color: #ddd;">R$ {{ dashboardData.totalEntradas }}</div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col sm="4" class="d-flex">
                <v-card class="mx-auto custom-card" width="100%" flat>
                    <v-list-item class="px-6" height="88">
                        <template v-slot:prepend>
                            <v-avatar color="surface-light" size="32">💸</v-avatar>
                        </template>
                        <template v-slot:title> Saídas </template>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-card-text class="text-medium-emphasis pa-6">
                        <div class="text-h4 font-weight-black mb-4" style="color: #ddd;">R$ {{ dashboardData.totalSaidas }}</div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col sm="4" class="d-flex">
                <v-card class="mx-auto custom-card" width="100%" flat>
                    <v-list-item class="px-6" height="88">
                        <template v-slot:prepend>
                            <v-avatar color="surface-light" size="32">📊</v-avatar>
                        </template>
                        <template v-slot:title> Saldo </template>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-card-text class="text-medium-emphasis pa-6">
                        <div class="text-h4 font-weight-black mb-4" style="color: #ddd;">R$ {{ dashboardData.saldo }}</div>
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- Gráfico de Pizza e Barras -->
            <v-col sm="6" class="d-flex">
                <v-card class="mx-auto custom-card" width="100%" flat>
                    <v-card-title>Entradas e Saídas</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <PieChart :percentEntradas="dashboardData.percentEntradas" :percentSaidas="dashboardData.percentSaidas" />
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col sm="6" class="d-flex">
                <v-card class="mx-auto custom-card" width="100%" flat>
                    <v-card-title>Movimentações por Categoria</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <BarChart :movimentacoesPorCategoria="dashboardData.movimentacoesPorCategoria" />
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

    <v-container v-else>
        <v-col class="loading">
            <BaseLoading />
        </v-col>
    </v-container>
</template>

<style scoped>
.custom-card {
    border-radius: 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.mx-auto {
    background-color: #212121;
    color: #ddd;
}



.loading {
    height: 400px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
