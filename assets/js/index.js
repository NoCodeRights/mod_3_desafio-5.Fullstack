let idTarea =4; // el IdTarea se inicia en 4 porque las primeras 3 tareas se ingresan manualmente
//lo que hace que la primera tarea nueva comience con el ID 4

const tareas = [ //se declaran las 3 primeras tareas como parte de los requerimientos de la tarea
    {
        id: 1,
        descripcion: 'Hacer mercado',
        completado: false
    },

    {
        id:2,
        descripcion: 'Estudiar para la prueba',
        completado: false
    },

    {
        id:3,
        descripcion: 'Sacar a pasear a Tobby',
        completado: false
    }
]

const agregarTarea = function() { //función para agregar nueva tarea
    const nuevoTexto = document.querySelector('#nuevaTarea').value;
    const objetoTarea = {
        id:idTarea,
        descripcion:nuevoTexto,
        completado:false
    }

    const invalido = document.querySelector('#invalido'); //se guarda el mensaje de error para manipularlo si es necesario

    if (nuevoTexto !==''){ 
        invalido.innerHTML =''; //se limpia el mensaje de error para que no se muestre si estamos creando una tarea
        tareas.push(objetoTarea); //se agrega el objeto
        idTarea++; //el contador de idTarea se incrementa aquí
        document.querySelector('#nuevaTarea').value=''; //se limpia el texto del input
        renderizarDatos(); //se muestra la lista con el nuevo objeto agregado
    } else{
        invalido.innerHTML = 'Tarea no puede estar en blanco'; //mensaje de error si el texto del input está en blanco
        invalido.style.color = 'red';
    }
}

const eliminarElementoPorId = function (id){ //función para eliminar elemento del arreglo
    const posicion = tareas.findIndex((obj) =>{
        if (id===obj.id){
            return true;
        }
        return false;
    });
    tareas.splice(posicion,1);
    renderizarDatos(); //muestra la lista ahora con el elemento ya eliminado
}

const checkRealizada = function(id){ //función que guarda si una tarea tiene el check de completada
    const posicion = tareas.findIndex((obj) =>{
        if (id===obj.id){
            return true;
        }
        return false;
    });
    tareas[posicion].completado = !tareas[posicion].completado;
    renderizarDatos();
}

const renderizarDatos = function(){ //función que muestra los datos en pantalla
    const lista = document.querySelector('#tareas');
    const totalTareas = document.querySelector('#total');
    const totalRealizadas = document.querySelector('#realizadas');
    let html = '';
    let numeroRealizadas = 0;

    for (const tarea of tareas) {
        let realizado = '';
        if (tarea.completado){
            chequeado = 'checked';
            realizado = '<- Realizado';
            numeroRealizadas++;
        } else{
            chequeado = '';
        }

        html+= `
            <div class="presentacion">
                <div class="textID">
                    ${tarea.id}
                </div>
                <div class="textDescripcion">
                    ${tarea.descripcion} ${realizado}
                </div>
                <div class="textCheck">
                    <input onclick = "checkRealizada(${tarea.id})" type = "checkbox" ${chequeado}>
                </div>
                <div class="textEliminar">
                    <button onclick="eliminarElementoPorId(${tarea.id})" class = "btn-elimina">X</button>
                </div>
            </div>
        `;
    }

    total = tareas.length;
    totalTareas.innerHTML = `Total: ${total}`;
    lista.innerHTML = html;
    totalRealizadas.innerHTML =`Realizadas: ${numeroRealizadas}`;

}

renderizarDatos(); //ésta linea se carga una vez al iniciar la página y nos muestra las tareas que ya existen