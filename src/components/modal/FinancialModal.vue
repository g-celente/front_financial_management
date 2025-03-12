<script setup>
import { ref, watch, computed, defineEmits, defineProps } from 'vue';
import { useCategoriesStore } from '@/stores/categorias';

const categoryStore = useCategoriesStore();

const props = defineProps({
    show: Boolean,
    type: String
});

const emit = defineEmits(['close', 'save']);

const isVisible = ref(props.show);
const categories = ref([]);

watch(() => props.show, async (newVal) => {
    isVisible.value = newVal;
    if (newVal) {
        await fetchCategories();
    }
});

watch(isVisible, (newVal) => {
    if (!newVal) emit('close');
});

const formData = ref({
    data: '',
    tipo: props.type,
    valor: '',
    categoria: '',
    category_id: '',
    descricao: ''
});

watch(() => props.type, (newVal) => {
    formData.value.tipo = newVal;
});

const fetchCategories = async () => {
    try {
        const response = await categoryStore.getAllCategory();
        categories.value = response;
    } catch (error) {
        console.error("Erro ao buscar categorias:", error);
    }
};

// Computed property para validar se o formulário está preenchido corretamente
const isFormValid = computed(() => {
    return (
        formData.value.data.trim() !== '' &&
        formData.value.valor !== '' &&
        formData.value.category_id !== '' &&
        formData.value.descricao.trim() !== ''
    );
});

const save = () => {
    if (isFormValid.value) {
        emit('save', formData.value);
        isVisible.value = false;
    }
};

</script>

<template>
    <v-dialog v-model="isVisible" max-width="500px">
        <v-card>
            <v-card-title>
                {{ props.type === 'entrada' ? 'Nova Entrada' : 'Nova Saída' }}
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field v-model="formData.data" label="Data" type="date" required></v-text-field>
                    <v-text-field v-model="formData.valor" label="Valor" type="number" step="0.01"
                        required></v-text-field>

                    <v-select v-model="formData.category_id" :items="categories" @click='fetchCategories'
                        item-title="nome" item-value="id" label="Categoria" required
                        @update:model-value="formData.categoria = categories.find(c => c.id === formData.category_id)?.nome">
                    </v-select>

                    <v-textarea v-model="formData.descricao" label="Descrição" required></v-textarea>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn color="red" @click="isVisible = false">Cancelar</v-btn>
                <v-btn color="green" @click="save" :disabled="!isFormValid">Salvar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
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
