<?php
    /*ENVÍO DE DATOS JSON SIN CACHEO*/
    header("Content-Type: application/json");
    header("Cache-Control: no-cache,must-revalidate");
    header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
    /*CONFIGURACIÓN DE LA BASE DE DATOS*/
    $server="localhost";
    $db="clinica";
    $user="root";
    $pass="";
    $datos=$_POST["datos"];
    $pago=json_decode($pago);
    /*CREAMOS LA CONEXIÓN AL SERVIDOR*/
    $connection=mysql_connect($server,$user,$pass)or die(mysql_error());
    mysql_query("SET NAMES 'utf8'",$connection);
    /*SELECCIONAMOS LA BASE DE DATOS*/
    mysql_select_db($db,$connection)or die(mysql_error());
    /*CONSULTA SQL PARA OBTENER LOS DATOS*/
    $string='SELECT * FROM pago WHERE id="'.$pago->id.'"';
    $query=mysql_query($string,$connection)or die(mysql_error());
    $numrows=mysql_num_rows($query);
    if($numrows>0){
	$message="Ya existe el Pago.";
            $error=true;
    }
    else{
        $message="Insertado con éxito.";
	$error=false;
	$insertstring='INSERT INTO pago(id,idcliente,fechapago,importe,pagado) VALUES("'.$pago->id.'","'.$pago->idcliente.'","'.$pago->fechapago.'","'.$pago->importe.'","'.$pago->pagado.'")';
	$insertquery=@mysql_query($insertstring,$connection)or die(mysql_error());	
    }
    $result=array($error,$message);
    /*CONVERTIR EL ARRAY A FORMATO JSON*/
    echo json_encode($result); 
    mysql_close($connection);
?>