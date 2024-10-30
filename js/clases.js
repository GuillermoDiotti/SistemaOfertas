class Sistema{
    constructor(){
		this.listaEmpleados=[];
        this.listaRubros=[];
        this.listaOfertas=[];
    }

    agregarEmpleados(nuevoEmpleado){
		this.listaEmpleados.push(nuevoEmpleado);
    }

    agregarRubros(nuevoRubro){
        this.listaRubros.push(nuevoRubro);
    }
	
	agregarOfertas(nuevaOferta){
		this.listaOfertas.push(nuevaOferta);
	}

	totalEmpleados(){
		return this.listaEmpleados;
	}

    totalRubros(){
        return this.listaRubros;
    }
	
	totalOfertas(){
		return this.listaOfertas;
	}

    estaDepartamento(departamento){
        let departamentoRepetido = false;
        for (let i = 0; i < this.listaEmpleados.length && !departamentoRepetido; i++){
			if (this.listaEmpleados[i].departamento == departamento){
				departamentoRepetido = true;
			}
        }
        return departamentoRepetido;
    }   
    
    estaNombreAltaRubro(nombreAltaRubro){
        let nombreRepetido = false;
        for (let i = 0; i < this.listaRubros.length && !nombreRepetido; i++){
            if (this.listaRubros[i].nombreAltaRubro == nombreAltaRubro){
                nombreRepetido = true;
            }
        }
        return nombreRepetido;             
	}
	
	condicionOferta(empleadoOferta, rubroOferta, detalleOferta){
		let ofertaRepetida = false;
		for(let i=0; i< this.listaOfertas.length && !ofertaRepetida; i++){
			if((this.listaOfertas[i].empleadoOferta == empleadoOferta)&&(this.listaOfertas[i].rubroOferta == rubroOferta)&&(this.listaOfertas[i].detalleOferta == detalleOferta)){
				ofertaRepetida = true;
			}
		}
		return ofertaRepetida;
	}
	
	eliminarOferta(unaOferta){
		this.listaOfertas.splice((unaOferta), 1);
	}
	
	ordenarOferta(array){
		array.sort(function(a, b){return a.precioOferta - b.precioOferta});
	}
	
	ordenarAlfabeticamente(){
		this.listaOfertas.sort(function(a, b){return a.listaEmpleado.departamento.localeCompare(array.listaEmpleado.departamento)(b)});
	}
	
	
	
}

class Empleado {
    constructor(nombreAltaEmpleado, cedula, departamento, edad) {
        this.nombreAltaEmpleado = nombreAltaEmpleado;
        this.cedula = cedula;
        this.departamento = departamento;
        this.edad = edad;
    }
	toString(){
		return this.departamento;
	}
}
class Rubro {
    constructor(nombreAltaRubro, descripcion) {
        this.nombreAltaRubro = nombreAltaRubro;
        this.descripcion = descripcion;
    }
	toString(){
		return this.nombreAltaRubro;
	}
}

class Ofertas {
	constructor(empleadoOferta, rubroOferta, detalleOferta, precioOferta ){
		this.empleadoOferta = empleadoOferta;
		this.rubroOferta = rubroOferta;
		this.detalleOferta = detalleOferta;
		this.precioOferta = precioOferta;
	}
	toString(){
		return this.empleadoOferta + " " + this.rubroOferta + " " + this.detalleOferta + " " + this.precioOferta;
	}
	
}