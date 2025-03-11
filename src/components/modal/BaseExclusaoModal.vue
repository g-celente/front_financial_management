<script setup>
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps({
    show: Boolean, // Controla a exibição da modal
});

const emit = defineEmits(['confirm', 'cancel']);
const showModal = ref(props.show); // Cria uma variável local para controlar a visibilidade da modal

// Emitir eventos corretamente
const handleConfirm = () => {
    emit('confirm');
};

const handleCancel = () => {
    emit('cancel');
};
</script>

<template>
    <v-dialog v-model="showModal" max-width="400px">
        <v-card>
            <v-card-title class="headline">Confirmar Exclusão</v-card-title>
            <v-card-text>
                Você tem certeza de que deseja excluir esta movimentação?
            </v-card-text>
            <v-card-actions>
                <v-btn color="red" @click="handleCancel">Cancelar</v-btn>
                <v-btn color="green" @click="handleConfirm">Confirmar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped>
.v-card {
    background-color: #212121;
    color: #ddd;
}
</style>
