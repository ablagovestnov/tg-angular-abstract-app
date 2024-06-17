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

# Копируем скрипты для получения сертификатов и настройки обновлений
COPY get_cert.sh /usr/local/bin/get_cert.sh
COPY renew_cert.sh /usr/local/bin/renew_cert.sh

# Настраиваем права доступа к скриптам
RUN chmod +x /usr/local/bin/get_cert.sh
RUN chmod +x /usr/local/bin/renew_cert.sh

# Копируем crontab файл для автоматического обновления сертификатов
COPY crontab /etc/cron.d/certbot

# Даём права cron
RUN chmod 0644 /etc/cron.d/certbot

# Запускаем cron
RUN crontab /etc/cron.d/certbot

# Создаем необходимую директорию
RUN mkdir -p /usr/share/nginx/html/.well-known/acme-challenge

# Настраиваем права доступа к директории
RUN chown -R www-data:www-data /usr/share/nginx/html
RUN chmod -R 755 /usr/share/nginx/html
EXPOSE 80
# Получаем и устанавливаем сертификат при запуске контейнера
CMD /usr/local/bin/get_cert.sh && cron && nginx -g 'daemon off;'


# Copy the ACME challenge directory and file
#COPY .well-known /usr/share/nginx/html/.well-known
#EXPOSE 80
# Run the script to initialize Let's Encrypt and start cron to handle renewals
#CMD ["/bin/sh", "-c", "/init-letsencrypt.sh && cron && nginx -g 'daemon off;'"]
# Expose port 80
#EXPOSE 80

# Start Nginx when the container starts
#CMD ["nginx", "-g", "daemon off;"]





