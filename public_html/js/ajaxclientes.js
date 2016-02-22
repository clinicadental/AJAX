function llamadaAjax(){
	
	miXHR = new objetoXHR();
	
	cargarAsync("php/datosjson.php");
}

function cargarAsync(url) {
	if (miXHR) {
		// Activamos el indicador Ajax antes de realizar la petición.
		document.getElementById("indicador").innerHTML = "<img src='images/ajax-loader.gif'/>";
		//Si existe el objeto miXHR
		miXHR.open('GET', encodeURI(url), true); //Abrimos la url, true=ASINCRONA
		// En cada cambio de estado(readyState) se llamará a la función estadoPeticion
		miXHR.onreadystatechange = estadoPeticion;
		// Hacemos la petición al servidor. Como parámetro: null ya que los datos van por GET
		miXHR.send(null);
	}
}
    /////////////////////////////////////////////////////////
    // Función estadoPeticion: será llamada a cada cambio de estado de la petición AJAX
    // cuando la respuesta del servidor es 200(fichero encontrado) y el estado de
    // la solicitud es 4, accedemos a la propiedad responseText
    /////////////////////////////////////////////////////////

function estadoPeticion() {
    if (this.readyState == 4 && this.status == 200) {
        // Los datos JSON los recibiremos como texto en la propiedad this.responseText
        // Con la función eval() evaluaremos ese resultado para convertir a objetos y variables            el string que estamos recibiendo en JSON.
        // Lo que recibimos en formato JSON es un string que representa un array [ ... ] que
        // contiene objetos literales {...}, {...}, ...
        /* Ejemplo: [ {"id":"2","nombrecentro":"IES A
Piringalla","localidad":"Lugo","provincia":"Lugo","telefono":"982212010","fechavisita":"2010-
11-26","numvisitantes":"85"} , {"id":"10","nombrecentro":"IES As Fontiñas","localidad" : .....
} ] */
        // Asignamos a la variable resultados la evaluación de responseText
        // var resultados = eval('(' + this.responseText + ')');
        var resultados = JSON.parse(this.responseText);
		
			if(resultados.length==0){
				
				texto="<h3>No hay resultados</h3>";
			}
			else{
			
				texto = "<table class='table'><tr><th>ID</th><th>NOMBRE</th><th>APELLIDOS</th><th>Telefono</th></tr>";
				// Hacemos un bucle para recorrer todos los objetos literales recibidos en el array         resultados y mostrar su contenido.
				for(var i = 0; i < resultados.length; i++) {
					objeto = resultados[i];
					texto += "<tr><td>" + objeto.id + "</td><td>" + objeto.nombre + "</td><td>" + objeto.apellidos + "</td><td>" + objeto.telefono + "</td></tr>";
				}
			}
			// Desactivamos el indicador AJAX cuando termina la petición
			document.getElementById("indicador").innerHTML = "";
			// Imprimimos la tabla dentro del contenedor resultados.
			document.getElementById("resultados").innerHTML = texto;
    }
}