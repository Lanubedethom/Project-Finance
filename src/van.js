
let Finance = require('financejs');
let finance = new Finance();

//---------------------------inputs----------------------------------
const inicial = document.querySelector("#id-invesion");
const rate_amount = document.querySelector("#id_tasa-number-inversion");
const rate_status = document.querySelector("#id_tasa-tiempo-inversion");

//----------------------------interfaz-------------------------------
const cell_van = document.querySelector("#cell_van");
const cell_tir = document.querySelector("#cell_tir");

//-----------------------------btn Resultado---------------------------
const button_calculate = document.querySelector("#id_calcular-van");


const calculateVAN = (inversion, flujos, tasa) => {

    //Calcular VAn
    let vpt = 0;
    for (let i=0; i<flujos.length; i++) {
        vpt += flujos[i] / Math.pow(1 + tasa, i + 1);
    }

    return (vpt - inversion);
}

const calculateTIR = (inversion, flujos) => {
    //return finance.IRR(-500000, 200000, 300000, 200000);
    return finance.IRR(-inversion, ...flujos);
}

//definir una clase tasa para anualidades
class Tassa {
    constructor(cantidad, status) {
        this.cantidad = cantidad;
        this.status = status;
    }
    leer() {
        this.cantidad = parseFloat(rate_amount.value);
        this.status = rate_status.options[rate_status.selectedIndex].value;
    }
}


button_calculate.addEventListener("click", () => {

    const flows = document.querySelectorAll(".class_flujo-van");
    let inicial_value = parseFloat(inicial.value);
    let tasa = new Tassa(0, "");
    tasa.leer();
    let array_flujos = Array.from(flows).map(flujo => parseFloat(flujo.value));
    array_flujos = array_flujos.filter(flujo => {
        if (!isNaN(flujo)) {
            return flujo
        }
    })
    let van = "";
    let tir = "";
    console.log(array_flujos);
    console.log("ghola")
    if (isNaN(tasa.cantidad)) {

        //si la tasa esta vacia, calcular TIR
        tir = calculateTIR(inicial_value, array_flujos);
    } else {
        van = calculateVAN(inicial_value, array_flujos, tasa.cantidad / 100);
        tir = calculateTIR(inicial_value, array_flujos);
    }

    cell_van.innerText = van;
    cell_tir.innerText = tir;


})