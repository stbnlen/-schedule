let nombre = document.querySelector('.nombre');
let numero = document.querySelector('.numero');
let direccion = document.querySelector('.direccion');
const btnAgregarTarea = document.querySelector('.btn-agregar-tarea');

const listadoTareas = document.querySelector('.listado-tareas');

const db = window.localStorage;

btnAgregarTarea.addEventListener('click', () => {
  const contacto = {
    id: Math.random(1, 100),
    nombre: nombre.value,
    numero: numero.value,
    direccion: direccion.value,
  };
  guardarContacto(db, contacto);
  nombre.value = '';
  numero.value = '';
  direccion.value = '';
});

const guardarContacto = (db, contacto) => {
  db.setItem(contacto.id, JSON.stringify(contacto));
};

const cargarContactos = (db, parentNode) => {
  let claves = Object.keys(db);
  // console.log(claves);
  for (clave of claves) {
    let contacto = JSON.parse(db.getItem(clave));
    crearContacto(parentNode, contacto, db);
  }
};

const crearContacto = (parentNode, contacto, db) => {
  // TODO: Rehacer con template string
  const divContacto = document.createElement('div');
  const nombreContacto = document.createElement('h3');
  const numeroContacto = document.createElement('p');
  const direccionContacto = document.createElement('p');
  const iconoBorrar = document.createElement('span');

  nombreContacto.innerHTML = contacto.nombre;
  numeroContacto.innerHTML = contacto.numero;
  direccionContacto.innerHTML = contacto.direccion;
  iconoBorrar.innerHTML = 'delete_forever';

  iconoBorrar.addEventListener('click', () => {
    db.removeItem(contacto.id);
    window.location.href = '/';
  });

  divContacto.classList.add('tarea');
  iconoBorrar.classList.add('material-icons', 'icon');

  divContacto.appendChild(nombreContacto);
  divContacto.appendChild(numeroContacto);
  divContacto.appendChild(direccionContacto);
  divContacto.appendChild(iconoBorrar);

  parentNode.appendChild(divContacto);
};

cargarContactos(db, listadoTareas);
