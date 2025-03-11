export default (httpClient) => ({

    createMovimentacao: async (data) => {
        return httpClient.post('/financial', data)
    },
    getAllMovimentacao: async () => {
        return httpClient.get('/financial')
    },
    updateMovimentacao: async (data, id) => {
        return httpClient.put(`/financial/${id}`, data)
    },
    deleteMovimentacao: async (id) => {
        return httpClient.delete(`/financial/${id}`)
    },
    getEntradaByUser: async () => {
        return httpClient.get(`/financial/entradas`)
    },
    getSaidaByUser: async () => {
        return httpClient.get('/financial/saidas')
    },
    getMovimentacaoById: async (id) => {
        return httpClient.get(`/financial/${id}`)
    }


})