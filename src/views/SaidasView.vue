
<script setup>
import TheTable from '@/components/TheTable.vue';
import { ref } from 'vue';

const rows = ref([
    { id: 1, name: 'John Doe', email: 'john@example.com', position: 'Desenvolvedor', salary: 'R$ 8.000' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', position: 'Designer', salary: 'R$ 7.500' },
]);

const editRow = (row) => {
    console.log("Editar:", row);
};

const deleteRow = (id) => {
    console.log("Deletar:", id);
    rows.value = rows.value.filter(row => row.id !== id);
};
</script>

<template>
    <v-container>
        <!-- Cabeçalho com título e botão -->
        <v-row class="align-center mb-4">
            <v-col cols="6">
                <h2 class="text-h5 font-weight-bold">Gerenciar Saídas</h2>
            </v-col>
            <v-col cols="6" class="text-right">
                <v-btn color="primary" prepend-icon="mdi-plus" @click="createSaida">
                    Criar Saída
                </v-btn>
            </v-col>
        </v-row>
        <v-divider class="mb-4" color="white"></v-divider>

        <!-- Tabela -->
        <TheTable :rows="rows" @edit="editRow" @delete="deleteRow" />
    </v-container>
</template>

<style scoped>
.custom-card {
    border-radius: 16px;
    /* Torna os cantos arredondados */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* Adiciona sombra */
}

h2 {
    color: white;
}
</style>