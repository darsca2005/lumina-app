FROM node:22-alpine

WORKDIR /app

# Copia file dell'applicazione
COPY package*.json ./
COPY src/ ./src/
COPY public/ ./public/
COPY replica/ ./replica/

# Esegui la verifica build
RUN npm run build

EXPOSE 3456
ENV PORT=3456
ENV NODE_ENV=production

CMD ["npm", "start"]
