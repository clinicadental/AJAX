<?php

header('Content-Type: application/html');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

$servidor  = "localhost";
$basedatos = "clinica";
$usuario   = "root";
$password  = "";


// Creamos la conexión al servidor.
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

// Seleccionar la base de datos en esa conexion.
mysql_select_db($basedatos, $conexion) or die(mysql_error());

// Consulta SQL para obtener los datos de los centros.
$sql = "select * from dentista order by id";
$datos="";
$resultados = mysql_query($sql, $conexion) or die(mysql_error());
while ($fila = mysql_fetch_array($resultados, MYSQL_ASSOC)) {
    // Almacenamos en un array cada una de las filas que vamos leyendo del recordset.
    $datos .= "<tr><td>".$fila['id']."</td><td>".$fila['nombre']."</td><td>".$fila['apellidos']."</td><td>".$fila['numcolegiado']."</td><td>".$fila['fechaalta']."</td></tr>";
}

echo $datos; 

mysql_close($conexion);

?> 