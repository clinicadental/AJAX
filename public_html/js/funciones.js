var errores=[];
$( "#dialog" ).dialog({
    autoOpen: false,
    width: 400,
    modal: true,
    hide: { effect: "drop", duration: 1000 },
    show: { effect: "fold", duration: 500 },
    buttons: [
        {
            text: "Aceptar",
            click: function() {
                    $( this ).dialog( "close" );
            }
        },
        {
            text: "Cancel",
            click: function() {
                    $( this ).dialog( "close" );
            }
        }
    ]
});

$(window).load(function(){cargarFormularios();});
/*function cargarFormularios(){
    $("#altaCliente").click(function(){
	$(".bloque:not('#form-alta-clientes')").hide("normal");
	if($("#form-alta-clientes").size()==0){
            $("<div>").appendTo("#contenido").load("html/altaCliente.html",function(){$.getScript("js/altaCliente.js");});
	}
	else{
            $("#form-alta-clientes").show("normal");
	}
    });
    $("#editaClientes").click(function(){
	$(".bloque:not('#form-edita-clientes')").hide("normal");
	if($("#form-edita-clientes").size()==0){
            $("<div>").appendTo("#contenido").load("html/editaCliente.html",function(){$.getScript("js/editaCliente.js");});
	}
	else{
            $("#form-edita-clientes").show("normal");
	}
    });
    $("#listaClientes").click(function(){
	$(".bloque:not('#listadoClientes')").hide("normal");
	if($("#listadoClientes").size()==0){
            $("<div>").appendTo("#contenido").load("html/listaClientes.html",function(){$.getScript("js/listaClientes.js");});
	}
	else{
            $("#listadoClientes").show("normal");
	}
    });


    $("#altaCita").click(function(){
	$(".bloque:not('#form-alta-citas')").hide("normal");
	if($("#form-alta-citas").size()==0){
            $("<div>").appendTo("#contenido").load("html/altaCita.html",function(){$.getScript("js/altaCita.js");});
	}
	else{
            $("#form-alta-citas").show("normal");
	}
    });
    $("#editaCitas").click(function(){
	$(".bloque:not('#form-edita-citas')").hide("normal");
	if($("#form-edita-citas").size()==0){
            $("<div>").appendTo("#contenido").load("html/editaCita.html",function(){$.getScript("js/editaCita.js");});
	}
	else{
            $("#form-edita-citas").show("normal");
	}
    });
    $("#listaCitas").click(function(){
	$(".bloque:not('#listadoCitas')").hide("normal");
	if($("#listadoCitas").size()==0){
            $("<div>").appendTo("#contenido").load("html/listaCitas.html",function(){$.getScript("js/listaCitas.js");});
	}
	else{
            $("#listadoCitas").show("normal");
	}
    });

    
    $("#altaPago").click(function(){
	$(".bloque:not('#form-alta-pagos')").hide("normal");
	if($("#form-alta-pagos").size()==0){
            $("<div>").appendTo("#contenido").load("html/altaPago.html",function(){$.getScript("js/altaPago.js");});
	}
	else{
            $("#form-alta-pagos").show("normal");
	}
    });
    $("#editaPagos").click(function(){
	$(".bloque:not('#form-edita-pagos')").hide("normal");
	if($("#form-edita-pagos").size()==0){
            $("<div>").appendTo("#contenido").load("html/editaPago.html",function(){$.getScript("js/editaPago.js");});
	}
	else{
            $("#form-edita-pagos").show("normal");
	}
    });
    $("#listaPagos").click(function(){
	$(".bloque:not('#listadoPagos')").hide("normal");
	if($("#listadoPagos").size()==0){
            $("<div>").appendTo("#contenido").load("html/listaPagos.html",function(){$.getScript("js/listaPagos.js");});
	}
	else{
            $("#listadoPagos").show("normal");
	}
    });
    
    
    $("#listaDentistas").click(function(){
	$(".bloque:not('#listadoDentistas')").hide("normal");
	if($("#listadoDentistas").size()==0){
            $("<div>").appendTo("#contenido").load("html/listaDentistas.html",function(){$.getScript("js/listaDentistas.js");});
	}
	else{
            $("#listadoDentistas").show("normal");
	}
    });
}*/

function cargarFormularios(){
    var oFormCliente=$("#btnAltaCliente");
    oFormCliente.on('click', validarCliente);
}
function ocultarTodo(){
    $(".bloque").css("display","none");
}
function mostrarFormAltaCliente(){
    ocultarTodo();
    $("#form-alta-clientes").css("display","block");
}
function mostrarFormEditaCliente(){
    ocultarTodo();
    $("#form-edita-clientes").css("display","block");
    cargarSelectClientes();
}
function mostrarListadoClientes(){
    ocultarTodo();
    $("#listadoClientes").css("display","block");
    pedirListaClientes();
}
function mostrarFormAltaCita(){
    ocultarTodo();
    $("#form-alta-citas").css("display","block");
    cargarSelectClientes();
}
function mostrarFormEditaCita(){
    ocultarTodo();
    $("#form-edita-citas").css("display","block");
}
function mostrarListadoCitas(){
    ocultarTodo();
    $("#listadoCitas").css("display","block");
    pedirListaCitas();
}
function mostrarFormAltaPago(){
    ocultarTodo();
    $("#form-alta-pagos").css("display","block");
    cargarSelectClientes();
}
function mostrarFormEditaPago(){
    ocultarTodo();
    $("#form-edita-pagos").css("display","block");
}
function mostrarListadoPagos(){
    ocultarTodo();
    $("#listadoPagos").css("display","block");
    pedirListaPagos();
}
function mostrarListadoDentistas(){
    ocultarTodo();
    $("#listadoDentistas").css("display","block");
    listarDentistas();
}

function dialogo(texto,titulo){
    
    $( "#dialog" ).dialog('option', 'title', titulo);
    $( "#dialog p" ).text(texto);
    $( "#dialog" ).dialog( "open" );
    event.preventDefault();
}

function validarCliente(evento){
    var oEvento = evento || window.event;  
    oEvento.preventDefault();
    if(validarCamposTextoCliente()){
       return true;
    }
    else{
        
       var sErrores="";
       
       for(var i=0;i<errores.length;i++){
           
           sErrores+=errores[i]+" \n";
       }
       
       dialogo("Errores: "+sErrores,"Alta cliente");
       return false;
    } 
}

function validarCamposTextoCliente(){
    var sId=$('#idCliente').val();
    var sNombre=$('#nombreCliente').val();
    var sApellidos=$('#apellidosCliente').val();
    var iTelefono=$('#telefonoCliente').val();
    var bValido=true;
    var patronId=/(^[A-Z]{1})([0-9]{5}$)/;
    var patronCadena=/[a-zA-Z]+\s?/;
    var patronTelef=/^([0-9]{2,3})?(-|\s)?[0-9]{6,7}$/;
    errores=[];
    
    if(!patronId.test(sId)){
        $("#bloqueIdCliente").addClass("has-error");
        bValido=false;
        errores.push("ID incorrecto");
    }
    else{
        
        if($("#bloqueIdCliente").hasClass("has-error")){
           $("#bloqueIdCliente").removeClass("has-error"); 
        }
    }
    if(!patronCadena.test(sNombre)){   
        $("#bloqueNombreCliente").addClass("has-error");
        bValido=false;
        errores.push("Nombre incorrecto");
    }
    else{
        if($("#bloqueNombreCliente").hasClass("has-error")){
           $("#bloqueNombreCliente").removeClass("has-error"); 
        }
    }
    if(!patronCadena.test(sApellidos)){   
        $("#bloqueApellidosCliente").addClass("has-error");;
        bValido=false;
        errores.push("Apellidos incorrectos");
    }
    else{
        if($("#bloqueApellidosCliente").hasClass("has-error")){
           $("#bloqueApellidosCliente").removeClass("has-error"); 
        }
    }
    if(!patronTelef.test(iTelefono)){   
        $("#bloqueTelefonoCliente").addClass("has-error");;
        bValido=false;
        errores.push("Teléfono incorrecto");
    }
    else{
        if($("#bloqueTelefonoCliente").hasClass("has-error")){
           $("#bloqueTelefonoCliente").removeClass("has-error"); 
        }
    }
    if(bValido){
        altaCliente(sId,sNombre,sApellidos,iTelefono);
        //limpiaCampos();  
    }
    return bValido;
}

function cargarSelectClientes(){
    
    $.get('php/getClientes.php',null,tratarGetClientes,'json');
}

function tratarGetClientes(oArrayClientes){

    $(".selectCliente").empty();
    
    $('<option value="" >--seleccione un cliente--</option>').appendTo(".selectCliente");

    $.each(oArrayClientes, function( i , elemento){

            $('<option value="' + elemento.id + '" >' +  elemento.apellidos+", "+ elemento.nombre + '</option>').appendTo(".selectCliente");
            
    });

}
function pedirListaClientes(){
    
    $.getScript('js/listaClientes.js', function() {
        listarClientes();
    });
}

/*----CITAS----*/
function pedirListaCitas(){
    $.getScript('js/listaCitas.js',function(){
        listarCitas();
    });
}

/*----PAGOS----*/
function pedirListaPagos(){
    $.getScript('js/listaPagos.js',function(){
        listarPagos();
    });
}

/*----DENTISTAS----*/
function listarDentistas(){
    
    $("#listadoDentistas .indicador").show();
    
    $.ajax({
    // la URL para la petición
    url : 'php/datosdentistas.php',
 
    // la información a enviar
    // (también es posible utilizar una cadena de datos)
    data : null,
 
    // especifica si será una petición POST o GET
    type : 'GET',
 
    // el tipo de información que se espera de respuesta
    dataType : 'html',
 
    // código a ejecutar si la petición es satisfactoria;
    // la respuesta es pasada como argumento a la función
    success : function(oListaDentistas){
        
        $("#listadoDentistas .indicador").hide();
        
        var texto = "<table class='table'><tr><th>ID</th><th>NOMBRE</th><th>APELLIDOS</th><th>NÚM. COLEGIADO</th><th>FECHA ALTA</th></tr>";
 
        texto +=oListaDentistas;
        
        $("#listadoDentistas .resultados").html(texto);
    }
 
    // código a ejecutar si la petición falla;
    // son pasados como argumentos a la función
    // el objeto de la petición en crudo y código de estatus de la petición
    /*error : function(xhr, status) {
        alert('Disculpe, existió un problema');
    },
 
    // código a ejecutar sin importar si la petición falló o no
    complete : function(xhr, status) {
        alert('Petición realizada');
    }*/
});
}

/*function tratarListaDentistas(oListaDentistas){
    
        
        var texto = "<table class='table'><tr><th>ID</th><th>NOMBRE</th><th>APELLIDOS</th><th>Núm. colegiado</th><th>Fecha alta</th></tr>";
        // Hacemos un bucle para recorrer todos los objetos literales recibidos en el array         resultados y mostrar su contenido.
 
            texto +=oArrayDentistas;
        
        
        $("#listadoDentistas").html(texto);
    }
}*/