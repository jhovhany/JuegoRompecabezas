/*Programacion de JavaScript*/

var piezas = document.getElementsByClassName('movil');

var tamWidh = [185,185,185,185,185,185, 185,185,185,185,185,185
			,185,185,185,185,185,185, 185,185,185,185,185,185
			,185,185,185,185,185,185, 185,185,185,185,185,185];

var tamHeight = [200,200,200,200,200,200, 200,200,200,200,200,200
				,200,200,200,200,200,200, 200,200,200,200,200,200
				,200,200,200,200,200,200, 200,200,200,200,200,200];

for(var i=0;i<piezas.length;i++){
	piezas[i].setAttribute("width", tamWidh[i]);
	piezas[i].setAttribute("height",tamHeight[i]);
	piezas[i].setAttribute("x", Math.floor((Math.random() * 10) + 1));
	piezas[i].setAttribute("y", Math.floor((Math.random() * 409) + 1));
	piezas[i].setAttribute("onmousedown","seleccionarElemento(evt)");

	piezas[i].setAttribute("ontouchstart","seleccionarElemento(evt)");
}

var elementSelect = 0;  
var currentX = 0;
var currentY = 0;
var currentPosX = 0;
var currentPosY = 0;

function seleccionarElemento(evt) {
	elementSelect = reordenar(evt);

	if (evt.targetTouches) {
		currentX = evt.touches[0].clientX;        
		currentY = evt.touches[0].clientY;
	} else {
		currentX = evt.clientX;        
		currentY = evt.clientY;

	}

	currentPosx = parseFloat(elementSelect.getAttribute("x"));     
	currentPosy = parseFloat(elementSelect.getAttribute("y"));
	elementSelect.setAttribute("onmousemove","moverElemento(evt)");

	elementSelect.setAttribute("ontouchmove","moverElemento(evt)");
}

function moverElemento(evt){
	var dx = null;
	var dy = null;

	if(evt.targetTouches){
		dx = evt.touches[0].clientX - currentX;
		dy = evt.touches[0].clientY - currentY;
	}else{
		dx = evt.clientX - currentX;
		dy = evt.clientY - currentY;
	}

	currentPosx = currentPosx + dx;
	currentPosy = currentPosy + dy;
	elementSelect.setAttribute("x",currentPosx);
	elementSelect.setAttribute("y",currentPosy);

	if (evt.targetTouches) {
		currentX = evt.touches[0].clientX;        
		currentY = evt.touches[0].clientY;
	} else {
		currentX = evt.clientX;        
		currentY = evt.clientY;

	}

	elementSelect.setAttribute("onmouseout","deseleccionarElemento(evt)");
	elementSelect.setAttribute("onmouseup","deseleccionarElemento(evt)");

	elementSelect.setAttribute("ontouchcancel","deseleccionarElemento(evt)");
	elementSelect.setAttribute("ontouchend","deseleccionarElemento(evt)");
	iman();
}

function deseleccionarElemento(evt){
	testing();
	if(elementSelect != 0){			
		elementSelect.removeAttribute("onmousemove");
		elementSelect.removeAttribute("onmouseout");
		elementSelect.removeAttribute("onmouseup");

		elementSelect.removeAttribute("ontouchmove");
		elementSelect.removeAttribute("ontouchcancel");
		elementSelect.removeAttribute("ontouchend");
		elementSelect = 0;
	}
}

var entorno = document.getElementById('entorno');

function reordenar(evt){
	var padre = evt.target.parentNode;
	var clone = padre.cloneNode(true);
	var id = padre.getAttribute("id");
	entorno.removeChild(document.getElementById(id));
	entorno.appendChild(clone);
	return entorno.lastChild.firstChild;
}

/*Posiciones de las imágenes*/
var origX = [157, 257, 357, 457, 557, 640, 174, 257, 357, 457, 557, 657, 157, 257, 357, 457, 557, 640
			,174, 257, 357, 457, 556, 657, 157, 257, 357, 457, 556, 639, 174, 257, 357, 456, 556, 656];  

var origY = [-23, -40, -23, -40, -23, -40, 60, 60, 60, 60, 60, 60, 160, 160, 160, 160, 160, 160
			,260, 260, 260, 261, 261, 261, 360, 360, 360, 361, 361, 361, 460, 443, 460, 443, 460, 443];

function iman(){
	for(var i=0;i<piezas.length;i++){
		if (Math.abs(currentPosx-origX[i])<15 && Math.abs(currentPosy-origY[i])<15) {
			elementSelect.setAttribute("x",origX[i]);
			elementSelect.setAttribute("y",origY[i]);
		}
	}
}
			
var win = document.getElementById("win");
var paso = document.getElementById("paso");

function testing() {
	var bien_ubicada = 0;
	var padres = document.getElementsByClassName('padre');
	for(var i=0;i<piezas.length;i++){
		var posx = parseFloat(padres[i].firstChild.getAttribute("x"));    
		var posy = parseFloat(padres[i].firstChild.getAttribute("y"));
		ide = padres[i].getAttribute("id");
		if(origX[ide] == posx && origY[ide] == posy){
			bien_ubicada = bien_ubicada + 1;
			paso.play();

		}
	}
	if(bien_ubicada == 36){
		win.play();
		setTimeout(passdata(), 3000);
	}
}


