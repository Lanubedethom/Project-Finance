
//----------------------------inputs-------------------------------
const inversion = document.querySelector("#id_inversion-payback");


//---------------------------interfaz--------------------------------
const cell_payback = document.querySelector("#cell_payback");
const cell_inversion = document.querySelector("#cell_inversion");
const cell_ingresos = document.querySelector("#cell_ingresos");

//-------------------------------btn Resultado-----------------------------
const btnCalcular = document.querySelector("#id_calcular-payback");

const calculatePayback = (inversion, flujos) => {

    let years = 0;

    for (let flujo of flujos) {
        years += 1;
        inversion -= flujo;
        //evaluar las condiciones para cuando se aproxima a la inversion
        if (inversion === 0) {
            //cuando es igual a cero, el payback es igual a year
            return years;
        } else if (inversion < 0) {
            //calcular usando el módulo payback
            inversion += flujo;
            years -= 1;
            return years + (inversion / flujo);
        } 
    }
}

//calcular el total de ingresos totales
const calculateTotalRevenue = (flujos) => {
    let total = 0;
    for (let i of flujos) {
        total += i;
    }
    return total;
}


btnCalcular.addEventListener("click", () => {

    const flujos = document.querySelectorAll(".class_flujo-payback");
    let array_flujos = Array.from(flujos).map(flujo => parseFloat(flujo.value));
    array_flujos = array_flujos.filter(flujo => {
        if (!isNaN(flujo)) {
            return flujo
        }
    })
    let inver_value = parseFloat(inversion.value);

    console.log(array_flujos);
    //console.log(typeof array_flujos[0])

    let time = calculatePayback(inver_value, array_flujos);
    if (time === undefined) {
        time = "Ingreso total < Inversion"
    }
    let total = calculateTotalRevenue(array_flujos);

    cell_payback.innerText = time;
    cell_inversion.innerText = inver_value;
    cell_ingresos.innerText = total;


})