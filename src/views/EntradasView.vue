<script setup>
import { ref } from 'vue';
import TheTable from '@/components/TheTable.vue';
import FinancialModal from '@/components/modal/FinancialModal.vue';
import BaseExclusaoModal from '@/components/modal/BaseExclusaoModal.vue';
import BaseEditModal from '@/components/modal/BaseEditModal.vue';
import { useFinancialStore } from '@/stores/financial';
import { onMounted } from 'vue';
import BaseLoading from '@/components/loading/BaseLoading.vue';
import BaseCategoryModal from '@/components/modal/BaseCategoryModal.vue';
import BaseAlertError from '@/components/Alert/BaseAlertError.vue';
import BaseAlertSuccess from '@/components/Alert/BaseAlertSuccess.vue';

const store = useFinancialStore();
const showModal = ref(false);
const showEditModal = ref(false);
const modalType = ref("entrada");
const loading = ref(true);
const selectedRow = ref(null);
const showBaseExclusaoModal = ref(false);
const showCategoryModal = ref(false);
const success = ref(false)
const error = ref(false)
const baseText = ref(false)

const headersTable = ref([
    { key: 'descricao', label: 'Descrição' },
    { key: 'categoria', label: 'Categoria' },
    { key: 'valor', label: 'Valor' },
    { key: 'data', label: 'Data' },
]);

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

const handleResponse = (response, successMsg, errorMsg) => {
    if (response) {
        success.value = true;
        baseText.value = successMsg;
    } else {
        error.value = true;
        baseText.value = errorMsg;
    }
    setTimeout(() => {
        success.value = false;
        error.value = false;
    }, 3000);
};

const saveMovimentacao = async (data) => {
    if (selectedRow.value?.id) {

        const response =  store.updateMovimentacao(selectedRow.value.id, data);
        handleResponse(response, "Entrada Editada Com Sucesso", "Erro ao Editar Entrada")

    } else {
        const response = await store.createMovimentacao(data);
        handleResponse(response, "Entrada Criada Com Sucesso", "Erro ao Criar Entrada")

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
        const response = await store.deleteMovimentacao(selectedRow.value);
        handleResponse(response, "Entrada Deletada Com Sucesso", "Erro ao Deletar Entrada")
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
            <v-col cols="4">
                <h2 class="text-h5 font-weight-bold">Entradas</h2>
            </v-col>
            <v-col cols="4" class="text-right">
                <v-btn color="primary" prepend-icon="mdi-plus" @click="openModal('entrada')">
                    Criar Entrada
                </v-btn>
            </v-col>
            <v-col cols="4" class="text-right">
                <v-btn color="secondary" prepend-icon="mdi-plus" @click="showCategoryModal = true">
                    <!-- Abrir modal de categoria -->
                    Criar Categoria
                </v-btn>
            </v-col>
        </v-row>
        <v-divider class="mb-4" color="white"></v-divider>

        <TheTable :rows="rows" @edit="editRow" @delete="deleteRow" :headers="headersTable" />

        <FinancialModal :show="showModal" :type="modalType" :row="selectedRow" @close="showModal = false"
            @save="saveMovimentacao" />

        <BaseCategoryModal :show="showCategoryModal" @close="showCategoryModal = false" /> <!-- Modal de Categoria -->

        <BaseEditModal :show="showEditModal" :type="modalType" :row="selectedRow" @close="showEditModal = false"
            @save="saveMovimentacao" />

        <BaseExclusaoModal v-model="showBaseExclusaoModal" @confirm="confirmDelete" @cancel="cancelDelete" />

        <BaseAlertError class="base-error" v-if="error" type="error" :text="baseText" />

        <BaseAlertSuccess v-if="success" :text="baseText" />
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
