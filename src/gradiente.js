
//----------------------------inputs----------------------------------------
const check_vpgn = document.querySelector("#checkbox_VPG");
const check_vfgn = document.querySelector("#checkbox_VFG");
const valorVFG = document.querySelector("#id-VFG");
const primera_cuota = document.querySelector("#id_primera-cuota");
const gradiente_valor = document.querySelector("#id-gradiente");
const tasa_amount = document.querySelector("#id_tasa-number-AVG");
const tasa_label = document.querySelector("#id_tasa-tiempo-AVG");
const time_amount = document.querySelector("#id_tiempo-number-AVG");
const time_label = document.querySelector("#id_tiempo-periodo-AVG");

//--------------------------interfaz resultado-----------------------------
const cell_vpg = document.querySelector("#anualidad_vpg");
const cell_vfg = document.querySelector("#anualidad_vfg");
const cell_gradiente = document.querySelector("#anualidad_gradiente")
const cell_primera = document.querySelector("#anualidad_anualG");
const cell_tasaI = document.querySelector("#anualidad_tasaG");
const cell_pagoS = document.querySelector("#anualidad_pagosG");

//---------------------------botones------------------------------------
const btn_aritmetico = document.querySelector("#id_anual-vencidaG");
const btn_geometrico = document.querySelector("#id_anual-anticipaG");

//definir una clase tiempo para anualidades
class Time {
    constructor(cantidad, status) {
        this.cantidad = cantidad;
        this.status = status;
    }
    leer() {
        this.cantidad = parseInt(time_amount.value);
        this.status = time_label.options[time_label.selectedIndex].value;
    }
}

//definir una clase tasa para anualidades
class Rate {
    constructor(cantidad, status) {
        this.cantidad = cantidad;
        this.status = status;
    }
    leer() {
        this.cantidad = parseFloat(tasa_amount.value);
        this.status = tasa_label.options[tasa_label.selectedIndex].value;
    }
}

function calcularNuevaTasa(tasa, tiempo) {
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

//-------------------------------Gradiente aritmetico---------------
const calcularGAPresente = (cuota, tasa, tiempo, gradiente) => {
    return cuota * ((Math.pow(1 + tasa, tiempo) - 1) / (tasa * Math.pow(1 + tasa, tiempo))) + (gradiente / tasa) * (((Math.pow(1 + tasa, tiempo) - 1) / (tasa * Math.pow(1 + tasa, tiempo))) - (tiempo / Math.pow(1 + tasa, tiempo)));
}

const calcularGAFuturo = (cuota, tasa, tiempo, gradiente) => {
    return cuota * ((Math.pow(1 + tasa, tiempo) - 1) / tasa) + (gradiente / tasa) * (((Math.pow(1 + tasa, tiempo) - 1) / tasa) - tiempo);
}

//---------------------------Gradiente geometrico-----------------
const calcularGGPresente = (cuota, tasa, tiempo, gradiente) => {
    return cuota / (gradiente - tasa) + (Math.pow(1 + gradiente, tiempo) / Math.pow(1 + tasa, tiempo)) - 1;
}

const calcularGGFuturo = (cuota, tasa, tiempo, gradiente) => {
    return cuota / (gradiente - tasa) + Math.pow(1 + gradiente, tiempo) - Math.pow(1 + tasa, tiempo);
}


btn_aritmetico.addEventListener("click", () => {

    let valor = parseFloat(valorVFG.value);
    let cuota = parseFloat(primera_cuota.value);
    let gradiente = parseFloat(gradiente_valor.value);
    let tiempo = new Time(0, "");
    tiempo.leer();
    let tasa = new Rate(0, "");
    tasa.leer();
    let nuevaTasa = calcularNuevaTasa(tasa, tiempo);
    let pagos = tiempo.cantidad;
    let vp = check_vpgn.checked ? valor : "";
    let vf = check_vfgn.checked ? valor : "";

    if (check_vpgn.checked) {

        //calcular el valor presente
        vp = calcularGAPresente(cuota, nuevaTasa, pagos, gradiente);
    } else {

        //calcular el valor futuro
        vf = calcularGAFuturo(cuota, nuevaTasa, pagos, gradiente);
    }

    //configurar la interfaz de resultado con los datos
    cell_vpg.innerText = vp;
    cell_vfg.innerText = vf;
    cell_primera.innerText = cuota;
    cell_gradiente.innerText = gradiente;
    cell_tasaI.innerText = nuevaTasa;
    cell_pagoS.innerText = pagos;




})

btn_geometrico.addEventListener("click", () => {

    let valor = parseFloat(valorVFG.value);
    let cuota = parseFloat(primera_cuota.value);
    let gradiente = parseFloat(gradiente_valor.value) / 100;
    let tiempo = new Time(0, "");
    tiempo.leer();
    let tasa = new Rate(0, "");
    tasa.leer();
    let nuevaTasa = calcularNuevaTasa(tasa, tiempo);
    let pagos = tiempo.cantidad;
    let vp = check_vpgn.checked ? valor : "";
    let vf = check_vfgn.checked ? valor : "";

    if (check_vpgn.checked) {

        //calcular el valor presente
        vp = calcularGGPresente(cuota, nuevaTasa, pagos, gradiente);
    } else {

        //calcular el valor futuro
        vf = calcularGGFuturo(cuota, nuevaTasa, pagos, gradiente);
    }

    //configurar la interfaz de resultado con los datos
    cell_vpg.innerText = vp;
    cell_vfg.innerText = vf;
    cell_primera.innerText = cuota;
    cell_gradiente.innerText = gradiente;
    cell_tasaI.innerText = nuevaTasa;
    cell_pagoS.innerText = pagos;

})
