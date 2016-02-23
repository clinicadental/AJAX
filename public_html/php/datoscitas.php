<?php
	header("Content-Type:application/html");
	header("Cache-Control:no-cache,must-revalidate");
	header("Expires:Mon, 26 Jul 1997 05:00:00 GMT");
	$server="localhost";
	$db="clinica";
	$user="root";
	$pass="";

	$connect=mysql_connect($server,$user,$pass)or die(mysql_error());
	mysql_query('SET NAMES "utf8"',$connect);
	mysql_select_db($db,$connect)or die(mysql_error());
	$string="SELECT cita.id,cliente.nombre AS clinombre,cliente.apellidos AS cliapellidos,dentista.nombre AS denombre,dentista.apellidos AS deapellidos,pago.importe,cita.fechacita,cita.procedimiento,cita.descripcion,cita.sala,cita.atendida FROM cita,cliente,dentista,pago WHERE cita.idcliente=cliente.id AND cita.iddentista=dentista.id AND cita.idpago=pago.id";
	$row="";
	$result=mysql_query($string,$connect)or die(mysql_error());
	while($cita=mysql_fetch_array($result, MYSQL_ASSOC)){
		if($cita['atendida']==1){
			$atendida="Sí";	
		}
		else{
			$atendida="No";
		}
		$row.="<tr><td>".$cita['id']."</td><td>".$cita['clinombre']." ".$cita['cliapellidos']."</td><td>".$cita['denombre']." ".$cita['deapellidos']."</td><td>".$cita['importe']."</td><td>".$cita['fechacita']."</td><td>".$cita['procedimiento']."</td><td>".$cita['descripcion']."</td><td>".$cita['sala']."</td><td>".$atendida."</td></tr>";
	}
	echo $row; 
	mysql_close($connect);
?> 