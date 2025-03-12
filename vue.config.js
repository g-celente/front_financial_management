const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    proxy: {
      '/api': {
        target: 'http://ec2-3-145-166-91.us-east-2.compute.amazonaws.com', // URL do seu backend
        changeOrigin: true,
        secure: false, // Defina como false para permitir HTTP no ambiente de desenvolvimento
        pathRewrite: {
          '^/api': '/api', // Mantém o caminho '/api' durante a proxyização
        },
      },
    },
  },

  pluginOptions: {
    vuetify: {
      // Configuração do Vuetify (se necessário)
    },
  },
})
