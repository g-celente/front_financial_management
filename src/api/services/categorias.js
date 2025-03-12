export default (httpClient) => ({
    createCategory: (data) => {
        return httpClient.post("/categories", data)
    },
    deleteCategory: (id) => {
        return httpClient.delete(`/categories/${id}`)
    },
    getAllCategory: () => {
        return httpClient.get("/categories")
    }
})