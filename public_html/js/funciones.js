/*----CALENDARIOS----*/
/*window.addEventListener('load',calendario1,false);
function calendario1(){Calendar.setup({inputField:"fechaCita",ifFormat:"%d / %m / %Y",button:"selector1"});}
window.addEventListener('load',calendario2,false);
function calendario2(){Calendar.setup({inputField:"fechaPago",ifFormat:"%d / %m / %Y",button:"selector2"});}*/


/*$("#listaClientes").on('click',function(){ llamadaAjax();});*/

var errores=[];
$(window).load(function(){asignarEventos();});
//window.addEventListener('load',asignarEventos,false);
$( "#dialog" ).dialog({
    autoOpen: false,
    width: 400,
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

function asignarEventos(){
    
    var oFormCliente=$("#btnAltaCliente");
    oFormCliente.on('click', validarCliente);
}

/*----MOSTRAR FORMULARIOS Y LISTADOS----*/
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
    llamadaAjax();
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
    
}


function mostrarListadoDentistas(){
    ocultarTodo();
    $("#listadoDentistas").css("display","block");
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