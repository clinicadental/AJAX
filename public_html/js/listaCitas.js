function listarCitas(){
    miXHR=new objetoXHR();
    cargarAsyncCitas("php/datoscitas.php");
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
            var texto="<h3>No hay resultados</h3>";
	}
	else{
            texto="<table class='table'><tr><th>ID</th><th>CLIENTE</th><th>DENTISTA</th><th>IMPORTE</th><th>FECHA</th><th>PROCEDIMIENTO</th><th>DESCRIPCIÓN</th><th>SALA</th><th>ATENDIDA</th></tr>";
            for(var i=0;i<resultados.length;i++){
                var objeto=resultados[i];
                var atendida="";
                if(objeto.atendida==1){
                    atendida="Sí";	
                }
                else{
                    atendida="No";	
                }
                texto+="<tr><td>"+objeto.id+"</td><td>"+objeto.cliapellidos+", "+objeto.clinombre+"</td><td>"+objeto.deapellidos+", "+objeto.denombre+"</td><td>"+objeto.importe+'€'+"</td><td>"+objeto.fechacita+"</td><td>"+objeto.procedimiento+"</td><td>"+objeto.descripcion+"</td><td>"+objeto.sala+"</td><td>"+atendida+"</td></tr>";
                }
	}
	$("#listadoCitas").find(".indicador").hide();
	$("#listadoCitas").find(".resultados").html(texto);
    }
}