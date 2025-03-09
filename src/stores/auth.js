import { defineStore } from "pinia";
import api from "@/api";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref({});

  async function signIn(payload) {
    try {
      const response = await api.auth.signIn(payload);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function signUp(payload) {
    try {
      const response = await api.auth.signUp(payload);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  async function logout() {
    try {
      const response = await api.auth.logout();
      user.value = response.data;
      return response.data;
    } catch (error) {
        console.log(error)
    }
  }
  return { 
    user, 
    signIn, 
    signUp, 
    logout
  };
});