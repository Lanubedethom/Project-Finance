

//-------------------inputs----------------------------------
const check_vpi = document.querySelector("#checkbox_VP");
const check_vfi = document.querySelector("#checkbox_VF");
const input_valor = document.querySelector("#id-VF");
const input_anualidad = document.querySelector("#id-anualidad");
const tiempo_cantidad = document.querySelector("#id_tiempo-number-AV");
const tiempo_status = document.querySelector("#id_tiempo-periodo-AV");
const tasa_cantidad = document.querySelector("#id_tasa-number-AV");
const tasa_status = document.querySelector("#id_tasa-tiempo-AV");

//------------------------etiquetas resultado---------------------------
const cell_vp = document.querySelector("#anualidad_vp");
const cell_vf = document.querySelector("#anualidad_vf");
const cell_anual = document.querySelector("#anualidad_anual");
const cell_tasa = document.querySelector("#anualidad_tasa");
const cell_pagos = document.querySelector("#anualidad_pagos");

//-----------------botones--------------------------
const btn_vencida = document.querySelector("#id_anual-vencida");
const btn_anticipa = document.querySelector("#id_anual-anticipa");


//definir una clase tiempo para anualidades
class Tiempo {
    constructor(cantidad, status) {
        this.cantidad = cantidad;
        this.status = status;
    }
    leer() {
        this.cantidad = parseInt(tiempo_cantidad.value);
        this.status = tiempo_status.options[tiempo_status.selectedIndex].value;
    }
}

//definir una clase tasa para anualidades
class Tasa {
    constructor(cantidad, status) {
        this.cantidad = cantidad;
        this.status = status;
    }
    leer() {
        this.cantidad = parseFloat(tasa_cantidad.value);
        this.status = tasa_status.options[tasa_status.selectedIndex].value;
    }
}

//calcular la nueva tasa en función del periodo de pago
const calculateNewRate = (tasa, tiempo) => {

    let newRate = 0;

    if (tiempo.status === "meses") {

        if (tasa.status === "meses")
            newRate = tasa.cantidad;
        else if (tasa.status === "bimestre")
            newRate = tasa.cantidad/2;
        else if (tasa.status === "trimestre")
            newRate = tasa.cantidad/3;
        else if (tasa.status === "agnos")
            newRate = tasa.cantidad/12;
        else if (tasa.status === "semestre")
            newRate = tasa.cantidad / 6;
    }
    else if (tiempo.status === "bimestre") {

        if (tasa.status === "meses")
            newRate = tasa.cantidad*2;
        else if (tasa.status === "bimestre")
            newRate = tasa.cantidad;
        else if (tasa.status === "trimestre")
            newRate = (tasa.cantidad/3)*2;
        else if (tasa.status === "agnos")
            newRate = (tasa.cantidad/6);
        else if (tasa.status === "semestre")
            newRate = tasa.cantidad / 3;
    }
    else if (tiempo.status === "trimestre") {

        if (tasa.status === "meses")
            newRate = tasa.cantidad*3;
        else if (tasa.status === "bimestre")
            newRate = (tasa.cantidad/2)*3;
        else if (tasa.status === "trimestre")
            newRate = tasa.cantidad;
        else if (tasa.status === "agnos")
            newRate = (tasa.cantidad/4);
        else if (tasa.status === "semestre")
            newRate = tasa.cantidad / 2
    }
    else if (tiempo.status === "agnos") {

        if (tasa.status === "meses")
            newRate = tasa.cantidad*12;
        else if (tasa.status === "bimestre")
            newRate = tasa.cantidad*6;
        else if (tasa.status === "trimestre")
            newRate = tasa.cantidad*4;
        else if (tasa.status === "agnos")
            newRate = tasa.cantidad;
        else if (tasa.status === "semestre")
            newRate = tasa.cantidad*2
    }
    else if (tiempo.status === "semestre") {

        if (tasa.status === "meses")
            newRate = tasa.cantidad*6;
        else if (tasa.status === "bimestre")
            newRate = tasa.cantidad*3;
        else if (tasa.status === "trimestre")
            newRate = tasa.cantidad*2;
        else if (tasa.status === "agnos")
            newRate = tasa.cantidad/2;
        else if (tasa.status === "semestre")
            newRate = tasa.cantidad
    }

    return newRate / 100;
}

//-------------------calcular los valores de la anualidad vencida
const calculateVPVencida = (anualidad, tasa, tiempo) => {
    return anualidad * (1 - Math.pow(1 + tasa, -tiempo)) / tasa;

}

const calculateVFVencida = (anualidad, tasa, tiempo) => {

    return anualidad * ((Math.pow(1 + tasa, tiempo) - 1) / tasa);
}

const calculateAnualVencidaVP = (valor, tasa, tiempo) => {
    return  valor / ((1 - Math.pow(1 + tasa, -tiempo)) / tasa);
}

const calculateAnualVencidaVF = (valor, tasa, tiempo) => {
    return valor / ((Math.pow(1 + tasa, tiempo) - 1) / tasa)
}



//------------------calcular los valores de la anualidad anticipada
const calculateVPAnticipada = (anualidad, tasa, tiempo) => {
    return anualidad * (1 + (1 - Math.pow(1 + tasa, -(tiempo - 1))) / tasa)
}

const calculateVFAnticipada = (anualidad, tasa, tiempo) => {
    return anualidad * (((Math.pow(1+tasa, tiempo+1) -1) / tasa) -1);
}

const calculateAnualAnticipadaVP = (valor, tasa, tiempo) => {
    return valor / (1 + (1 - Math.pow(1 + tasa, -(tiempo - 1))) / tasa)
}

const calculateAnualAnticipadaVF = (valor, tasa, tiempo) => {
    return valor / (((Math.pow(1+tasa, tiempo+1) -1) / tasa) -1)
}





btn_vencida.addEventListener("click", (e) => {

    let valor = parseFloat(input_valor.value);
    let vp = check_vpi.checked ? valor : "";
    let vf = check_vfi.checked ? valor : "";
    let anual = parseFloat(input_anualidad.value);
    let tiempo = new Tiempo(0, "");
    tiempo.leer();
    let tasa = new Tasa(0, "");
    tasa.leer();
    let newRate = calculateNewRate(tasa, tiempo)
    let pagos = tiempo.cantidad;

    e.preventDefault();

    //calcular el valor presente
    //si el input del valor está en blanco, calcular
    if (!valor) {

        //tenemos que evaluar el valor del checkbox
        if (check_vpi.checked) {

            //calcular el valor presente
            vp = calculateVPVencida(anual, newRate, pagos)
        } else {

            //calcular el valor futuro
            vf = calculateVFVencida(anual, newRate, pagos)
        }
        //si el input de anualidad esta en blanco, calcular
    } else if (!anual) {

        //tenemos que evaluar el valor del checkbox
        if (check_vpi.checked) {

            //calcular anualidad con valor presente
            anual = calculateAnualVencidaVP(valor, newRate, pagos);
        } else {

            //calcular anualidad con valor futuro
            anual = calculateAnualVencidaVF(valor, newRate, pagos);
        }
    }

    //configurar la interfaz de resultado con los datos
    cell_vp.innerText = vp;
    cell_vf.innerText = vf;
    cell_anual.innerText = anual;
    cell_tasa.innerText = newRate;
    cell_pagos.innerText = pagos;



})

btn_anticipa.addEventListener("click", (e) => {

    e.preventDefault();

    let valor = parseFloat(input_valor.value);
    let vp = check_vpi.checked ? valor : "";
    let vf = check_vfi.checked ? valor : "";
    let anual = parseFloat(input_anualidad.value);
    let tiempo = new Tiempo(0, "");
    tiempo.leer();
    let tasa = new Tasa(0, "");
    tasa.leer();
    let newRate = calculateNewRate(tasa, tiempo)
    let pagos = tiempo.cantidad;

    //calcular el valor presente
    //si el input del valor está en blanco, calcular
    if (!valor) {

        //tenemos que evaluar el valor del checkbox
        if (check_vpi.checked) {

            //calcular el valor presente
            vp = calculateVPAnticipada(anual, newRate, pagos)
        } else {

            //calcular el valor futuro
            vf = calculateVFAnticipada(anual, newRate, pagos)
        }
        //si el input de anualidad esta en blanco, calcular
    } else if (!anual) {

        //tenemos que evaluar el valor del checkbox
        if (check_vpi.checked) {

            //calcular anualidad con valor presente
            anual = calculateAnualAnticipadaVP(valor, newRate, pagos);
        } else {

            //calcular anualidad con valor futuro
            anual = calculateAnualAnticipadaVF(valor, newRate, pagos);
        }
    }

    //configurar la interfaz de resultado con los datos
    cell_vp.innerText = vp;
    cell_vf.innerText = vf;
    cell_anual.innerText = anual;
    cell_tasa.innerText = newRate;
    cell_pagos.innerText = pagos;

})