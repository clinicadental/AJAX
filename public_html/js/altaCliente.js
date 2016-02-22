var oAjaxAltaCliente = null;

function altaCliente(sId,sNombre,sApellidos,iTelefono){

    // Aqui habría que hacer la validacion del formulario
    // if (validarAltaCliente()){

    //Creo un objeto cliente
    var oCliente = new Cliente(sId,sNombre,sApellidos,iTelefono);

    // Formateo de parametro POST
    var sParametroPOST = "datos=" + JSON.stringify(oCliente);

    // Codifico para envio
    sParametroPOST = encodeURI(sParametroPOST);

    // Script de envio
    var sURL = encodeURI("php/altaCliente.php");

    llamadaAjaxAltaCliente(sURL,sParametroPOST);
}
function llamadaAjaxAltaCliente(sURL,sParametroPOST){

    oAjaxAltaCliente = new objetoXHR();

    oAjaxAltaCliente.open("POST",sURL,true);

    // Para peticiones con metodo POST        
    oAjaxAltaCliente.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	
    oAjaxAltaCliente.onreadystatechange = respuestaAltaCliente;
//	oAjaxAltaCliente.addEventListener("readystatechange",respuestaAltaCliente,false);

    oAjaxAltaCliente.send(sParametroPOST);
}

function respuestaAltaCliente(){

    if(oAjaxAltaCliente.readyState == 4 && oAjaxAltaCliente.status ==200)	{
        var oArrayRespuesta = JSON.parse(oAjaxAltaCliente.responseText);

        if (oArrayRespuesta[0] == true){
                dialogo("Error : " + oArrayRespuesta[1],"Alta cliente");
        } else {
                dialogo("OK : " + oArrayRespuesta[1],"Alta cliente");
        }
    }
}