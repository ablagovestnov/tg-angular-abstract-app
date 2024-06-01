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
FROM nginx:latest

# Copy custom configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Remove the default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy the Angular build output to Nginx's web root
COPY --from=build /usr/src/app/dist/browser/ /usr/share/nginx/html

# Copy the ACME challenge directory and file
COPY .well-known /usr/share/nginx/html/.well-known

# Expose port 80
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]





