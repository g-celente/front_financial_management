<script setup>

import { defineProps } from 'vue';

defineProps({
    fields: Array,
    rows: Array,
    hasOptions: Boolean  
})

</script>

<template>
    <div class="background-table">
        <table>
            <thead>
                <tr>
                    <th v-for="field in fields" :key="field.key">{{ field.label }}</th>
                    <th>OPÇÕES</th>
                </tr>
            </thead>
            <tbody>
                <slot name="body"></slot>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.background-table {
  width: 100%;
  overflow-x: auto;
  border-radius: 10px;
}
</style>