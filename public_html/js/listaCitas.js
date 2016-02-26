function listarCitasas(){
    miXHR=new objetoXHR();
    cargarAsyncCit("php/datoscitas.php");
}

function cargarAsyncCitas(url){
    if(miXHR){
        $("#listadoCitas").find(".indicador").html("<img src='images/ajax-loader.gif'/>");
        miXHR.open("GET",encodeURI(url),true);
        miXHR.onreadystatechange=estadoPeticionCitas;
        miXHR.send(null);
        $("#listadoCitas").find(".indicador").show();
    }
}

function estadoPeticionCitas(){
    if(this.readyState==4&&this.status==200){
	var resultados=JSON.parse(this.responseText);
	if(resultados.length==0){
            texto="<h3>No hay resultados</h3>";
	}
	else{
            texto="<table class='table'><tr><th>ID</th><th>CLIENTE</th><th>DENTISTA</th><th>PAGO</th><th>FECHA CITA</th><th>PROCEDIMIENTO</th><th>DESCRIPCION</th><th>SALA</th><th>ATENDIDA</th></tr>";
            for(var i=0;i<resultados.length;i++){
                objeto=resultados[i];
                var atendida="";
                if(objeto.atendida==1){
                    atendida="Sí";	
                }
                else{
                    atendida="No"	
                }
                texto+="<tr><td>"+objeto.id+"</td><td>"+objeto.clinombre+" "+objeto.cliapellidos+"</td><td>"+objeto.denombre+" "+objeto.deapellidos+"</td><td>"+objeto.importe+'€'+"</td><td>"+objeto.fechacita+"</td><td>"+objeto.procedimiento+"</td><td>"+objeto.descripcion+"</td><td>"+objeto.sala+"</td><td>"+atendida+"</td></tr>";
                }
	}
	$("#listadoCitas").find(".indicador").hide();
	$("#listadoCitas").find(".resultados").html(texto);
    }
}