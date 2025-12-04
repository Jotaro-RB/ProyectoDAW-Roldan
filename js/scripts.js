// Objeto global para almacenar los datos del formulario
const datos = {
    nombre: "",
    email: "",
    mensaje: "",
};

// 1. Seleccionar los elementos del DOM (Inputs y Formulario)
const nombre = document.querySelector("#nombre");
const email = document.querySelector("#email");
const mensaje = document.querySelector("#mensaje");
const formulario = document.querySelector(".formulario");

// 2. Asignar Eventos a los Inputs
nombre.addEventListener("input", leerTexto);
email.addEventListener("input", leerTexto);
mensaje.addEventListener("input", leerTexto);

// 3. Función para leer y guardar los datos
function leerTexto(e) {
    datos[e.target.id] = e.target.value;
}

// 4. Evento de Submit del Formulario
formulario.addEventListener("submit", function (evento) {
    evento.preventDefault(); // Detenemos la acción por defecto para validar primero

    const { nombre, email, mensaje } = datos; 

    // A. Validar el formulario (Comprobar campos vacíos)
    if (nombre === "" || email === "" || mensaje === "") {
        // Si hay campos vacíos, muestra el mensaje de error y corta la ejecución
        mostrarMensajeAlerta("Todos los campos son obligatorios", true); 
        return; 
    }

    // B. Si la validación es correcta:

    // 1. Muestra un mensaje de OK
    mostrarMensajeAlerta("Formulario enviado correctamente", false); 
    
    // 2. Espera un momento (1.5s) y luego permite el envío real del formulario.
    // ESTO PROVOCARÁ EL REDIRECCIONAMIENTO A LA PÁGINA DE CONFIRMACIÓN POR DEFECTO DE FORMSUBMIT.
    setTimeout(() => {
        // Deshabilitamos el event.preventDefault() forzando el envío
        evento.target.submit(); 
    }, 1500); 
});

// 5. Funciones para crear y mostrar los mensajes de alerta
function mostrarMensajeAlerta(mensaje, esError = true) {
    // 1. Limpiar mensajes anteriores
    const alertaPrevia = document.querySelector(".alerta-formulario");
    if (alertaPrevia) {
        alertaPrevia.remove();
    }
    
    // 2. Crear el elemento P
    const alerta = document.createElement("P");
    alerta.textContent = mensaje;
    alerta.classList.add("alerta-formulario"); 

    // 3. Añadir la clase específica (error o correcto)
    if (esError) {
        alerta.classList.add("error");
    } else {
        alerta.classList.add("correcto");
    }
    
    // 4. Insertar la alerta en el DOM
    const enviarContenedor = document.querySelector(".enviar-contenedor");
    enviarContenedor.appendChild(alerta);

    // 5. Desaparecer el error después de 5 segundos
    if (esError) {
        setTimeout(() => {
            alerta.remove();
        }, 5000);
    }
    // NOTA: El mensaje "correcto" se mantiene hasta que la página se redirige (1.5s)
}