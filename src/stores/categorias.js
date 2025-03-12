import { defineStore } from "pinia";
import api from "@/api"

export const useCategoriesStore = defineStore("categories", () => {

    async function createCategory(payload) {
        try {
            const response = await api.category.createCategory(payload)

            return response.data
        } catch (e) {
            console.log(e)
        }
    }

    async function deleteCategory(id) {
        try {
            const response = await api.category.deleteCategory(id)

            return response.data
        } catch (e) {
            console.log(e)
        }
    }

    async function getAllCategory() {
        try {
            const response = await api.category.getAllCategory()

            return response.data
        } catch (e) {
            console.log(e)
        }
       
    }

    return {
        createCategory,
        deleteCategory,
        getAllCategory
    }

})