<?php

// Va a devolver una respuesta JSON que no se debe cachear 
header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');


$servidor  = "localhost";
$basedatos = "clinica";
$usuario   = "root";
$password  = "";

$id=$_POST['id'];


// Abrir conexion con la BD
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

mysql_select_db($basedatos, $conexion) or die(mysql_error());


$sql = "DELETE from cliente where id = '".$id."'";


$resultados = mysql_query($sql, $conexion) or die(mysql_error());

mysql_close($conexion);
// $contador=mysql_num_rows($resultados);

// return $contador;

echo "[]";



?> 