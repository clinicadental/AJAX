function listarPagos(){
    miXHR=new objetoXHR();
    cargarAsyncPag("php/datospagos.php");
}

function cargarAsyncPag(url){
    if(miXHR){
        $("#listadoPagos").find(".indicador").html("<img src='images/ajax-loader.gif'/>");
        miXHR.open("GET",encodeURI(url),true);
        miXHR.onreadystatechange=estadoPeticionPag;
        miXHR.send(null);
        $("#listadoPagos").find(".indicador").show();
    }
}

function estadoPeticionPag(){
    if(this.readyState==4&&this.status==200){
		var resultados=JSON.parse(this.responseText);
		if(resultados.length==0){
			texto="<h3>No hay resultados</h3>";
		}
		else{
			texto="<table class='table'><tr><th>ID</th><th>IMPORTE</th><th>CLIENTE</th><th>FECHA PAGO</th><th>PAGADO</th></tr>";
			for(var i=0;i<resultados.length;i++){
				objeto=resultados[i];
				var pagado="";
				if(objeto.pagado==1){
					pagado="Sí";	
				}
				else{
					pagado="No"	
				}
				texto+="<tr><td>"+objeto.id+"</td><td>"+objeto.importe+'€'+"</td><td>"+objeto.nombre+" "+objeto.apellidos+"</td><td>"+objeto.fechapago+"</td><td>"+pagado+"</td></tr>";
			}
		}
		$("#listadoPagos").find(".indicador").hide();
		$("#listadoPagos").find(".resultados").html(texto);
    }
}