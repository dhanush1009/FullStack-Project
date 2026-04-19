# Stage 1: Build the React Application
FROM node:22-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
# Note: Using legacy-peer-deps to avoid the ERESOLVE errors observed locally
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the application files
COPY . .

# Build for production
RUN npm run build

# Stage 2: Serve the build using Nginx
FROM nginx:alpine

# Copy the built assets to Nginx's HTML folder
# Assuming Vite default output directory 'dist'
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a custom nginx configuration if needed
# Example: handling React Router history fallback
RUN echo "server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files \$uri \$uri/ /index.html; \
    } \
}" > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]