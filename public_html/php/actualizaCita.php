<?php

// Va a devolver una respuesta JSON que no se debe cachear 
header('Content-Type: application/text');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');


$servidor  = "localhost";
$basedatos = "clinica";
$usuario   = "root";
$password  = "";


$id=$_POST['id'];
$cliente=$_POST['cliente'];
$dentista=$_POST['dentista'];
$pago=$_POST['pago'];
$date=$_POST['date'];
$procedimiento=$_POST['procedimiento'];
$descripcion=$_POST['descripcion'];
$sala=$_POST['sala'];
$atendida=$_POST['atendida'];

// Abrir conexion con la BD
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

mysql_select_db($basedatos, $conexion) or die(mysql_error());

$sql = "UPDATE CITA SET IDCLIENTE='$cliente', IDDENTISTA='$dentista', IDPAGO='$pago', PROCEDIMIENTO='$procedimiento', DESCRIPCION='$descripcion', ATENDIDA='$atendida', SALA='$sala', FECHACITA='$date' WHERE ID='$id'";

$resultados = @mysql_query($sql, $conexion) or die(mysql_error());

$mensaje='CITA MODIFICADA CON EXITO';

echo $mensaje; 

mysql_close($conexion);

?> 