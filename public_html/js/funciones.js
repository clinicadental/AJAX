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
    show: { effect: "fold", duration: 500 }
    
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
            cargarSelectClientes();
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
                $("#btnAltaCita").on('click',validarCita);
            });
	}
	else{
            $("#form-alta-citas").show("normal");
            cargarSelectClientes();
            cargarSelectDentistas(); 
            cargarSelectPagos();
	}
    });
    $("#editaCitas").click(function(){
	$(".bloque:not('#form-edita-citas')").hide("normal");
	if($("#form-edita-citas").size()==0){
            $("<div>").appendTo("#formularios").load("html/editaCita.html",function(){
                
                cargarSelectCitas();
                $("#btnAceptarCita").on('click',editarCita);
            });
            
	}
	else{
            $("#form-edita-citas").show("normal");
            cargarSelectCitas();
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
                $("#btnAltaPago").on('click',validarPago);
            });
	}
	else{
            $("#form-alta-pagos").show("normal");
            cargarSelectClientes();
	}
    });
    $("#editaPagos").click(function(){
	$(".bloque:not('#form-edita-pagos')").hide("normal");
	if($("#form-edita-pagos").size()==0){
            $("<div>").appendTo("#formularios").load("html/editaPago.html",function(){ 
                cargarSelectPagos();
                $("#btnAceptarPago").on('click',editarPago);
            });
	}
	else{
            $("#form-edita-pagos").show("normal");
            cargarSelectPagos();
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
       
       dialogo("Errores: "+sErrores,"Alta de Cliente");
       return false;
    } 
}

function validarCamposTextoCliente(){
    var sId=$('#idCliente').val();
    var sNombre=$('#nombreCliente').val();
    var sApellidos=$('#apellidosCliente').val();
    var iTelefono=$('#telefonoCliente').val();
    var bValido=true;
    var patronId=/^([A-Z]{1})([0-9]{5})$/;
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
	else{
            
            if(opcion==1){
            $("#dialogoEditaCliente").load("html/formCliente.html",function(){
                $("#dialogoEditaCliente").dialog();
                $.get('php/getClientes.php',null,getEditarClientes,'json');
            });
            }
            else{

                $.get('php/getClientes.php',null,getBorrarClientes,'json');
            }
        }
}

function getEditarClientes(oArrayClientes){
	
    $.each(oArrayClientes, function( i , elemento){
		
        if($("#editaCliente option:selected").val()==elemento.id){
			
            $("#idEditaCliente").val(elemento.id).text(elemento.id).attr("readonly","true");
            $("#nombreEditaCliente").val(elemento.nombre).text(elemento.nombre);
            $("#apellidosEditaCliente").val(elemento.apellidos).text(elemento.apellidos);
            $("#telefonoEditaCliente").val(elemento.telefono).text(elemento.telefono);
        }   
    });
    
    $("#btnAltaEditaCliente").on("click",validarEditarCliente);
    $("#btnCancelarEditaCliente").on("click",function(){$("#dialogoEditaCliente").dialog("close");});
}

function validarEditarCliente(evento){
    
    var oEvento = evento || window.event;  
    oEvento.preventDefault();
    if(validarCamposEditarCliente()){
       $("#dialogoEditaCliente").dialog("close");
       
       return true;
    }
    else{
        
       var sErrores="";
       
       for(var i=0;i<errores.length;i++){
           
           sErrores+=errores[i]+" \n";
       }
       
       dialogo("Errores: "+sErrores,"Alta de Cliente");
       return false;
    } 
}

function validarCamposEditarCliente(){
    
    var sId=$('#idEditaCliente').val();
    var sNombre=$('#nombreEditaCliente').val();
    var sApellidos=$('#apellidosEditaCliente').val();
    var iTelefono=$('#telefonoEditaCliente').val();
    var bValido=true;

    var patronCadena=/[a-zA-Z]+\s?/;
    var patronTelef=/^([0-9]{2,3})?(-|\s)?[0-9]{6,7}$/;
    errores=[];
    
   
    if(!patronCadena.test(sNombre)){   
        $("#bloqueNombreEditaCliente").addClass("has-error");
        bValido=false;
        errores.push("Nombre incorrecto");
    }
    else{
        if($("#bloqueNombreEditaCliente").hasClass("has-error")){
           $("#bloqueNombreEditaCliente").removeClass("has-error"); 
        }
    }
    if(!patronCadena.test(sApellidos)){   
        $("#bloqueApellidosEditaCliente").addClass("has-error");;
        bValido=false;
        errores.push("Apellidos incorrectos");
    }
    else{
        if($("#bloqueApellidosEditaCliente").hasClass("has-error")){
           $("#bloqueApellidosEditaCliente").removeClass("has-error"); 
        }
    }
    if(!patronTelef.test(iTelefono)){   
        $("#bloqueTelefonoEditaCliente").addClass("has-error");;
        bValido=false;
        errores.push("Teléfono incorrecto");
    }
    else{
        if($("#bloqueTelefonoEditaCliente").hasClass("has-error")){
           $("#bloqueTelefonoEditaCliente").removeClass("has-error"); 
        }
    }
    if(bValido){
        var oCliente=new Cliente(sId,sNombre,sApellidos,iTelefono);
        actualizaCliente(oCliente);
        limpiaCampos();
    }
    return bValido;
}

function actualizaCliente(oCliente){
    
    var sParametros= "datos=" + JSON.stringify(oCliente);

    // Codifico para envio
    sParametros = encodeURI(sParametros);
    
    $.ajax({

    url : 'php/actualizaCliente.php',

    data : sParametros,
 
    // especifica si será una petición POST o GET
    type : 'POST',
 
    // el tipo de información que se espera de respuesta
    dataType : 'text',
 
    // código a ejecutar si la petición es satisfactoria;
    // la respuesta es pasada como argumento a la función
    success : function(oRespuesta){
        
        
        dialogo("OK : " + oRespuesta,"Edita cliente");
        
    
    },
    
    complete: cargarSelectClientes
    });
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

function pedirListaClientes(){
    $.getScript('js/listaClientes.js',function(){
        listarClientes();
    });
}

/*----CITAS----*/

function validarCita(evento){
    var oEvento = evento || window.event;  
    oEvento.preventDefault();
    if(validarCamposTextoCita()){
       return true;
    }
    else{
        
       var sErrores="";
       
       for(var i=0;i<errores.length;i++){
           
           sErrores+=errores[i]+" \n";
       }
       
       dialogo("Errores: "+sErrores,"Alta de cita");
       return false;
    } 
}

function validarCamposTextoCita(){
    var sId=$('#idCita').val();
    var oCliente=$('#clienteCita option:selected').val();
    var oDentista=$('#dentistaCita option:selected').val();
    var oPago=$('#pagoCita option:selected').val();
    var dFecha=$('#fechaCita').val();
    var sProcedimiento=$("#procedimientoCita").val();
    var sDescripcion=$("#descripcionCita").val();
    var oSala=$('#salaCita option:selected').val();
    
    var bValido=true;
    var patronId=/^([A-Z]{1})([0-9]{5})$/;
    var patronCadena=/[a-zA-Z]+\s?/;
    errores=[];
    
    if(!patronId.test(sId)){
        $("#bloqueIdCita").addClass("has-error");
        bValido=false;
        errores.push("ID incorrecto");
    }
    else{
        if($("#bloqueIdCita").hasClass("has-error")){
           $("#bloqueIdCita").removeClass("has-error"); 
        }
    }
    if(oCliente==""){
        $("#bloqueClienteCita").addClass("has-error");
        bValido=false;
        errores.push("Cliente no seleccionado.");
    }
    else{
        if($("#bloqueClienteCita").hasClass("has-error")){
           $("#bloqueClienteCita").removeClass("has-error");
        }
    }
    if(oDentista==""){
        $("#bloqueDentistaCita").addClass("has-error");
        bValido=false;
        errores.push("Dentista no seleccionado.");
    }
    else{
        if($("#bloqueDentistaCita").hasClass("has-error")){
           $("#bloqueDentistaCita").removeClass("has-error");
        }
    }
    if(oPago==""){
        $("#bloquePagoCita").addClass("has-error");
        bValido=false;
        errores.push("Pago no seleccionado.");
    }
    else{
        if($("#bloquePagoCita").hasClass("has-error")){
           $("#bloquePagoCita").removeClass("has-error");
        }
    }
    if(dFecha==""){
        $("#bloqueFechaCita").addClass("has-error");
        bValido=false;
        errores.push("Fecha no seleccionada.");
    }
    else{
        if($("#bloqueFechaCita").hasClass("has-error")){
           $("#bloqueFechaCita").removeClass("has-error");
        }
    }
    if(!patronCadena.test(sProcedimiento)){
        $("#bloqueProcedimiento").addClass("has-error");
        bValido=false;
        errores.push("Procedimiento incorrecto");
    }
    else{
        if($("#bloqueProcedimiento").hasClass("has-error")){
           $("#bloqueProcedimiento").removeClass("has-error"); 
        }
    }
    if(oSala=="--seleccione una sala--"){
        $("#bloqueSalaCita").addClass("has-error");
        bValido=false;
        errores.push("Sala no seleccionada.");
    }
    else{
        if($("#bloqueSalaCita").hasClass("has-error")){
           $("#bloqueSalaCita").removeClass("has-error");
        }
    }
    if(bValido){
        var datos=$("#formCita").serialize();
        alert(datos);
        $.post("php/altaCita.php",datos,function(respuesta){tratarRespuestaAltaCita(respuesta);});
        limpiaCampos();
    }
    return bValido;
}

function tratarRespuestaAltaCita(respuesta){
    
	
    dialogo(respuesta,"Alta de cita.");
	
}

function editarCita(evento){
	
        evento.preventDefault();
        
	var opcion=$("#form-edita-citas input[type='radio']:checked").val();
	var oSelect=$("#editaCita option:selected");
	
	if(oSelect.index()==0){
		
		dialogo("Error: seleccione una cita","Edita cita");
	}
	else{
            
            if(opcion==1){
            $("#dialogoEditaCita").load("html/formCita.html",function(){
                $("#dialogoEditaCita").dialog();
                $.get('php/getCitas.php',null,getEditarCitas,'json');
            });
            }
            else{

                $.get('php/getCitas.php',null,getBorrarCitas,'json');
            }
        }
}

function cargarSelectCitas(){
    //$.ajax({cache:false});
    $.get('php/getCitas.php',"rand="+Date.now(),tratarGetCitas,'xml');
}

function tratarGetCitas(xml){
    $("#editaCita").empty();
    $('<option value="" >--seleccione una cita--</option>').appendTo("#editaCita");
    var cita=$(xml).find("cita");    
    cita.each(function(){
        var id=$(this).find("id").text();
        var fecha=$(this).find("fecha").text();
        var apellidos=$(this).find("apellidos").text();
        var nombre=$(this).find("nombre").text();
        $('<option value="' + id + '" >' + fecha + " - "+ apellidos + ", " + nombre + '</option>').appendTo("#editaCita");
    });
}
function pedirListaCitas(){
    $.getScript('js/listaCitas.js',function(){
        listarCitas();
    });
}

/*----PAGOS----*/
/*----AÑADIR PAGOS----*/
function validarPago(event){
    var oEvent=event||window.event;  
    oEvent.preventDefault();
    if(validarCamposTextoPago()){
        return true;
    }
    else{        
        var sErrores="";       
        for(var i=0;i<errores.length;i++){
            sErrores+=errores[i]+" \n";
        }
        dialogo("Errores: "+sErrores,"Alta de Pago");
        return false;
    } 
}

function validarCamposTextoPago(){
    var sId=$("#idPago").val();
    var sIdCliente=$("#clientePago option:selected").val();
    var dFecha=$("#fechaPago").val();
    var fImporte=$("#importePago").val();
    var bPagada=$("#citaPagada").val();
    var bValido=true;
    var regId=/^([A-Z]{1})([0-9]{5})$/;
    var regImporte=/^([0-9]+([.]([0-9]{1,2}))?)$/;
    
    if(!regId.test(sId)){
        $("#bloqueIdPago").addClass("has-error");
        bValido=false;
        errores.push("ID incorrecto.");
    }
    else{
        if($("#bloqueIdPago").hasClass("has-error")){
           $("#bloqueIdPago").removeClass("has-error");
        }
    }
    if(sIdCliente==""){
        $("#bloqueClientePago").addClass("has-error");
        bValido=false;
        errores.push("Cliente no seleccionado.");
    }
    else{
        if($("#bloqueClientePago").hasClass("has-error")){
           $("#bloqueClientePago").removeClass("has-error");
        }
    }
    if(dFecha==""){
        $("#bloqueFechaPago").addClass("has-error");
        bValido=false;
        errores.push("Fecha no seleccionada.");
    }
    else{
        if($("#bloqueFechaPago").hasClass("has-error")){
           $("#bloqueFechaPago").removeClass("has-error");
        }
    }
    if(!regImporte.test(fImporte)){
        $("#bloqueImportePago").addClass("has-error");
        bValido=false;
        errores.push("Importe incorrecto.");
    }
    else{
        if($("#bloqueImportePago").hasClass("has-error")){
           $("#bloqueImportePago").removeClass("has-error");
        }
    }
    if(bValido){
        if(bPagada=="on"){
            bPagada=1;
        }
        else{
            bPagada=0;
        }
        altaPago(sId,sIdCliente,dFecha,fImporte,bPagada);
        limpiaCampos();
    }
    return bValido;
}

/*----EDITAR PAGOS----*/
function editarPago(event){
    event.preventDefault();
    var opcion=$("#form-edita-pagos input[type='radio']:checked").val();
    var oSelect=$("#editaPago option:selected");
	
    if(oSelect.index()==0){	
	dialogo("Error: seleccione un pago","Editar pago");
    }
    if(opcion==1){
        $("#dialogoEditaPago").load("html/formPago.html",function(){
            $("#dialogoEditaPago").dialog();
            $.get('php/getPagos.php',null,getEditarPagos,'json');
        });
    }
    else{		
	/*$.get('php/getPagos.php',null,getBorrarPagos,'json');*/
        $.get('php/getPagos.php',"rand="+Date.now(),getBorrarPagos,'xml');
    }
}
function getEditarPagos(oArrayPagos){
    $.each(oArrayPagos,function(i,elemento){		
        if($("#editaPago option:selected").val()==elemento.id){
            $("#idEditaPago").val(elemento.id).text(elemento.id).attr("readonly","true");
            $("#clienteEditaPago").val(elemento.idcliente).text(elemento.idcliente);
            $("#fechaEditaPago").val(elemento.fechapago).text(elemento.fechapago);
            $("#importeEditaPago").val(elemento.importe).text(elemento.importe);
            $("#citaEditaPagada").val(elemento.pagada).text(elemento.pagada);
        }   
    });
    $("#btnAltaEditaPago").on("click",validarEditarPago);
    $("#btnCancelarEditaPago").on("click",function(){$("#dialogoEditaPago").dialog("close");});
}

function validarEditarPago(evento){
    var oEvento=evento||window.event;  
    oEvento.preventDefault();
    if(validarCamposEditarPago()){
        $("#dialogoEditaPago").dialog("close");
        return true;
    }
    else{       
        var sErrores="";
        for(var i=0;i<errores.length;i++){
           sErrores+=errores[i]+" \n";
        }
        dialogo("Errores: "+sErrores,"Alta de Pago");
        return false;
    } 
}

function validarCamposEditarPago(){
    var sId=$("#idEditaPago").val();
    var sIdCliente=$("#clienteEditaPago option:selected").val();
    var dFecha=$("#fechaEditaPago").val();
    var fImporte=$("#importeEditaPago").val();
    var bPagada=$("#citaEditaPagada").val();
    var bValido=true;
    var regId=/^([A-Z]{1})([0-9]{5})$/;
    var regImporte=/^([0-9]+([.]([0-9]{1,2}))?)$/;
    
    if(!regId.test(sId)){
        $("#bloqueEditaIdPago").addClass("has-error");
        bValido=false;
        errores.push("ID incorrecto.");
    }
    else{
        if($("#bloqueEditaIdPago").hasClass("has-error")){
           $("#bloqueEditaIdPago").removeClass("has-error");
        }
    }
    if(sIdCliente==""){
        $("#bloqueEditaClientePago").addClass("has-error");
        bValido=false;
        errores.push("Pago no seleccionado.");
    }
    else{
        if($("#bloqueEditaClientePago").hasClass("has-error")){
           $("#bloqueEditaClientePago").removeClass("has-error");
        }
    }
    if(dFecha==""){
        $("#bloqueEditaFechaPago").addClass("has-error");
        bValido=false;
        errores.push("Fecha no seleccionada.");
    }
    else{
        if($("#bloqueEditaFechaPago").hasClass("has-error")){
           $("#bloqueEditaFechaPago").removeClass("has-error");
        }
    }
    if(!regImporte.test(fImporte)){
        $("#bloqueEditaImportePago").addClass("has-error");
        bValido=false;
        errores.push("Importe incorrecto.");
    }
    else{
        if($("#bloqueEditaImportePago").hasClass("has-error")){
           $("#bloqueEditaImportePago").removeClass("has-error");
        }
    }
    if(bValido){
        if(bPagada=="on"){
            bPagada=1;
        }
        else{
            bPagada=0;
        }
        var oPago=new Pago(sId,sIdCliente,dFecha,fImporte,bPagada);
        actualizaCliente(oPago);
        limpiaCampos()
    }
    return bValido;
}

function actualizaPago(oPago){
    var sParametros="datos="+JSON.stringify(oPago);
    // Codifico para envio
    sParametros=encodeURI(sParametros);
    $.ajax({
    url:'php/actualizaPago.php',
    data:sParametros,
    // especifica si será una petición POST o GET
    type:'POST',
    // el tipo de información que se espera de respuesta
    dataType:'text',
    // código a ejecutar si la petición es satisfactoria;
    // la respuesta es pasada como argumento a la función
    success : function(oRespuesta){
        dialogo("OK : " + oRespuesta,"Edita pago");
    },
    complete: cargarSelectPagos
    });
}

/*----BORRAR PAGOS----*/
function getBorrarPagos(xml){
    var oArrayPagos=$(xml).find("pago");
    var texto="";
    var titulo="Borrar pago";
    var codigo="";
    
    oArrayPagos.each(function(){
        var id=$(this).find("id").text();
        var fecha=$(this).find("fecha").text();
        var apellidos=$(this).find("apellidos").text();
        var nombre=$(this).find("nombre").text();
        if($("#editaPago option:selected").val()==id){
           codigo=id;
           texto='<p>Pago borrado</p><p>ID: '+id+'</p><p>Fecha: '+fecha+'</p><p>Cliente: '+apellidos+', '+nombre+'</p>';
        }
    });
    $.post("php/borrarPagos.php",{id:codigo},tratarRespuestaPOSTBorrarPago);	
    dialogo(texto,titulo);
}

function tratarRespuestaPOSTBorrarPago(){
    cargarSelectPagos();
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
        
        var texto = "<table class='table'><tr><th>ID</th><th>NOMBRE</th><th>APELLIDOS</th><th>NÚM. COLEGIADO</th><th>FECHA DE ALTA</th></tr>";
 
        texto +=oListaDentistas;
        
        $("#listadoDentistas .resultados").html(texto);
    }
 
});
}


/*----LIMPIA CAMPOS----*/
function limpiaCampos(){
    $("input:text").val("");
    $("textarea").val("");
    $("option:nth-child(1)").prop("selected",true);
    $("input:checkbox").prop("checked",false);
    $("input:radio[value='1']").prop("checked",true);
    $("input:radio[value='2']").prop("checked",false);
}
