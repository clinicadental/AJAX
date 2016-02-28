<?php

// Va a devolver una respuesta JSON que no se debe cachear 
header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');


$servidor  = "localhost";
$basedatos = "clinica";
$usuario   = "root";
$password  = "";

$datos=$_POST['datos'];

$oCliente = json_decode($datos);


// Abrir conexion con la BD
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

mysql_select_db($basedatos, $conexion) or die(mysql_error());

$sql = "UPDATE CLIENTE SET NOMBRE='$oCliente->nombre', APELLIDOS='$oCliente->apellidos', TELEFONO='$oCliente->telefono' WHERE ID='$oCliente->id'";

$resultados = @mysql_query($sql, $conexion) or die(mysql_error());

$mensaje='CLIENTE MODIFICADO CON EXITO';

echo $mensaje; 

mysql_close($conexion);

?> 