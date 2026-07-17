# Consumo de una API REST con JSONPlaceholder

Aplicación web sencilla para consumir la API pública de JSONPlaceholder y trabajar con el recurso de publicaciones.

## Requisitos

- Docker Desktop instalado.
- Conexión a internet para consumir la API pública.

## Ejecutar el proyecto de forma local

### Opción 1: usando servidor simple

1. Abre la carpeta del proyecto en Visual Studio Code.
2. Ejecuta un servidor local desde la raíz del proyecto:

```bash
python3 -m http.server 8000
```

3. Abre la siguiente dirección en el navegador:

```text
http://localhost:8000/
```

### Opción 2: usando Docker con Nginx

Este proyecto está preparado para ejecutarse en un contenedor Docker usando Nginx, lo cual es compatible con Mac, Windows y Linux.

1. Desde la carpeta del proyecto, construye y levanta el contenedor:

```bash
docker compose up --build -d
```

2. Abre la aplicación en el navegador:

```text
http://localhost:8080
```

3. Para detener el contenedor:

```bash
docker compose down
```

## Funcionalidades implementadas

- Obtener y mostrar todas las publicaciones.
- Consultar una publicación por su ID.
- Filtrar publicaciones por usuario usando `userId`.
- Crear una nueva publicación con `POST`.
- Actualizar el título mediante `PATCH`.
- Simular la eliminación con `DELETE`.
- Mostrar mensajes de error cuando la API responde con un estado incorrecto.

## Métodos HTTP usados

- `GET`: se utiliza para consultar publicaciones y filtrarlas.
- `POST`: se usa para crear una nueva publicación.
- `PATCH`: se usa para modificar solo el título de una publicación existente.
- `DELETE`: se usa para simular la eliminación de una publicación.

> JSONPlaceholder simula estas operaciones, por lo que los cambios no se almacenan de forma permanente en el servidor.

## Repositorio

- GitHub del proyecto: https://github.com/Jahsivi/Consumo-de-una-API-REST

> El contenedor usa la imagen oficial de Nginx y no se ha publicado aún en Docker Hub; se ejecuta localmente desde este repositorio.
