const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const statusMessage = document.getElementById('statusMessage');
const resultsContainer = document.getElementById('resultsContainer');

function mostrarEstado(mensaje, tipo = 'info') {
  statusMessage.textContent = mensaje;
  statusMessage.className = 'status';

  if (tipo === 'error') {
    statusMessage.classList.add('error');
  } else if (tipo === 'success') {
    statusMessage.classList.add('success');
  }
}

function renderizarPublicaciones(publicaciones) {
  if (!publicaciones.length) {
    resultsContainer.innerHTML = '<p class="placeholder">No se encontraron publicaciones.</p>';
    return;
  }

  resultsContainer.innerHTML = publicaciones
    .map(
      (publicacion) => `
        <article class="post-card">
          <h3>#${publicacion.id} · ${publicacion.title}</h3>
          <p><strong>Usuario:</strong> ${publicacion.userId}</p>
          <p><strong>Contenido:</strong> ${publicacion.body}</p>
        </article>
      `
    )
    .join('');
}

async function peticionApi(url, opciones = {}) {
  const respuesta = await fetch(url, opciones);

  if (!respuesta.ok) {
    throw new Error(`Respuesta HTTP incorrecta: ${respuesta.status}`);
  }

  if (respuesta.status === 204) {
    return null;
  }

  return respuesta.json();
}

async function listarPublicaciones() {
  try {
    mostrarEstado('Consultando publicaciones...', 'info');
    const datos = await peticionApi(API_URL);
    renderizarPublicaciones(datos);
    mostrarEstado(`Se obtuvieron ${datos.length} publicaciones.`, 'success');
  } catch (error) {
    console.error(error);
    mostrarEstado(`No se pudieron cargar las publicaciones: ${error.message}`, 'error');
  }
}

async function buscarPublicacionPorId() {
  const id = document.getElementById('postId').value;

  if (!id) {
    mostrarEstado('Ingresa un identificador de publicación.', 'error');
    return;
  }

  try {
    mostrarEstado('Buscando publicación...', 'info');
    const datos = await peticionApi(`${API_URL}/${id}`);
    renderizarPublicaciones([datos]);
    mostrarEstado(`Publicación ${datos.id} cargada correctamente.`, 'success');
  } catch (error) {
    console.error(error);
    mostrarEstado(`No se pudo encontrar la publicación: ${error.message}`, 'error');
  }
}

async function filtrarPorUsuario() {
  const userId = document.getElementById('userId').value;

  if (!userId) {
    mostrarEstado('Ingresa un identificador de usuario.', 'error');
    return;
  }

  try {
    mostrarEstado('Filtrando publicaciones por usuario...', 'info');
    const datos = await peticionApi(`${API_URL}?userId=${userId}`);
    renderizarPublicaciones(datos);
    mostrarEstado(`Se encontraron ${datos.length} publicaciones para el usuario ${userId}.`, 'success');
  } catch (error) {
    console.error(error);
    mostrarEstado(`No se pudieron filtrar las publicaciones: ${error.message}`, 'error');
  }
}

async function crearPublicacion(evento) {
  evento.preventDefault();

  const titulo = document.getElementById('crearTitulo').value.trim();
  const cuerpo = document.getElementById('crearCuerpo').value.trim();
  const usuarioId = document.getElementById('crearUsuario').value;

  if (!titulo || !cuerpo || !usuarioId) {
    mostrarEstado('Completa todos los campos para crear la publicación.', 'error');
    return;
  }

  try {
    mostrarEstado('Creando publicación...', 'info');
    const datos = await peticionApi(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: titulo,
        body: cuerpo,
        userId: Number(usuarioId)
      })
    });

    renderizarPublicaciones([datos]);
    mostrarEstado(`Publicación creada con ID ${datos.id}.`, 'success');
    document.getElementById('formCrear').reset();
  } catch (error) {
    console.error(error);
    mostrarEstado(`No se pudo crear la publicación: ${error.message}`, 'error');
  }
}

async function actualizarTitulo(evento) {
  evento.preventDefault();

  const id = document.getElementById('actualizarId').value;
  const nuevoTitulo = document.getElementById('actualizarTitulo').value.trim();

  if (!id || !nuevoTitulo) {
    mostrarEstado('Ingresa el ID y el nuevo título.', 'error');
    return;
  }

  try {
    mostrarEstado('Actualizando título...', 'info');
    const datos = await peticionApi(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: nuevoTitulo })
    });

    renderizarPublicaciones([datos]);
    mostrarEstado(`Título actualizado para la publicación ${id}.`, 'success');
    document.getElementById('formActualizar').reset();
  } catch (error) {
    console.error(error);
    mostrarEstado(`No se pudo actualizar el título: ${error.message}`, 'error');
  }
}

async function eliminarPublicacion() {
  const id = document.getElementById('eliminarId').value;

  if (!id) {
    mostrarEstado('Ingresa un identificador para eliminar.', 'error');
    return;
  }

  try {
    mostrarEstado('Eliminando publicación...', 'info');
    await peticionApi(`${API_URL}/${id}`, {
      method: 'DELETE'
    });

    resultsContainer.innerHTML = '<p class="placeholder">La publicación fue eliminada de forma simulada.</p>';
    mostrarEstado(`Publicación ${id} eliminada de forma simulada.`, 'success');
  } catch (error) {
    console.error(error);
    mostrarEstado(`No se pudo eliminar la publicación: ${error.message}`, 'error');
  }
}

document.getElementById('btnListar').addEventListener('click', listarPublicaciones);
document.getElementById('btnBuscarId').addEventListener('click', buscarPublicacionPorId);
document.getElementById('btnFiltrarUsuario').addEventListener('click', filtrarPorUsuario);
document.getElementById('btnEliminar').addEventListener('click', eliminarPublicacion);
document.getElementById('formCrear').addEventListener('submit', crearPublicacion);
document.getElementById('formActualizar').addEventListener('submit', actualizarTitulo);

listarPublicaciones();
