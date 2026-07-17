# Imagen base oficial de Nginx
FROM nginx:alpine

# Eliminar la configuración por defecto
RUN rm -rf /usr/share/nginx/html/*

# Copiar la aplicación al directorio público de Nginx
COPY . /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
