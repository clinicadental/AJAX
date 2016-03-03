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
$sql = "SELECT C.ID, CL.APELLIDOS, CL.NOMBRE, D.APELLIDOS, D.NOMBRE, C.IDPAGO, C.PROCEDIMIENTO, C.SALA, C.FECHACITA FROM CITA C, CLIENTE CL, DENTISTA D WHERE C.IDCLIENTE=CL.ID AND C.IDDENTISTA=D.ID AND C.ID='$id'";

$resultados = mysql_query($sql, $conexion) or die(mysql_error());

$datos = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><citas>';

while ($fila = mysql_fetch_array($resultados)) {
    // Almacenamos en un array cada una de las filas que vamos leyendo del recordset.
   $datos .= "<cita><id>".$fila[0]."</id><apellidoscliente>".$fila[1]."</apellidoscliente><nombrecliente>".$fila[2]."</nombrecliente><apellidosdent>".$fila[3]."</apellidosdent><nombredent>".$fila[4]."</nombredent><idpago>".$fila[5]."</idpago><procedimiento>".$fila[6]."</procedimiento><sala>".$fila[7]."</sala><fecha>".$fila[8]."</fecha></cita>";
}

$datos.="</citas>";
// función de PHP que convierte a formato JSON el array.
//echo json_encode($datos);

echo $datos; 

mysql_close($conexion);

?> 