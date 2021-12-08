const displayValorAnterior = document.getElementById('valor_anterior');
const displayValorActual = document.getElementById('valor_actual');
const botonesNumeros = document.querySelectorAll('.numero');
const botonesOperador = document.querySelectorAll('.operador');




class Calculadora{
    sumar(num1,num2) {
        return num1 + num2;
    }
    restar(num1,num2) {
        return num1 - num2;
    }
    multiplicar(num1,num2) {
        return num1 * num2;
    }
    dividir(num1,num2) {
        return num1 / num2;
    }
}

class Display{
    constructor(displayValorAnterior, displayValorActual){
        this.displayValorActual = displayValorActual;
        this.displayValorAnterior = displayValorAnterior;
        this.calculador = new Calculadora();
        this.tipoOperacion = undefined;
        this.valorActual ='';
        this.valorAnterior ='';
        this.signos ={
            sumar: '+',
            dividir: '/',
            multiplicar: 'x',
            restar: '-',
        }
    }
    agregarNumero(numero){
        if(numero === '.' && this.valorActual.includes('.')) return
        this.valorActual = this.valorActual.toString() + numero.toString() ;
        this.imprimirValores();
    }

    borrar(){
        this.valorActual = '';
        this.valorAnterior = '';
        this.tipoOperacion = undefined;
        this.imprimirValores();
    }

    calcular(){
        const valorAnterior = parseFloat(this.valorAnterior);
        const valorActual = parseFloat(this.valorActual);

        if(isNaN( valorActual) || isNaN( valorAnterior) ) return
        this.valorActual = this.calculador[this.tipoOperacion]( valorAnterior, valorActual);

    }

    computar(tipo){
        this.tipoOperacion !== 'igual' && this.calcular();
        this.tipoOperacion = tipo;
        this.valorAnterior = this.valorActual || this.valorAnterior;
        this.valorActual = '';
        this.imprimirValores();
    }

    imprimirValores(){
        this.displayValorActual.textContent = this.valorActual;
        this.displayValorAnterior.textContent = `${this.valorAnterior} ${this.signos[this.tipoOperacion] || ''}`;
    }
}

const display = new Display(displayValorAnterior,displayValorActual);

botonesNumeros.forEach(boton =>{
    boton.addEventListener('click',() => display.agregarNumero(boton.innerHTML));
});

botonesOperador.forEach(boton =>{
    boton.addEventListener('click',() => display.computar(boton.value));
});