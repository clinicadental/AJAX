<?php
// Cabecera para indicar que vamos a enviar datos JSON y que no haga caché de los datos.
header('Content-Type: application/xml');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); 

/* Utilizar el fichero dbcreacion.sql incluído en la carpeta para crear la base de datos, usuario y tabla en tu servidor MySQL.
Si fuera necesario modifica los datos de la configuración y adáptalos a tu entorno de trabajo.*/

// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "clinica";
$usuario   = "root";
$password  = "";

// Creamos la conexión al servidor.
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

// Seleccionar la base de datos en esa conexion.
mysql_select_db($basedatos, $conexion) or die(mysql_error());

// Consulta SQL para obtener los datos de los propietarios
$sql = "SELECT C.ID, C.FECHACITA, CL.NOMBRE, CL.APELLIDOS FROM CITA C,CLIENTE CL WHERE C.IDCLIENTE=CL.ID ORDER BY C.FECHACITA; ";

$resultados = mysql_query($sql, $conexion) or die(mysql_error());

$datos = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><citas>';

while ($fila = mysql_fetch_array($resultados)) {
   
   $datos .= "<cita><id>".$fila[0]."</id><fecha>".$fila[1]."</fecha><nombre>".$fila[2]."</nombre><apellidos>".$fila[3]."</apellidos></cita>";
}

$datos.="</citas>";

echo $datos; 

mysql_close($conexion);

?> 