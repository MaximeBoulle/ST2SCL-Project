# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=build /app/dist ./dist
# The proto file is included in dist because of nest-cli.json config
# But we might need it in the same relative path as in build
COPY --from=build /app/proto ./proto

EXPOSE 50051

CMD ["node", "dist/main"]
