var errores=[];
$(window).load(function(){asignarEventos();});

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

$( "#dialog1" ).dialog({
    autoOpen: false,
    width: 400,
    modal: true,
    hide: { effect: "drop", duration: 1000 },
    show: { effect: "fold", duration: 500 },
    
});

$(".calendario").datepicker({altField : "#txtCalendarioAlternativo",
                            altFormat : $.datepicker.ATOM,
                            dateFormat : "yy'-'mm'-'dd",
                            changeYear: true,
                            changeMonth: true,
                            defaultDate: "-1m",
                            minDate: "-1y",
                            showAnim: "fadeIn",
                            });

function funcionAceptar(id){
    alert(id);
}

function asignarEventos(){
    cargarFormularios();
}

/*----MOSTRAR FORMULARIOS Y LISTADOS----*/
function cargarFormularios(){
    /*CLIENTE*/
    $("#altaCliente").click(function(){
        $(".bloque:not('#form-alta-clientes')").hide("normal");
        if($("#form-alta-clientes").size()==0){
            $("<div>").appendTo("#formularios").load("html/altaCliente.html",function(){
                $("#btnAltaCliente").on('click', validarCliente);
            });
        }
        else{
            $("#form-alta-clientes").show("normal");
        }
    });
    $("#editaClientes").click(function(){
	$(".bloque:not('#form-edita-clientes')").hide("normal");
	if($("#form-edita-clientes").size()==0){
            $("<div>").appendTo("#formularios").load("html/editaCliente.html",function(){
                cargarSelectClientes();
                $("#btnAceptarCliente").on('click', editarCliente);
            });
	}
	else{
            $("#form-edita-clientes").show("normal");
	}
    });	
    $("#listaClientes").click(function(){
	$(".bloque:not('#listadoClientes')").hide("normal");
	if($("#listadoClientes").size()==0){
            $("<div>").appendTo("#formularios").load("html/listaClientes.html",function(){pedirListaClientes();});
	}
	else{
            $("#listadoClientes").show("normal");
	}
    });
    /*CITA*/
    $("#altaCita").click(function(){
	$(".bloque:not('#form-alta-citas')").hide("normal");
	if($("#form-alta-citas").size()==0){
            $("<div>").appendTo("#formularios").load("html/altaCita.html",function(){
                cargarSelectClientes();
                cargarSelectDentistas(); 
                cargarSelectPagos();
                $(".calendario").datepicker({altField : "#txtCalendarioAlternativo",
                            altFormat : $.datepicker.ATOM,
                            dateFormat : "yy'-'mm'-'dd",
                            changeYear: true,
                            changeMonth: true,
                            defaultDate: "-1m",
                            minDate: "-1y",
                            showAnim: "fadeIn",
                            });
            });
	}
	else{
            $("#form-alta-citas").show("normal");
	}
    });
    $("#editaCitas").click(function(){
	$(".bloque:not('#form-edita-citas')").hide("normal");
	if($("#form-edita-citas").size()==0){
            $("<div>").appendTo("#formularios").load("html/editaCita.html",function(){});
	}
	else{
            $("#form-edita-citas").show("normal");
	}
    });
    $("#listaCitas").click(function(){
	$(".bloque:not('#listadoCitas')").hide("normal");
	if($("#listadoCitas").size()==0){
            $("<div>").appendTo("#formularios").load("html/listaCitas.html",function(){pedirListaCitas();});
	}
	else{
            $("#listadoCitas").show("normal");
	}
    });
    /*PAGO*/
    $("#altaPago").click(function(){
	$(".bloque:not('#form-alta-pagos')").hide("normal");
	if($("#form-alta-pagos").size()==0){
            $("<div>").appendTo("#formularios").load("html/altaPago.html",function(){
                cargarSelectClientes();
                $(".calendario").datepicker({altField : "#txtCalendarioAlternativo",
                            altFormat : $.datepicker.ATOM,
                            dateFormat : "yy'-'mm'-'dd",
                            changeYear: true,
                            changeMonth: true,
                            defaultDate: "-1m",
                            minDate: "-1y",
                            showAnim: "fadeIn",
                            });
            });
	}
	else{
            $("#form-alta-pagos").show("normal");
	}
    });
    $("#editaPagos").click(function(){
	$(".bloque:not('#form-edita-pagos')").hide("normal");
	if($("#form-edita-pagos").size()==0){
            $("<div>").appendTo("#formularios").load("html/editaPago.html",function(){ 
                cargarSelectPagos();
            });
	}
	else{
            $("#form-edita-pagos").show("normal");
	}
    });
    $("#listaPagos").click(function(){
	$(".bloque:not('#listadoPagos')").hide("normal");
	if($("#listadoPagos").size()==0){
            $("<div>").appendTo("#formularios").load("html/listaPagos.html",function(){pedirListaPagos();});
	}
	else{
            $("#listadoPagos").show("normal");
	}
    });
    /*DENTISTAS*/
    $("#listaDentistas").click(function(){
	$(".bloque:not('#listadoDentistas')").hide("normal");
	if($("#listadoDentistas").size()==0){
            $("<div>").appendTo("#formularios").load("html/listaDentistas.html",function(){pedirListaDentistas();});
	}
	else{
            $("#listadoDentistas").show("normal");
	}
    });
}

/*----CLIENTES----*/
function dialogo(texto,titulo){
    $( "#dialog" ).dialog('option', 'title', titulo);
    $( "#dialog" ).html(texto);
    $( "#dialog" ).dialog( "open" );
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
        limpiaCampos();
    }
    return bValido;
}

function editarCliente(evento){
	
	evento.preventDefault();
	var opcion=$("#form-edita-clientes input[type='radio']:checked").val();
	var oSelect=$("#editaCliente option:selected");
	
	if(oSelect.index()==0){
		
		dialogo("Error: seleccione un cliente","Edita cliente");
	}
	
	if(opcion==1){
	
	}
	else{
		
		$.get('php/getClientes.php',null,getBorrarClientes,'json');
	}
}

function getBorrarClientes(oArrayClientes){
	
	var texto="";
	var titulo="Borrar cliente";
	var codigo="";
	
	$.each(oArrayClientes, function( i , elemento){
		
		if($("#editaCliente option:selected").val()==elemento.id){
			
			codigo=elemento.id;
			texto='<p>Cliente borrado</p><p>ID: ' + elemento.id + '</p><p>Nombre: ' +  elemento.nombre+"</p><p>Apellidos: "+ elemento.apellidos + '</p><p>Teléfono: '+ elemento.telefono + '</p>';
        }   
    });
	
	$.post("php/borrarClientes.php",{id:codigo},tratarRespuestaPOSTBorrarCliente);
	
	dialogo(texto,titulo);
}

function tratarRespuestaPOSTBorrarCliente(){
    cargarSelectClientes();
}

function cargarSelectClientes(){
    //$.ajax({cache:false});
    $.get('php/getClientes.php',"rand="+Date.now(),tratarGetClientes,'json');
}

function tratarGetClientes(oArrayClientes){

    $(".selectCliente").empty();
    
    $('<option value="" >--seleccione un cliente--</option>').appendTo(".selectCliente");
	
	if(typeof oArrayClientes != "undefined"){
	
		$.each(oArrayClientes, function( i , elemento){

			$('<option value="' + elemento.id + '" >' +  elemento.apellidos+", "+ elemento.nombre + '</option>').appendTo(".selectCliente");
				
		});
	}
}

function cargarSelectDentistas(){
	
	$.get('php/getDentistas.php',"rand="+Date.now(),tratarGetDentistas,'json');
}

function tratarGetDentistas(oArrayDentistas){

    $("#dentistaCita").empty();
    
    $('<option value="" >--seleccione un dentista--</option>').appendTo("#dentistaCita");
	
	if(typeof oArrayDentistas != "undefined"){
	
		$.each(oArrayDentistas, function( i , elemento){

			$('<option value="' + elemento.id + '" >' +  elemento.apellidos+", "+ elemento.nombre + '</option>').appendTo("#dentistaCita");
				
		});
	}
}

function cargarSelectPagos(){
	
    $.get('php/getPagos.php',"rand="+Date.now(),tratarGetPagos,'xml');
}

function tratarGetPagos(xml){

    $(".selectPago").empty();
    
    $('<option value="" >--seleccione un pago--</option>').appendTo(".selectPago");
	
	var pago=$(xml).find("pago");
        
        pago.each(function(){
            
            var id=$(this).find("id").text();
            var fecha=$(this).find("fecha").text();
            var apellidos=$(this).find("apellidos").text();
            var nombre=$(this).find("nombre").text();
            
            $('<option value="' + id + '" >' + fecha + " - "+ apellidos + ", " + nombre + '</option>').appendTo(".selectPago");
        });
}

function pedirListaClientes(){
    $.getScript('js/listaClientes.js',function(){
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
function pedirListaDentistas(){
    
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

/*----LIMPIA CAMPOS----*/
function limpiaCampos(){
    $("input:text").val("");
    $("textarea").val("");
    $("option:nth-child(1)").prop("selected",true);
    $("input:checkbox").prop("checked",false);
    $("input:radio[value='1']").prop("checked",true);
    $("input:radio[value='2']").prop("checked",false);
}