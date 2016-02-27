<?php
	/*ENVÍO DE DATOS JSON SIN CACHEO*/
	header("Content-Type: application/json");
	header("Cache-Control: no-cache,must-revalidate");
	header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
	/*CONFIGURACIÓN DE LA BASE DE DATOS*/
	$server="localhost";
	$db="clinica";
	$user="root";
	$pass="";
	$id=$_POST["id"];
	/*CREAMOS LA CONEXIÓN AL SERVIDOR*/
	$connection=mysql_connect($server,$user,$pass)or die(mysql_error());
	mysql_query("SET NAMES 'utf8'",$connection);
	/*SELECCIONAMOS LA BASE DE DATOS*/
	mysql_select_db($db,$connection)or die(mysql_error());
	/*CONSULTA SQL PARA ELIMINAR LOS DATOS*/
	$string='DELETE FROM pago WHERE id="'.$id.'"';
	$query=mysql_query($string,$connection)or die(mysql_error());
	mysql_close($connection);
        
        echo "[]";
?>