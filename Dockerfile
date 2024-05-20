# Stage 1: Build the Angular application
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Stage 2: Serve the application using Node.js
FROM node:20
WORKDIR /app
COPY --from=build /app /app
CMD ["node", "server.js"]
