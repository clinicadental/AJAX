<?php
    header("Content-Type:application/json");
    header("Cache-Control:no-cache,must-revalidate");
    header("Expires:Mon, 26 Jul 1997 05:00:00 GMT");
    $server="localhost";
    $db="clinica";
    $user="root";
    $pass="";

    $connect=mysql_connect($server,$user,$pass)or die(mysql_error());
    mysql_query('SET NAMES "utf8"',$connect);
    mysql_select_db($db,$connect)or die(mysql_error());
    $string="SELECT pago.id,pago.importe,cliente.nombre,cliente.apellidos,pago.fechapago,pago.pagado FROM pago,cliente WHERE pago.idcliente=cliente.id ORDER BY pago.fechapago ASC";
    $datos=array();
    $result=mysql_query($string,$connect)or die(mysql_error());
    while($pago=mysql_fetch_array($result, MYSQL_ASSOC)) {
    	$datos[]=$pago;
    }
    echo json_encode($datos);
    mysql_close($connect);
?> 