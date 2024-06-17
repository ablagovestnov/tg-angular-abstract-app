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
#COPY adventure_finder.conf /etc/nginx/conf.d/adventure_finder.conf

# Remove the default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy the script to request certificates
COPY init-letsencrypt.sh /init-letsencrypt.sh

# Make sure the script is executable
RUN chmod +x /init-letsencrypt.sh

# Copy the Angular build output to Nginx's web root
COPY --from=build /usr/src/app/dist/browser/ /usr/share/nginx/html

# Copy the ACME challenge directory and file
COPY .well-known /usr/share/nginx/html/.well-known
EXPOSE 80
# Run the script to initialize Let's Encrypt and start cron to handle renewals
CMD ["/bin/sh", "-c", "/init-letsencrypt.sh && cron && nginx -g 'daemon off;'"]
# Expose port 80
#EXPOSE 80

# Start Nginx when the container starts
#CMD ["nginx", "-g", "daemon off;"]





