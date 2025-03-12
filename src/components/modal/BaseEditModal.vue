<script setup>
import { ref, watch, defineEmits, defineProps, computed } from 'vue';
import { useFinancialStore } from '@/stores/financial';
import { useCategoriesStore } from '@/stores/categorias';
import BaseAlertError from '@/components/Alert/BaseAlertError.vue';
import BaseAlertSuccess from '@/components/Alert/BaseAlertSuccess.vue';

const financialStore = useFinancialStore();
const categoryStore = useCategoriesStore();

const props = defineProps({
    show: Boolean,
    type: String,
    row: Object
});

const emit = defineEmits(['close', 'save']);

const isVisible = computed({
    get: () => props.show,
    set: (val) => emit('close', val)
});

const categories = ref([]);
const success = ref(false);
const error = ref(false);
const baseError = ref('');
const baseSuccess = ref('');

const formData = ref({
    id: null,
    data: '',
    tipo: props.type,
    valor: '',
    categoria: '',
    categoria_id: '',
    descricao: ''
});

const loadData = async (id) => {
    if (!id) return;
    try {
        const response = await financialStore.getMovimentacaoById(id);
        formData.value = {
            ...response,
            tipo: props.type,
            categoria_id: response.categoria_id || '',
            categoria: response.categoria || ''
        };
    } catch (error) {
        baseError.value = 'Erro ao carregar os dados da movimentação.';
        error.value = true;
        setTimeout(() => error.value = false, 3000);
        console.error("Erro ao carregar os dados da movimentação:", error);
    }
};

const fetchCategories = async () => {
    try {
        const response = await categoryStore.getAllCategory();
        categories.value = response;
    } catch (error) {
        baseError.value = 'Erro ao buscar categorias.';
        error.value = true;
        setTimeout(() => error.value = false, 3000);
        console.error("Erro ao buscar categorias:", error);
    }
};

watch(() => props.show, async (newVal) => {
    if (newVal) {
        await fetchCategories();
        if (props.row) {
            await loadData(props.row.id);
        }
    }
});

watch(() => props.row, async (newRow) => {
    if (newRow) {
        await loadData(newRow.id);
    }
});

watch(() => props.type, (newVal) => {
    formData.value.tipo = newVal;
});

const save = async () => {
    try {
        if (formData.value.id) {
            await financialStore.updateMovimentacao(formData.value.id, formData.value);
            baseSuccess.value = 'Movimentação atualizada com sucesso!';
            success.value = true;
            setTimeout(() => success.value = false, 3000);
        }
        emit('save');
        emit('close', false);
    } catch (error) {
        baseError.value = 'Erro ao salvar a movimentação.';
        error.value = true;
        setTimeout(() => error.value = false, 3000);
        console.error("Erro ao salvar a movimentação:", error);
    }
};

</script>

<template>
    <v-dialog v-model="isVisible" width="90%" max-width="500px">
        <v-card>
            <v-card-title>
                {{ props.type === 'entrada' ? 'Editar Entrada' : 'Editar Saída' }}
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field v-model="formData.data" label="Data" type="date" required></v-text-field>
                    <v-text-field v-model="formData.valor" label="Valor" type="number" step="0.01"
                        required></v-text-field>

                    <v-select v-model="formData.categoria_id" :items="categories" item-title="nome" item-value="id"
                        label="Categoria" required
                        @update:model-value="formData.categoria = categories.find(c => c.id === formData.categoria_id)?.nome">
                    </v-select>

                    <v-textarea v-model="formData.descricao" label="Descrição"></v-textarea>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn color="red" @click="emit('close', false)">Cancelar</v-btn>
                <v-btn color="green" @click="save">Salvar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- Exibindo alertas de erro e sucesso -->
    <BaseAlertError v-if="error" :text="baseError" type="error" />
    <BaseAlertSuccess v-if="success" :text="baseSuccess" />
</template>

<style scoped>
.v-dialog {
    display: flex;
    align-items: center;
    justify-content: center;
}

.v-card {
    border-radius: 16px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    background-color: #212121;
    padding: 20px;
    width: 100%;
    max-width: 500px;
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.v-card-title {
    font-size: 1.25rem;
    font-weight: bold;
    color: #ddd;
    margin-bottom: 20px;
}

.v-text-field,
.v-textarea {
    margin-bottom: 16px;
}

.v-btn {
    border-radius: 8px;
    font-weight: bold;
}

.v-btn[color='red'] {
    background-color: #f44336;
    color: white;
    transition: background-color 0.3s ease;
}

.v-btn[color='red']:hover {
    background-color: #d32f2f;
}

.v-btn[color='green'] {
    background-color: #4caf50;
    color: white;
    transition: background-color 0.3s ease;
}

.v-btn[color='green']:hover {
    background-color: #388e3c;
}

.v-form {
    color: #ddd;
}

@media (max-width: 600px) {
    .v-card {
        max-width: 90%;
    }

    .v-card-title {
        font-size: 1rem;
    }

    .v-btn {
        width: 100%;
        margin-top: 10px;
    }
}
</style>
