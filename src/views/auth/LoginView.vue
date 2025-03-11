<script setup>
import { ref } from "vue";
import { userStore } from "@/stores/auth.js";
import { useRouter } from "vue-router";
import BaseAlertError from "@/components/Alert/BaseAlertError.vue";

const { userLogin } = userStore();
const { userRegister } = userStore();
const router = useRouter();
const error = ref(false);
const errorRegister = ref(false)
const loading = ref(false);
const step = ref(1); // Corrigido para ser reativo

const payloadCadastro = ref({
  name: "",
  email: "",
  password: ""
})

const payload = ref({
  email: "",
  password: ""
});

const handleRegister = async () => {
  loading.value = true;

  try {
    const register = await userRegister(payloadCadastro.value);

    if (register) {
      localStorage.setItem("token-auth", register.token)
      router.push({path: "/home"})
    } else {
      errorRegister.value = true;
      setTimeout(() => {
        errorRegister.value = false;
      }, 3000);
    }
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false;
  }
}

const handleSubmit = async () => {
  loading.value = true;
  try {
    const login = await userLogin(payload.value);
    if (login) {
      localStorage.setItem("token-auth", login.token);
      router.push({ path: "/home" });
    } else {
      error.value = true;
      setTimeout(() => {
        error.value = false;
      }, 3000);
    }
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <v-container fluid class="fill-height d-flex pa-0">
    <!-- Formulário centralizado -->
    <v-col cols="12" md="5" class="d-flex align-center justify-center">
      <v-window v-model="step" class="w-100 d-flex justify-center">
        <!-- Tela de Login -->
        <v-window-item :value="1">
          <v-card flat class="pa-6 form-container">
            <v-card-title class="text-h5 font-weight-bold text-center">Bem vindo ao Dash!👋</v-card-title>
            <v-card-subtitle class="text-center mb-4">Faça login com sua conta</v-card-subtitle>
            <v-card-text>
              <v-text-field v-model="payload.email" label="Email" variant="outlined" density="comfortable" />
              <v-text-field v-model="payload.password" label="Password" type="password" variant="outlined"
                density="comfortable" />
              <v-row align="center" justify="space-between">
                <v-checkbox label="Remember Me" hide-details />
                <router-link to="/forgotPassword" class="text-caption text-blue">Esqueceu sua senha?</router-link>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn :loading="loading" block color="white" class="btn-handleSubmit" @click="handleSubmit">LOGIN</v-btn>
            </v-card-actions>
            <v-card-text class="text-center text-caption">
              Novo na plataforma?
              <v-btn variant="text" color="blue" @click="step = 2">Cadastre-se</v-btn>
            </v-card-text>
          </v-card>
        </v-window-item>

        <!-- Tela de Cadastro -->
        <v-window-item :value="2">
          <v-card flat class="pa-6 form-container">
            <v-card-title class="text-h5 font-weight-bold text-center">Não Possui uma conta ainda?</v-card-title>
            <v-card-subtitle class="text-center mb-4">Crie sua conta abaixo!👋</v-card-subtitle>
            <v-card-text>
              <v-text-field 
                v-model="payloadCadastro.name"
                label="Nome" 
                variant="outlined" 
                density="comfortable" 
              />
              <v-text-field 
                v-model="payloadCadastro.email"
                label="Email" 
                variant="outlined" 
                density="comfortable" 
              />
              <v-text-field 
                v-model="payloadCadastro.password"
                label="Senha" 
                type="password" 
                variant="outlined" 
                density="comfortable" 
              />
            </v-card-text>
            <v-card-actions>
              <v-btn block class="btn-handleSubmit" color="white" @click="handleRegister">Cadastrar</v-btn>
            </v-card-actions>
            <v-card-text class="text-center text-caption">
              Já tem uma conta?
              <v-btn variant="text"  color="blue" @click="step = 1">Faça login</v-btn>
            </v-card-text>
          </v-card>
        </v-window-item>
      </v-window>
    </v-col>
    <!-- Imagem do lado esquerdo -->
    <v-col cols="12" md="7" class="image-container d-flex align-center justify-center">
      <v-img width="500" height="500" src="../../assets/img/dashboard.png"></v-img>
    </v-col>
  </v-container>

  <BaseAlertError v-if="error" type="error" text="Email ou senha incorretos" />
  <BaseAlertError v-if="errorRegister" type="error" text="Usuário já registrado" />
</template>

<style scoped>
/* Ajuste do tamanho da imagem */
.image-container {
  min-height: 100vh;
  background-color: #F6F5FA;
}

/* Formulário centralizado e menor */
.form-container {
  max-width: 400px;
  max-height: 600px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
}

.btn-handleSubmit {
  background-color: #686CFF;
}
</style>


