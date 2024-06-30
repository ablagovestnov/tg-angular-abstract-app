# Stage 1: Build the Angular application
FROM node:20-alpine AS build

# Set working directory
WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000
RUN npx tsc
CMD ["node", "dist/server.js"]
