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
    /*$sql = "SELECT P.ID, P.FECHAPAGO, C.NOMBRE, C.APELLIDOS FROM PAGO P,CLIENTE C WHERE C.ID=P.IDCLIENTE; ";*/
    $sql = "SELECT P.id,P.importe,P.pagado,P.idcliente,P.fechapago,C.nombre,C.apellidos FROM pago AS P,cliente AS C WHERE C.id=P.idcliente;";
    $resultados = mysql_query($sql, $conexion) or die(mysql_error());
    $datos = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><pagos>';
    while ($fila = mysql_fetch_array($resultados)) {
        // Almacenamos en un array cada una de las filas que vamos leyendo del recordset.
       /*$datos .= "<pago><id>".$fila[0]."</id><fecha>".$fila[1]."</fecha><nombre>".$fila[2]."</nombre><apellidos>".$fila[3]."</apellidos></pago>";*/
       $datos .= "<pago><id>".$fila[0]."</id><importe>".$fila[1]."</importe><pagada>".$fila[2]."</pagada><cliente>".$fila[3]."</cliente><fecha>".$fila[4]."</fecha><nombre>".$fila[5]."</nombre><apellidos>".$fila[6]."</apellidos></pago>";
    }
    $datos.="</pagos>";
    // función de PHP que convierte a formato JSON el array.
    //echo json_encode($datos);
    echo $datos; 
    mysql_close($conexion);
?> 