window.addEventListener("load",inicio);
let sistema = new Sistema();

function inicio(){
    document.getElementById("idBotonAltaEmpleado").addEventListener("click", agregarEmpleado);
    document.getElementById("idBotonAltaRubro").addEventListener("click", agregarRubro);
    document.getElementById("idBotonAltaOferta").addEventListener("click", agregarOferta);
    document.getElementById("idBotonBajaOferta").addEventListener("click", borrarOferta);
    document.getElementById("idBotonOfertasRubro").addEventListener("click", consultarOfertas);
}

function agregarEmpleado(){
    if (document.getElementById("idFormularioEmpleado").reportValidity()){
        let nombreAltaEmpleado = document.getElementById("idNombreAltaEmpleado").value;
        let cedula= document.getElementById("idCedula").value;
        let departamento = document.getElementById("idDepartamento").value;
        let edad = document.getElementById("idEdad").value;
        if(!sistema.estaDepartamento(departamento)){
            sistema.agregarEmpleados(new Empleado(nombreAltaEmpleado, cedula , departamento, edad));
            document.getElementById("idFormularioEmpleado").reset();
            cargarComboEmpleado();
		}
		else{
			alert("Error, ya hay un empleado ingresado con ese departamento");
			document.getElementById("idFormularioEmpleado").reset();
		}
	}
}

function agregarRubro(){
    if (document.getElementById("idFormularioAltaRubro").reportValidity()){
        let nombreAltaRubro = document.getElementById("idNombreAltaRubro").value;
        let descripcion= document.getElementById("idDescripcion").value;
        if(!sistema.estaNombreAltaRubro(nombreAltaRubro)){
            sistema.agregarRubros(new Rubro(nombreAltaRubro, descripcion));
            document.getElementById("idFormularioAltaRubro").reset();
			cargarComboAltaOfertaRubro();
			cargarComboOfertasDeUnRubro();
        }
        else{
            alert("El rubro ingresado está repetido");
			document.getElementById("idFormularioAltaRubro").reset();
        }
	}
}



function agregarOferta(){
	if (document.getElementById("idFormularioAltaOferta").reportValidity()){
		let empleadoOferta = document.getElementById("idEmpleadoOferta").value;
		let rubroOferta = document.getElementById("idRubroOferta").value;
		let detalleOferta = document.getElementById("idDetalle").value;
		let precioOferta = document.getElementById("idPrecio").value;
		let empleados = sistema.totalEmpleados();
		let emp;
		for(let elem of empleados){
			if(elem.nombreAltaEmpleado == empleadoOferta.slice(0, empleadoOferta.indexOf("("))){
				emp = elem;
			}
		}
		if(!sistema.condicionOferta(empleadoOferta, rubroOferta, detalleOferta)){
			sistema.agregarOfertas(new Ofertas(emp, rubroOferta, detalleOferta, precioOferta ));
			document.getElementById("idFormularioAltaOferta").reset();
			cargarComboOfertas();
			}
			else{
				alert("Oferta no válida");
				document.getElementById("idFormularioAltaOferta").reset();
			}
	}
	actualizar();
	cargarListaRoja();
}

function consultarOfertas(){
	let nombreRubro = document.getElementById("idOfertasRubro").value;
	let nuevoArray = [];
	let suma = 0;
	let cont = 0;
	for (let elem of sistema.totalOfertas()){
		if(elem.rubroOferta == nombreRubro){
			suma = suma + parseInt(elem.precioOferta);
			cont = cont + 1;
			nuevoArray.push(elem);
		}
	}
	let promedio = suma/cont;
	document.getElementById("idCaption").innerHTML = "";
	if(nuevoArray.length != 0){
		document.getElementById("idCaption").innerHTML = "Rubro: " + nombreRubro + " Promedio: " + Math.trunc(promedio);
	}
	else{
		document.getElementById("idCaption").innerHTML = "Rubro: " + nombreRubro + " Promedio: " + "Sin datos";
	}
	let tabla = document.getElementById("idBodyTabla");
	tabla.innerHTML = "";
	if(document.getElementById("idPrecioCreciente").checked == true){
		sistema.ordenarOferta(nuevoArray);
		let precioMin = parseInt(nuevoArray[0].precioOferta);
		let precioMax = parseInt(nuevoArray[nuevoArray.length-1].precioOferta);
		let amplitud = (precioMax)-(precioMin);
		for (let elemento of nuevoArray){
			let fila = tabla.insertRow();
			let celda1 = fila.insertCell();
			celda1.innerHTML=elemento.empleadoOferta;
			let celda2 = fila.insertCell();
			celda2.innerHTML=elemento.empleadoOferta.departamento;
			let celda3 = fila.insertCell();
			celda3.innerHTML=elemento.detalleOferta;
			let celda4 = fila.insertCell();
			celda4.innerHTML=elemento.precioOferta;
			if(amplitud == 0){
				let celda5 = fila.insertCell();
				celda5.innerHTML="-";
			}
			else if(elemento.precioOferta <= (amplitud/4)+precioMin){
			let celda5 = fila.insertCell();
			celda5.innerHTML="$";
			}
			else if((elemento.precioOferta > (amplitud/4)+precioMin)&&(elemento.precioOferta <= (amplitud/2)+precioMin)){
			let celda5 = fila.insertCell();
			celda5.innerHTML="$$";
			}
			else if((elemento.precioOferta > (amplitud/2)+precioMin)&&(elemento.precioOferta <= (3*amplitud/4)+precioMin)){
			let celda5 = fila.insertCell();
			celda5.innerHTML="$$$";
			}
			else if(elemento.precioOferta > (3*amplitud/4)+precioMin){
				let celda5 = fila.insertCell();
				celda5.innerHTML="$$$$";
			}
		}
	}
	if(document.getElementById("idNombreDepartamentoCreciente").checked == true){
		let ofertas = sistema.totalOfertas();
		sistema.ordenarAlfabeticamente();
		let precioMin = parseInt(nuevoArray[0].precioOferta);
		let precioMax = parseInt(nuevoArray[nuevoArray.length-1].precioOferta);
		let amplitud = (precioMax)-(precioMin);
		for (let elemento of nuevoArray){
			let fila = tabla.insertRow();
			let celda1 = fila.insertCell();
			celda1.innerHTML=elemento.empleadoOferta;
			let celda2 = fila.insertCell();
			celda2.innerHTML=elemento.empleadoOferta.departamento;
			let celda3 = fila.insertCell();
			celda3.innerHTML=elemento.detalleOferta;
			let celda4 = fila.insertCell();
			celda4.innerHTML=elemento.precioOferta;
			if(amplitud == 0){
				let celda5 = fila.insertCell();
				celda5.innerHTML="-";
			}
			else if(elemento.precioOferta <= (amplitud/4)+precioMin){
			let celda5 = fila.insertCell();
			celda5.innerHTML="$";
			}
			else if((elemento.precioOferta > (amplitud/4)+precioMin)&&(elemento.precioOferta <= (amplitud/2)+precioMin)){
			let celda5 = fila.insertCell();
			celda5.innerHTML="$$";
			}
			else if((elemento.precioOferta > (amplitud/2)+precioMin)&&(elemento.precioOferta <= (3*amplitud/4)+precioMin)){
			let celda5 = fila.insertCell();
			celda5.innerHTML="$$$";
			}
			else if(elemento.precioOferta > (3*amplitud/4)+precioMin){
				let celda5 = fila.insertCell();
				celda5.innerHTML="$$$$";
			}
		}
	}
}

function actualizar(){
	tablaEmpleados();
	cargarListaRoja();
}

function borrarOferta(){
	let posicionOferta = document.getElementById("idBajaOferta").selectedIndex;
    sistema.eliminarOferta(posicionOferta);
	let combo = document.getElementById("idBajaOferta");
	combo.innerHTML = "";
	let ofertas = sistema.totalOfertas();
	for (let elem of ofertas){
		let nodo = document.createElement("option");
		let nodoT = document.createTextNode(elem);
		nodo.appendChild(nodoT);
		combo.appendChild(nodo);
	}
	alert("Oferta eliminada");
	actualizar();
}

function cargarLista(){
    let lista = document.getElementById("idLista");
    lista.innerHTML="";
    let datos= sistema.darTodos();
    for (let elemento of datos){
        let x = document.createElement("LI");
        let nodo = document.createTextNode(elemento);
        x.appendChild(nodo);
        lista.appendChild(x);
    }
}

function limpiarTabla(){
    document.getElementById("idTablaJovenes").innerHTML ="";
}


function cargarComboEmpleado(){
	let combo = document.getElementById("idEmpleadoOferta");
	combo.innerHTML = ""; // vacio
	let empleados = sistema.totalEmpleados();
	for (let elemento of empleados){
		let nodo = document.createElement("option");
		let nodoT = document.createTextNode(elemento);
		nodo.appendChild(nodoT);
		combo.appendChild(nodo);
	}
}

function cargarComboAltaOfertaRubro(){
	let combo = document.getElementById("idRubroOferta");
	combo.innerHTML = ""; // vacio
	let rubros = sistema.totalRubros();
	for (let elem of rubros){
		let nodo = document.createElement("option");
		let nodoT = document.createTextNode(elem);
		nodo.appendChild(nodoT);
		combo.appendChild(nodo);
	}
}

function cargarComboOfertas(){
	let combo = document.getElementById("idBajaOferta");
	combo.innerHTML = ""; // vacio
	let ofertas = sistema.totalOfertas();
	for (let elem of ofertas){
		let nodo = document.createElement("option");
		let nodoT = document.createTextNode(elem);
		nodo.appendChild(nodoT);
		combo.appendChild(nodo);
	}
}

function cargarComboOfertasDeUnRubro(){
	let combo = document.getElementById("idOfertasRubro");
	combo.innerHTML = ""; // vacio
	let rubros = sistema.totalRubros();
	for (let elem of rubros){
		let nodo = document.createElement("option");
		let nodoT = document.createTextNode(elem);
		nodo.appendChild(nodoT);
		combo.appendChild(nodo);
	}
}

function cargarListaAzul(){
	let lista = document.getElementById("idListaAzul");
    lista.innerHTML="";
    let ofertas = sistema.totalOfertas();
	let rubros = sistema.totalRubros();
	let maxOfertas=0;
	let rubroMaxOfertas = "";
	if(maxOfertas==0){
		let x = document.createElement("li");
        let nodo = document.createTextNode("Sin datos");
        x.appendChild(nodo);
        lista.appendChild(x)
	}
	else{
		for (let elemento of rubros){
			let veces = 0;
			for(let elem of ofertas){
				if(elem.nombreAltaRubro == elemento.rubroOferta){
					veces = veces + 1;
				}
			}
			if(veces >= maxOfertas){
				lista.innerHTML="";
				maxOfertas = veces;
				let x = document.createElement("li");
				let nodo = document.createTextNode(elemento.nombreAltaRubro);
				x.appendChild(nodo);
				lista.appendChild(x);
			}
	    }
	}

}

function cargarListaRoja(){
    let lista = document.getElementById("idListaRojo");
    lista.innerHTML="";
    let rubros = sistema.totalRubros();
	let ofertas = sistema.totalOfertas();
	for(let i=0; i<rubros.length; i=i+1){
		let esta=false;
		for(let j=0; j<ofertas.length && !esta; j=j+1){
			if(rubros[i].nombreAltaRubro = ofertas[j].rubroOferta){

				esta = true;
			}
		}
	}
	for(let elem of ofertas){
		let x = document.createElement("li");
		let nodo = document.createTextNode(elem.rubroOferta);
		x.appendChild(nodo);
		lista.appendChild(x);
	}
}

function tablaEmpleados(){
	let tabla = document.getElementById("idTablaEmpleados");
	tabla.innerHTML = "";
	let empleados = sistema.totalEmpleados();
	let ofertas = sistema.totalOfertas();
	for(let elem of empleados){
		let cantidad = 0;
		let fila = tabla.insertRow();
		let celda1 = fila.insertCell();
		celda1.innerHTML=elem.nombreAltaEmpleado;
		let celda2 = fila.insertCell();
		celda2.innerHTML=elem.cedula;
		let celda3 = fila.insertCell();
		celda3.innerHTML=elem.departamento;
		let celda4 = fila.insertCell();
		celda4.innerHTML=elem.edad;
		for(let elemento of ofertas){
			if(elem.cedula == elemento.empleadoOferta.cedula){
				cantidad = cantidad + 1;
			}
		}
		let celda5 = fila.insertCell();
		celda5.innerHTML=cantidad;

	}
}

