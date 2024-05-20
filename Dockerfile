# Use a Node.js image to build the application
FROM node:20 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Use an Nginx image to serve the built application
FROM nginx:alpine
COPY --from=build /app/dist/tg-angular-abstract-app /usr/share/nginx/html
