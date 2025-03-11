<script setup>
import { ref, watch, defineEmits, defineProps } from 'vue';

const props = defineProps({
    show: Boolean, // Controla a visibilidade da modal
    type: String // Define se é "entrada" ou "saida"
});

const emit = defineEmits(['close', 'save']);

const isVisible = ref(props.show); // Estado interno da modal

watch(() => props.show, (newVal) => {
    isVisible.value = newVal;
});

// Observa mudanças na ref `isVisible` para sincronizar com o componente pai
watch(isVisible, (newVal) => {
    if (!newVal) emit('close'); // Fecha a modal se `isVisible` mudar para false
});

// Dados do formulário
const formData = ref({
    data: '',
    tipo: props.type, // Inicializa com o tipo da prop
    valor: '',
    categoria: '',
    descricao: ''
});

// Observa mudanças no tipo da prop e atualiza o formData.tipo
watch(() => props.type, (newVal) => {
    formData.value.tipo = newVal;
});

const save = async () => {
    emit('save', formData.value);
    isVisible.value = false; // Fecha a modal
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
                    <v-text-field v-model="formData.categoria" label="Categoria" required></v-text-field>
                    <v-textarea v-model="formData.descricao" label="Descrição"></v-textarea>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn color="red" @click="isVisible = false">Cancelar</v-btn>
                <v-btn color="green" @click="save">Salvar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped>
/* Estilos para a modal */
.v-dialog {
    /* Centraliza a modal na tela */
    display: flex;
    align-items: center;
    justify-content: center;
}

.v-card {
    /* Adiciona bordas arredondadas e sombra */
    border-radius: 16px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    background-color: #212121;
    padding: 20px;
    width: 100%;
    max-width: 500px; /* Limita a largura em telas grandes */
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

/* Estilos do título da card */
.v-card-title {
    font-size: 1.25rem;
    font-weight: bold;
    color: #ddd;
    margin-bottom: 20px;
}

/* Estilo para os campos de texto */
.v-text-field, .v-textarea {
    margin-bottom: 16px;
}

/* Botões */
.v-btn {
    border-radius: 8px;
    font-weight: bold;
}

/* Estilo do botão de "Cancelar" */
.v-btn[color='red'] {
    background-color: #f44336;
    color: white;
    transition: background-color 0.3s ease;
}

.v-btn[color='red']:hover {
    background-color: #d32f2f;
}

/* Estilo do botão de "Salvar" */
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

/* Responsividade */
@media (max-width: 600px) {
    .v-card {
        /* Reduz a largura da modal em telas pequenas */
        max-width: 90%;
    }

    .v-card-title {
        font-size: 1rem; /* Ajusta o tamanho da fonte do título */
    }

    .v-btn {
        width: 100%; /* Botões ficam em largura total */
        margin-top: 10px;
    }
}
</style>
