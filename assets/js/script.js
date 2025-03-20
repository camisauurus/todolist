let tareas = [
    { id: 1, descripcion: "Hacer la cama", realizada: false },
    { id: 2, descripcion: "Estudiar", realizada: false },
    { id: 3, descripcion: "Hacer ejercicio", realizada: false }
];

document.getElementById("agregar-tarea").addEventListener("click", function () {
    let input = document.getElementById("nueva-tarea");
    let descripcion = input.value.trim();
    
    if (descripcion !== "") {
        let nuevaTarea = {
            id: Date.now(),
            descripcion: descripcion,
            realizada: false
        };

        tareas.push(nuevaTarea);
        input.value = "";
        actualizarLista();
    }
});

function actualizarLista() {
    let tabla = document.getElementById("lista-tareas");
    tabla.innerHTML = "";

    tareas.forEach((tarea) => {
        let fila = document.createElement("tr");

        // Checkbox para marcar como completada
        let celdaCheckbox = document.createElement("td");
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tarea.realizada;
        checkbox.addEventListener("change", function () {
            tarea.realizada = checkbox.checked;
            actualizarLista();
        });

        celdaCheckbox.appendChild(checkbox);

        // Celda con la descripción
        let celdaDescripcion = document.createElement("td");
        celdaDescripcion.textContent = tarea.descripcion;
        if (tarea.realizada) {
            celdaDescripcion.style.textDecoration = "line-through";
        }

        // Botón para eliminar la tarea
        let botonEliminar = document.createElement("button");
        botonEliminar.innerHTML = "❌";
        botonEliminar.addEventListener("click", function () {
            tareas = tareas.filter((t) => t.id !== tarea.id);
            actualizarLista();
        });

        fila.appendChild(celdaCheckbox);
        fila.appendChild(celdaDescripcion);
        fila.appendChild(botonEliminar);
        tabla.appendChild(fila);
    });

    actualizarResumen();
}

function actualizarResumen() {
    let total = tareas.length;
    let completadas = tareas.filter(t => t.realizada).length;

    document.getElementById("contador-tareas").textContent = `Total: ${total}`;
    document.getElementById("contador-completadas").textContent = `Completadas: ${completadas}`;
}

document.addEventListener("DOMContentLoaded", () => {
    actualizarLista();
});

