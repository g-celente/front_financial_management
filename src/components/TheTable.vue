<template>
    <div class="table-container">
        <table class="custom-table">
            <caption v-if="caption" class="table-caption">
                {{ caption }}
            </caption>
            <thead>
                <tr>
                    <th v-for="header in headers" :key="header.key" class="table-header">
                        {{ header.label }}
                    </th>
                    <th class="text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in rows" :key="row.id" class="table-row">
                    <td v-for="header in headers" :key="header.key" class="table-cell">
                        {{ row[header.key] ?? 'N/A' }}
                    </td>
                    <td class="table-actions">
                        <button class="edit-btn" @click="$emit('edit', row)">
                            ✏️
                        </button>
                        <button class="delete-btn" @click="$emit('delete', row.id)">
                            🗑️
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { ref } from 'vue';

const headers = ref([
    { key: 'descricao', label: 'Descrição' },
    { key: 'categoria', label: 'Categoria' },
    { key: 'valor', label: 'Valor' },
    { key: 'data', label: 'Data' },
]);

// Definição das propriedades que o componente aceita
defineProps({
    rows: Array,
    caption: String
});

// Define os eventos emitidos
defineEmits(['edit', 'delete']);
</script>

<style scoped>
.table-container {
    width: 100%;
    border-radius: 10px;
    color: #ddd;
    box-shadow: 0 0 0 0.7px #ddd;
}

.custom-table {
    width: 100%;
    border-collapse: collapse;
    background-color: #1e1e1e;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #ddd;
}

.table-caption {
    margin-top: 10px;
    font-size: 14px;
    color: #ddd;
    text-align: left;
}

.table-header {
    background-color: #1e1e1e;
    font-weight: bold;
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.text-center {
    background-color: #1e1e1e;
}

.table-cell {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.table-actions {
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 10px;
}

.edit-btn,
.delete-btn {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s ease;
}

.edit-btn {
    background-color: #007bff;
    color: white;
}

.edit-btn:hover {
    background-color: #0056b3;
}

.delete-btn {
    background-color: #dc3545;
    color: white;
}

.delete-btn:hover {
    background-color: #b52b3a;
}
</style>
