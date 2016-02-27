var oAjaxAltaPago=null;

/*CREAR OBJETO PAGO*/
function altaPago(sId,sIdCliente,dFecha,fImporte,bPagada){
    var oPago=new Pago(sId,sIdCliente,dFecha,fImporte,bPagada);
    /*FORMATEO DE PARÁMETRO POST & CODIFICACIÓN PARA ENVÍO*/
    var sParametroPOST=encodeURI("datos="+JSON.stringify(oPago));
    /*CREACIÓN DE SCRIPT DE ENVÍO*/
    var sURL=encodeURI("php/altaPago.php");
    llamadaAjaxAltaPago(sURL,sParametroPOST);
}

function llamadaAjaxAltaPago(sURL,sParametroPOST){
    oAjaxAltaPago=objetoXHR();
    oAjaxAltaPago.open("POST",sURL,true);
    /*PARA PETICIONES POST*/
    oAjaxAltaPago.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    oAjaxAltaPago.onreadystatechange=respuestaAltaPago;
    oAjaxAltaPago.send(sParametroPOST);
}

function respuestaAltaPago(){
    if(oAjaxAltaPago.readyState==4&&oAjaxAltaPago.status==200){
	var oArrayRespuesta=JSON.parse(oAjaxAltaPago.responseText);
	if(oArrayRespuesta[0]==true){
            alert("Error: "+oArrayRespuesta[1]);
	} 
	else{
            alert("OK: "+oArrayRespuesta[1]);
	}
    }
}