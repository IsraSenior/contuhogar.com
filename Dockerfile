# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Run
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.output ./
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "./server/index.mjs"]