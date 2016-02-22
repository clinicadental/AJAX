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


$sql = "select * from cliente where id = '".$oCliente->id."' ";


$resultados = mysql_query($sql, $conexion) or die(mysql_error());


$contador=mysql_num_rows($resultados);

if($contador>0)
{
	$mensaje= 'YA EXISTE ESE CLIENTE';
	$error = true;

}
else
{
	$mensaje='CLIENTE INSERTADO CON EXITO';
	$error = false;

	$sql = "insert into cliente (id,nombre,apellidos,telefono) VALUES ('$oCliente->id','$oCliente->nombre','$oCliente->apellidos','$oCliente->telefono')";

	$resultados = @mysql_query($sql, $conexion) or die(mysql_error());
	
}

$respuesta = array($error,$mensaje);

echo json_encode($respuesta); 

mysql_close($conexion);

?> 