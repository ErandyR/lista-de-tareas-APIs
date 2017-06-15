
var api = {
    url: 'https://lab-api-test.herokuapp.com/tasks/'
};


var cargarPagina = function () {
    cargarTareas();
    $("#add-form").submit(agregarTarea);
    $(document).on("click", ".mostrarDetalles", mostrarDetalles);
    $(document).on("click", ".removerTarea", removerTarea);
}

 var $tasksList = $("#tasks-list");

var plantillaInicial = 
            '<tr data-id="__id__">' +
                '<td>__nombreTarea__</td>' +
                '<td>__estadoTarea__</td>' +
                '<td>' +
                    '<span class="glyphicon glyphicon-zoom-in mostrarDetalles" data-toggle="modal" data-target="#modalDetalle"></span>' + 
                    '<span class="glyphicon glyphicon-pencil"></span>' +
                    '<span class="glyphicon glyphicon-remove-circle removerTarea"></span>' +
                '</td>' +
            '</tr>';

var plantillaModal = 
                    '<p>Id: __id__</p>' +
                    '<p>Fecha de Cración: __fecha__</p>'

var cargarTareas = function () {
    $.getJSON(api.url, function (tareas) {
        
        tareas.forEach(crearTarea);
    });
};

var crearTarea = function (tarea) {
            var nombre = tarea.name;
            var estado = tarea.status[0];
            var idTarea = tarea._id;
            console.log(nombre + " " + estado);
            //creamos la fila
    
    
            $tasksList.append(
                plantillaInicial.replace('__nombreTarea__', nombre)
                .replace('__estadoTarea__', estado)
                .replace('__id__', idTarea)
            );
    
//            var $tr = $("<tr />"); 
//            //creamos la celda del nombre
//            var $nombreTd = $("<td />");
//            $nombreTd.text(nombre);
//            //creamos la celda del estado
//            var $estadoTd = $("<td />");
//            $estadoTd.text(estado);
//            //agregamos las celdas a la fila
//            $tr.append($nombreTd);
//            $tr.append($estadoTd);
//            //agregamos filas a la tabla
//            $tasksList.append($tr);
};

var agregarTarea = function (e) {
    e.preventDefault();
    var nombre = $("#nombre-tarea").val();
    $.post(api.url, {
        name: nombre      
    }, function (tarea) {
        crearTarea(tarea);
        $("#mymodal").modal("hide");
    });
};


var mostrarDetalles = function () {
//    console.log($(this).parents("tr").data("id"));
    $.getJSON(api.url + $(this).parents("tr").data("id"), function (tarea) {
         var idTarea = tarea._id;
         var fechaCreacion = tarea.created_at;
//         console.log(idTarea + " " + fechaCreacion);
         var $modalDetalle = $(".modalBody");
         $modalDetalle.append(
         plantillaModal.replace('__id__', idTarea)
                .replace('__fecha__', fechaCreacion)
         );
         });
    };


    

var removerTarea = function () {
    alert("remover");
};

$(document).ready(cargarPagina);
