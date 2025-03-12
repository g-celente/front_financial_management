import axios from "axios";
import AuthService from "./services/auth";
import FinancialService from "./services/financial";
import CategoryService from "./services/categorias";

const baseURL = "http://127.0.0.1:8000/api/";

const httpClient = axios.create({ baseURL });

let isRefreshing = false;
let subscribers = [];

function onAccessTokenFetched(newToken) {
  subscribers.forEach((callback) => callback(newToken));
  subscribers = [];
}

function addSubscriber(callback) {
  subscribers.push(callback);
}

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token-auth");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Se o token for inválido (erro 401) e não for uma tentativa de renovação
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Se já está tentando renovar o token, espera o novo token
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          // Redireciona para login ou chama o serviço de renovação de token
          await AuthService.refreshToken().then((newToken) => {
            localStorage.setItem("token-auth", newToken);
            onAccessTokenFetched(newToken); // Atualiza todas as requisições que aguardam o novo token
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            isRefreshing = false;
          });
        } catch (err) {
          localStorage.removeItem("token-auth");
          window.location.href = "/login"; // Redireciona para a página de login
          return Promise.reject(err);
        }
      }

      return new Promise((resolve) => {
        addSubscriber((newToken) => {
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          resolve(axios(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default {
  auth: AuthService(httpClient),
  financial: FinancialService(httpClient),
  category: CategoryService(httpClient),
};
