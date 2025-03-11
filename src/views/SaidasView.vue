
<script setup>
import TheTable from '@/components/TheTable.vue';
import { ref } from 'vue';
import FinancialModal from '@/components/modal/FinancialModal.vue';
import { onMounted } from 'vue';
import BaseLoading from '@/components/loading/BaseLoading.vue';
import BaseExclusaoModal from '@/components/modal/BaseExclusaoModal.vue';
import { useFinancialStore } from '@/stores/financial';
import BaseEditModal from '@/components/modal/BaseEditModal.vue';

const store = useFinancialStore();
const showEditModal = ref(false);
const showModal = ref(false);
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
        await store.updateMovimentacao(selectedRow.value, data);
    } else {
        await store.createMovimentacao(data);
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
        console.log(selectedRow)
        await store.deleteMovimentacao(selectedRow.value);
        await getSaidasByUser();
    }
    showBaseExclusaoModal.value = false;
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

        <TheTable :rows="rows" @edit="editRow" @delete="deleteRow" />

        <FinancialModal :show="showModal" :type="modalType" @close="showModal = false" @save="saveMovimentacao" />

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