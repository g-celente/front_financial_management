import { defineStore } from "pinia";
import api from "@/api";
import { ref } from "vue";

export const useFinancialStore = defineStore("financial", () => {
    const movimentacoes = ref([]);

    async function createMovimentacao(payload) {
        try {
            const response = await api.financial.createMovimentacao(payload);
            return response.data;
        } catch (e) {
            console.error("Erro ao criar movimentação:", e);
        }
    }

    async function getAllMovimentacao() {
        try {
            const response = await api.financial.getAllMovimentacao();

            return response.data;
        } catch (e) {
            console.error("Erro ao buscar movimentações:", e);
        }
    }

    async function updateMovimentacao(id, payload) {
        try {
            const response = await api.financial.updateMovimentacao(payload, id);
            return response.data;
        } catch (e) {
            console.error("Erro ao atualizar movimentação:", e);
        }
    }

    async function deleteMovimentacao(id) {
        try {
            await api.financial.deleteMovimentacao(id);
            movimentacoes.value = movimentacoes.value.filter(item => item.id !== id);
        } catch (e) {
            console.error("Erro ao excluir movimentação:", e);
        }
    }

    async function getEntradaByUser() {
        try {
            const response = await api.financial.getEntradaByUser();

            console.log(response)

            return response.data;
        } catch (e) {
            console.error("Erro ao buscar entradas:", e);
        }
    }

    async function getSaidaByUser() {
        try {
            const response = await api.financial.getSaidaByUser();
            return response.data;
        } catch (e) {
            console.error("Erro ao buscar saídas:", e);
        }
    }

    async function getMovimentacaoById(id) {
        try {
            const response = await api.financial.getMovimentacaoById(id)

            return response.data
        } catch (e) {
            console.log(e)
        }
    }

    return {
        movimentacoes,
        createMovimentacao,
        getAllMovimentacao,
        updateMovimentacao,
        deleteMovimentacao,
        getEntradaByUser,
        getSaidaByUser,
        getMovimentacaoById
    };
});
