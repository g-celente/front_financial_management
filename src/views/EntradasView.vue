<script setup>
import { ref } from 'vue';
import TheTable from '@/components/TheTable.vue';
import FinancialModal from '@/components/modal/FinancialModal.vue';
import BaseExclusaoModal from '@/components/modal/BaseExclusaoModal.vue';
import BaseEditModal from '@/components/modal/BaseEditModal.vue';
import { useFinancialStore } from '@/stores/financial';
import { onMounted } from 'vue';
import BaseLoading from '@/components/loading/BaseLoading.vue';

const store = useFinancialStore();
const showModal = ref(false);
const showEditModal = ref(false);
const modalType = ref("entrada");
const loading = ref(true);
const selectedRow = ref(null);
const showBaseExclusaoModal = ref(false);

const openModal = (type, row = null) => {
    if (row) {
        modalType.value = type;
        selectedRow.value = row;
        showEditModal.value = true;
    } else {
        modalType.value = type;
        selectedRow.value = null;
        showModal.value = true;
    }
};

const saveMovimentacao = async (data) => {
    if (selectedRow.value?.id) { 
        await store.updateMovimentacao(selectedRow.value.id, data);
    } else {
        await store.createMovimentacao(data);
    }
    await getEntradasByUser();
    showModal.value = false;
    showEditModal.value = false;
};
const rows = ref([]);

const getEntradasByUser = async () => {
    loading.value = true;
    try {
        const response = await store.getEntradaByUser();
        rows.value = response;
        loading.value = false;
    } catch (e) {
        console.log("Erro ao buscar entradas:", e);
    }
};

const editRow = (row) => {
    openModal('entrada', row);
};

const deleteRow = (row) => {
    selectedRow.value = row;
    showBaseExclusaoModal.value = true;
};

const confirmDelete = async () => {
    if (selectedRow.value) {
        console.log(selectedRow)
        await store.deleteMovimentacao(selectedRow.value);
        await getEntradasByUser();
    }
    showBaseExclusaoModal.value = false;
};

const cancelDelete = () => {
    showBaseExclusaoModal.value = false;
};

onMounted(async () => {
    await getEntradasByUser();
});
</script>

<template>
    <v-container v-if="loading == false">
        <v-row class="align-center mb-4">
            <v-col cols="6">
                <h2 class="text-h5 font-weight-bold">Gerenciar Entradas</h2>
            </v-col>
            <v-col cols="6" class="text-right">
                <v-btn color="primary" prepend-icon="mdi-plus" @click="openModal('entrada')">
                    Criar Entrada
                </v-btn>
            </v-col>
        </v-row>
        <v-divider class="mb-4" color="white"></v-divider>

        <TheTable :rows="rows" @edit="editRow" @delete="deleteRow" />

        <FinancialModal :show="showModal" :type="modalType" :row="selectedRow" @close="showModal = false"
            @save="saveMovimentacao" />

        <BaseEditModal :show="showEditModal" :type="modalType" :row="selectedRow" @close="showEditModal = false"
            @save="saveMovimentacao" />

        <BaseExclusaoModal v-model="showBaseExclusaoModal" @confirm="confirmDelete" @cancel="cancelDelete" />
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

h2 {
    color: white;
}

.loading {
    height: 400px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
