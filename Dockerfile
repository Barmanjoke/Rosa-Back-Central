# Build in Alpine
FROM node:17-alpine AS builder
WORKDIR /app
# DL deps
COPY package*.json ./
RUN npm ci
# Build the app
COPY ./src ./src
COPY ./tsconfig.json ./tsconfig.json
RUN npm run build

# Run in Alpine
FROM node:17-alpine
WORKDIR /app
ENV NODE_ENV production
# DL deps
COPY package*.json ./
RUN npm ci
# Bring the build artifacts
COPY --from=builder /app/build /app
ENV NODE_ENV=/app
CMD ["node", "server.js"]
