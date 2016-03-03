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

$id=$_POST['id'];

// Creamos la conexión al servidor.
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

// Seleccionar la base de datos en esa conexion.
mysql_select_db($basedatos, $conexion) or die(mysql_error());

// Consulta SQL para obtener los datos de los propietarios
$sql = "SELECT * FROM CITA WHERE ID='$id'";

$resultados = mysql_query($sql, $conexion) or die(mysql_error());


while ($fila = mysql_fetch_array($resultados)) {
    // Almacenamos en un array cada una de las filas que vamos leyendo del recordset.
   $datos = "<div><p id='id'>".$fila[0]."</p><p id='idcliente'>".$fila[1]."</p><p id='iddentista'>".$fila[2]."</p><p id='idpago'>".$fila[3]."</p><p id='proc'>".$fila[4]."</p><p id='desc'>".$fila[5]."</p><p id='atendida'>".$fila[6]."</p><p id='sala'>".$fila[7]."</p><p id='fecha'>".$fila[8]."</p></div>";
}

// función de PHP que convierte a formato JSON el array.
//echo json_encode($datos);

echo $datos; 

mysql_close($conexion);

?> 