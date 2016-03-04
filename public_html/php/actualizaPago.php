<?php
    /*DEVUELVE RESPUESTA JSON QUE NO SE DEBE CACHEAR*/
    header("Content-Type: application/json");
    header("Cache-Control: no-cache, must-revalidate");
    header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
    $server="localhost";
    $db="clinica";
    $user="root";
    $pass="";
    $datos=$_POST["datos"];
    $pago=json_decode($datos);
    $connection=mysql_connect($server,$user,$pass)or die(mysql_error());
    mysql_query("SET NAMES 'utf8'",$connection);
    mysql_select_db($db,$connection)or die(mysql_error());
    $string='UPDATE pago SET idcliente="'.$pago->idcliente.'",fechapago="'.$pago->fechapago.'",importe="'.$pago->importe.'",pagado="'.$pago->pagada.'" WHERE id="'.$pago->id.'"';
    $result=@mysql_query($string,$connection)or die(mysql_error());
    $message="PAGO MODIFICADO CON EXITO";
    echo $message;
    mysql_close($connection);
?> 