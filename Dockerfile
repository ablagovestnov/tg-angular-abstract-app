# Stage 1: Build the Angular application
FROM node:20-alpine AS build

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN npm run build --prod

# Stage 2: Serve the application with Nginx
# Use the official Nginx image from the Docker Hub
FROM nginx:latest

# Install certbot and other necessary packages
RUN apt-get update && apt-get install -y \
    certbot \
    python3-certbot-nginx \
    cron

# Copy custom configuration files
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the Angular build output to Nginx's web root
COPY --from=build /usr/src/app/dist/browser/ /usr/share/nginx/html

# Копирование сценария для получения сертификата
COPY ./init-letsencrypt.sh /init-letsencrypt.sh
RUN chmod +x /init-letsencrypt.sh

EXPOSE 80
EXPOSE 443

# Запуск Nginx и Certbot
CMD ["/bin/sh", "-c", "nginx -g 'daemon off;' && sleep 10 && ./init-letsencrypt.sh"]



