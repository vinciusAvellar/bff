# --- Estágio 1: Build (Compilação) ---
FROM node:20-alpine AS builder

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copia e instala as dependências
COPY package*.json ./
RUN npm install

# Copia o código-fonte restante
COPY . .

# Compila o NestJS (TypeScript -> JavaScript)
RUN npm run build


# --- Estágio 2: Production (Execução) ---
FROM node:20-alpine

WORKDIR /usr/src/app

# Copia dependências e o código compilado da Etapa 1
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

# EXPOR PORTA: Mude esta porta (3000, 3001, 3002 ou 3003)
# O Docker expõe a porta de escuta do seu NestJS
EXPOSE 3003

# Comando de inicialização: Roda o código compilado
CMD ["node", "dist/main.js"]