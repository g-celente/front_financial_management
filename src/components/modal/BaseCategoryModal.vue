<script setup>
import { ref, watch, defineEmits, defineProps } from 'vue';
import { useCategoriesStore } from '@/stores/categorias';
import BaseAlertError from '../Alert/BaseAlertError.vue';
import BaseAlertSucess from '../Alert/BaseAlertSuccess.vue';
import TheTable from '../TheTable.vue';

const categoryStore = useCategoriesStore();

const props = defineProps({
    show: Boolean,
});

const emit = defineEmits(['close', 'save']);

const isVisible = ref(props.show);
const newCategory = ref(''); // Para armazenar o nome da nova categoria
const categories = ref([]);
const error = ref(false)
const success = ref(false)
const baseError = ref(false)
const baseSuccess = ref(false) // Para armazenar todas as categorias do usuário

watch(() => props.show, async (newVal) => {
    isVisible.value = newVal;
    if (newVal) {
        await fetchCategories();
    }
});

watch(isVisible, (newVal) => {
    if (!newVal) emit('close');
});

const fetchCategories = async () => {
    try {
        const response = await categoryStore.getAllCategory();
        categories.value = response;
    } catch (error) {
        console.error("Erro ao buscar categorias:", error);
    }
};

const saveCategory = async () => {
    if (!newCategory.value.trim()) return;

    try {
        const response = await categoryStore.createCategory({ nome: newCategory.value });

        if (response) {
            success.value = true;
            baseSuccess.value = "Categoria Criada com Sucesso!"
            setTimeout(() => {
                success.value = false;
            }, 3000)
            newCategory.value = '';
            await fetchCategories();
        } else {
            baseError.value = true;
            setTimeout(() => {
                baseError.value = false;
            }, 3000)
        }

    } catch (error) {
        console.error("Erro ao salvar categoria:", error);
    }
};

const deleteCategory = async (id) => {
    try {
        const response = await categoryStore.deleteCategory(id);

        if (response) {
            await fetchCategories();
        } else {
            error.value = true
            baseError.value = "Categoria está em uso atualmente";
            setTimeout(() => {
                error.value = false;
            }, 3000);
        }

    } catch (error) {
        console.error("Erro ao excluir categoria:", error);
    }
};

const editCategory = async (category) => {
    console.log("Categoria a ser editada:", category);
};

const headersTable = [
    { key: 'nome', label: 'Nome da Categoria' }
];

</script>

<template>
    <v-dialog v-model="isVisible" max-width="500px">
        <v-card>
            <v-card-title>
                Gerenciar Categorias
            </v-card-title>

            <v-card-text>
                <v-form class="form">
                    <v-text-field v-model="newCategory" label="Nova Categoria" required></v-text-field>
                    <v-btn color="green" @click="saveCategory">Adicionar Categoria</v-btn>
                </v-form>
                <TheTable :rows="categories" @edit="editCategory" @delete="deleteCategory" :headers="headersTable" />
            </v-card-text>
            <v-card-actions>
                <v-btn color="red" @click="isVisible = false">Fechar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <BaseAlertError class="base-error" v-if="error" type="error" :text="baseError" />
    <BaseAlertSucess v-if="success" :text="baseSuccess" />
</template>

<style scoped>
.v-dialog {
    display: flex;
    align-items: center;
    justify-content: center;
}

.v-card {
    border-radius: 16px;
    padding: 20px;
    max-width: 500px;
    background-color: #212121;
    color: #ddd;
}

.v-card-title {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 20px;
}

.v-btn {
    margin-top: 10px;
}

.form {
    margin-bottom: 10px;
}
</style>
