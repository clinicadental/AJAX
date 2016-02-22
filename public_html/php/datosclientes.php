<?php
// Cabecera para indicar que vamos a enviar datos JSON y que no haga caché de los datos.
header('Content-Type: application/json');
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

// Consulta SQL para obtener los datos de los centros.
$sql = "select * from cliente order by id";
$datos=array();
$resultados = mysql_query($sql, $conexion) or die(mysql_error());
while ($fila = mysql_fetch_array($resultados, MYSQL_ASSOC)) {
    // Almacenamos en un array cada una de las filas que vamos leyendo del recordset.
    $datos[] = $fila;
}
// Como resultado se puede enviar algo similar a:
/* [ {"id":"3","nombrecentro":"IES San Clemente","localidad":"Santiago de Compostela","provincia":"A Coruña" ,"telefono":"981580496","fechavisita":"2010-11-26","numvisitantes":"60"} , {"id":"10","nombrecentro":"IES As Fontiñas","localidad" : ..... } ]
// Empleando la siguiente instrucción:echo json_encode($datos); */

/* O si queremos enviar como resultado un array de objetos literales llamado resultados, haremos:
resultados = [{"id":"2","nombrecentro":"IES A Piringalla","localidad":"Lugo","provincia":"Lugo","telefono":"982212010","fechavisita":"2010-11-26","numvisitantes":"85"} , {"id":"10","nombrecentro":"IES As Fontiñas","localidad" : .....}]
Empleando la siguiente instrucción: echo "resultados=".json_encode($datos);
De esta forma en la página index.js sólo tendríamos que poner
eval('(' + this.responseText + ')') o JSON.parse(this.responseText)
y así ya tenemos disponible en JavaScript una variable resultados que es un array que contendrá los objetos literales. */

echo json_encode($datos); // función de PHP que convierte a formato JSON el array.

mysql_close($conexion);

?> 