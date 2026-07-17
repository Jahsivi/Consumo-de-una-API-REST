## Ejecutar el proyecto

1. Abre la carpeta del proyecto en Visual Studio Code.
2. Ejecuta un servidor local desde la raíz del proyecto, por ejemplo:

3. Abre la siguiente dirección en el navegador:

```text
http://localhost:8000/
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
