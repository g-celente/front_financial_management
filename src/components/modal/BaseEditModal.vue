<script setup>
import { ref, watch, defineEmits, defineProps, computed } from 'vue';
import { useFinancialStore } from '@/stores/financial';

const store = useFinancialStore();

const props = defineProps({
    show: Boolean,
    type: String,
    row: Object
});

const emit = defineEmits(['close', 'save']);

const formData = ref({
    id: null,
    data: '',
    tipo: props.type,
    valor: '',
    categoria: '',
    descricao: ''
});

const isVisible = computed({
    get: () => props.show,
    set: (val) => emit('close', val)
});

const loadData = async (id) => {
    if (!id) return;
    try {
        const response = await store.getMovimentacaoById(id);
        formData.value = { ...response, tipo: props.type };
    } catch (error) {
        console.error("Erro ao carregar os dados da movimentação:", error);
    }
};

// Observa quando o modal é aberto para carregar os dados corretamente
watch(() => props.show, async (newVal) => {
    if (newVal && props.row) {
        await loadData(props.row.id);
    }
});

watch(() => props.row, async (newRow) => {
    if (newRow) {
        await loadData(newRow.id);
    }
});

const save = async () => {
    if (formData.value.id) {
        await store.updateMovimentacao(formData.value.id, formData.value);
    }
    emit('save');
    emit('close', false);
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
                    <v-text-field v-model="formData.categoria" label="Categoria" required></v-text-field>
                    <v-textarea v-model="formData.descricao" label="Descrição"></v-textarea>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn color="red" @click="emit('close', false)">Cancelar</v-btn>
                <v-btn color="green" @click="save">Salvar</v-btn>
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
