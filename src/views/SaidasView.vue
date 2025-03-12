<script setup>
import TheTable from '@/components/TheTable.vue';
import { ref } from 'vue';
import FinancialModal from '@/components/modal/FinancialModal.vue';
import { onMounted } from 'vue';
import BaseLoading from '@/components/loading/BaseLoading.vue';
import BaseExclusaoModal from '@/components/modal/BaseExclusaoModal.vue';
import { useFinancialStore } from '@/stores/financial';
import BaseEditModal from '@/components/modal/BaseEditModal.vue';
import BaseAlertError from '@/components/Alert/BaseAlertError.vue';
import BaseAlertSuccess from '@/components/Alert/BaseAlertSuccess.vue';

const store = useFinancialStore();
const showEditModal = ref(false);
const showModal = ref(false);
const modalType = ref("entrada");
const loading = ref(true);
const selectedRow = ref(null);
const showBaseExclusaoModal = ref(false);
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
        const response = await store.updateMovimentacao(selectedRow.value, data);
        handleResponse(response, "Saída Editada Com Sucesso", "Erro ao Editar Saída")
    } else {
        const response = await store.createMovimentacao(data);
        handleResponse(response, "Saída Criada Com Sucesso", "Erro ao Criar Saída")
    }
    await getSaidasByUser();
    showModal.value = false;
    showEditModal.value = false;
};

const rows = ref([]);

const getSaidasByUser = async () => {

    loading.value = true;

    try {
        const response = await store.getSaidaByUser();
        rows.value = response;
        loading.value = false
    } catch (e) {
        console.log("Erro ao buscar saidas:", e);
    }
};

const editRow = (row) => {
    openModal('saida', row);
};

const deleteRow = (row) => {
    selectedRow.value = row;
    showBaseExclusaoModal.value = true;
};

const confirmDelete = async () => {
    if (selectedRow.value) {
        try {
            const response = await store.deleteMovimentacao(selectedRow.value);
            rows.value = rows.value.filter(item => item.id !== selectedRow.value);
            handleResponse(response, "Saída Deletada Com Sucesso", "Erro ao Deletar Saída")
            showBaseExclusaoModal.value = false;
        } catch (error) {
            console.error("Erro ao excluir movimentação:", error);
        }
    }
};

const cancelDelete = () => {
    showBaseExclusaoModal.value = false;
};

onMounted(() => {
    getSaidasByUser();
});
</script>

<template>
    <v-container v-if="loading == false">
        <v-row class="align-center mb-4">
            <v-col cols="6">
                <h2 class="text-h5 font-weight-bold">Gerenciar Saídas</h2>
            </v-col>
            <v-col cols="6" class="text-right">
                <v-btn color="red" prepend-icon="mdi-minus" @click="openModal('saida')" class="ml-2">
                    Criar Saída
                </v-btn>
            </v-col>
        </v-row>
        <v-divider class="mb-4" color="white"></v-divider>

        <TheTable :rows="rows" @edit="editRow" @delete="deleteRow" :headers="headersTable" />

        <FinancialModal :show="showModal" :type="modalType" @close="showModal = false" @save="saveMovimentacao" />

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