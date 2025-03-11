import { defineStore } from "pinia";
import api from "@/api"
import { ref } from "vue"


export const userStore = defineStore("auth", () => {
    const user = ref();

    async function userLogin(payload) {

        try {
            const response = await api.auth.signIn(payload) 

            return response.data
        } catch (e) {
            console.log(e)
        }

    }

    async function userRegister(payload) {
      try {

        const response = await api.auth.signUp(payload)

        return response.data
      } catch (e) {
        console.log(e)
      }
    }

    async function logout() {
      try {
        const response = await api.auth.logout()

        return response.data
      } catch (e) {
        console.log(e)
      }
    }

    return {
        user,
        userLogin,
        userRegister,
        logout
    }
})