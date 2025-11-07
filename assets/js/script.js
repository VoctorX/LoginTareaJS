document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('userName').textContent = loggedInUser.name;

    document.getElementById('logoutButton').addEventListener('click', () => {
        sessionStorage.removeItem('loggedInUser');
        window.location.href = 'index.html';
    });
});


var lista = document.getElementById("lista");

function agregarTarea() {
    let tareaTexto = document.getElementById("tarea").value;
    if (tareaTexto.trim() === "") {
        alert("Por favor, escribe una tarea.");
        return;
    }

    let imgURL = prompt("Pega la URL de la imagen para esta tarea (o deja vacío para usar una por defecto):");
    if (imgURL === "" || imgURL === null) imgURL = "assets/img/emoji.jpg";

    let li = document.createElement("li");
    li.className = "task-item flex items-center justify-between bg-slate-700 p-3 rounded-lg transition-opacity duration-300";
    li.dataset.status = 'por-hacer';

    li.innerHTML = `
        <div class="flex items-center flex-1 min-w-0">
            <img src="${imgURL}" class="w-12 h-12 object-cover rounded-md mr-4 flex-shrink-0">
            <div class="status-indicator w-3 h-3 bg-red-600 rounded-full mr-3 flex-shrink-0"></div>
            <span class="task-text flex-1 text-slate-200 text-left truncate">${tareaTexto}</span>
        </div>
        <div class="flex items-center gap-3 ml-4">
            <select onchange="cambiarEstado(this)" class="bg-slate-600 border border-slate-500 text-xs rounded p-1 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                <option value="por-hacer" selected>Por Hacer</option>
                <option value="en-proceso">En Proceso</option>
                <option value="acabada">Acabada</option>
            </select>
            <button class="text-sky-400 hover:text-sky-300 transition-colors" onclick="editarTarea(this)"><i class="fa-solid fa-pencil"></i></button> 
            <button class="text-yellow-400 hover:text-yellow-300 transition-colors" onclick="cambColor(this)"><i class="fa-solid fa-palette"></i></button>
            <button class="text-red-500 hover:text-red-400 transition-colors" onclick="eliminarTarea(this)"><i class="fa-solid fa-trash"></i></button>
        </div>
    `;
    
    lista.appendChild(li);
    document.getElementById("tarea").value = "";
}

function cambiarEstado(selectElement) {
    const li = selectElement.closest('.task-item');
    const nuevoEstado = selectElement.value;

    li.dataset.status = nuevoEstado;

    const indicator = li.querySelector('.status-indicator');
    const taskText = li.querySelector('.task-text');

    indicator.className = 'status-indicator w-3 h-3 rounded-full mr-3 flex-shrink-0'; 
    li.classList.remove('opacity-50');
    taskText.classList.remove('line-through');

    if (nuevoEstado === 'por-hacer') {
        indicator.classList.add('bg-red-600'); 
    } else if (nuevoEstado === 'en-proceso') {
        indicator.classList.add('bg-amber-400');
    } else if (nuevoEstado === 'acabada') {
        indicator.classList.add('bg-green-500'); 
        li.classList.add('opacity-50'); 
        taskText.classList.add('line-through'); 
    }
}

function eliminarTarea(boton) {
    let li = boton.parentElement.parentElement; 
    li.remove();
}

function cambColor(boton) {
    let li = boton.parentElement.parentElement; 
    let color = prompt("Digita un color (nombre o código HEX):");
    if (color) li.style.backgroundColor = color;
}
function editarTarea(boton) {
    let li = boton.parentElement.parentElement;
    let span = li.querySelector("span");
    let nuevoTxt= prompt("Editar la tarea: ", span.textContent);

    if (nuevoTxt !== null && nuevoTxt.trim() !==""){
        span.textContent= nuevoTxt;
    }
}