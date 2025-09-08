# Stage 1: Build stage
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Build the project
RUN npm run build

# Stage 2: Production stage
FROM node:24-alpine AS production

RUN npm install -g serve

WORKDIR /app

COPY --from=builder /app/dist ./dist

EXPOSE 3000

# Use serve to host the built files
CMD ["serve", "-s", "dist", "-l", "3000"]