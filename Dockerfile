# Use the official Nginx image from the Docker Hub
FROM nginx:latest

# Copy custom configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy Angular build output to Nginx html directory
COPY dist/browser /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]


