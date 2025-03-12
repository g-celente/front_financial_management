# front_financial_management

INFORMAÇÕES PARA UTILIZAR O SISTEMA

## 1 - Clonar o projeto para sua máquina
```
git clone https://github.com/g-celente/front_financial_management.git
```

## 2 - Instalar as dependências do projeto
```
npm install
```

### 3 - Rodar o projeto localmente
```
npm run serve
```

### 4 - API Backend
A API que o sistema utiliza está hospedada em um servidor EC2. A URL da API é: 
```
http://ec2-xx-xxx-xxx-xx.compute-1.amazonaws.com/api/
````
**Importante:** Neste momento, a API não está configurada com um certificado SSL. Portanto, não é necessário configurar o backend localmente para rodar o projeto frontend. O sistema funcionará diretamente com a API hospedada.

### 5 - Compilar e minificar para produção
```
npm run build
```
