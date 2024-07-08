# Usar uma imagem oficial do Node.js como base
FROM node:18-alpine

# Criar e definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos package.json e package-lock.json
COPY package*.json ./


# Instalar as dependências
RUN npm install

# Copiar o diretório build já compilado
COPY . .

RUN npm run build

# Informar o comando de inicialização da aplicação
CMD ["npm", "start"]
