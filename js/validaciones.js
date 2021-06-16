
var	nombre = document.getElementById('nombre'),
	cantidad = document.getElementById('cantidad'),
	botonComenzar = document.getElementById('miBoton');

function validarCampos(){
	
	if(nombre.value === ''){
		alert("¡Ingresa tu nombre, por favor!");
		return false;
	}

	if(cantidad.value === ''){
		alert("¡Ingresa la cantidad que deseas ganar, por favor!");
		return false;
	}
	return true;
}


function comenzar(){
	var correcto = validarCampos();
	if(correcto){
			setTimeout(passdata, 3000);
	}
}

myString=""

function passdata(){
	myForm=document.f1
	for(i=0;i<myForm.length-1;i++){ // run through form elements
	myString+=add_delimiters(myForm.elements[i].name,myForm.elements[i].value) // get element name and value

	location.href = 'rompecabezas.html' + '?' + escape(myString)
}

function add_delimiters(n,v){
	if(n!=""){ // add = and & characters to identify name and value pairs
	return n+"="+v+"&"
	}
}

}




botonComenzar.addEventListener('click', function(e){
	e.preventDefault();
	comenzar();
});
