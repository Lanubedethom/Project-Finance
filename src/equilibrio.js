
//----------------------inputs-----------------------------------
const cf = document.querySelector("#id_inversion-cf");
const pu = document.querySelector("#id_inversion-pu");
const cu = document.querySelector("#id_inversion-cu");

//----------------Interfaz---------------------------------------
const cell_equilbrio = document.querySelector("#cell_equilibrio");
const cell_cf = document.querySelector("#cell_cf");
const cell_pu = document.querySelector("#cell_pu");
const cell_cu = document.querySelector("#cell_cu");

//--------------------btn de resultado-----------------------------
const btnEquilibrio = document.querySelector("#id_equilibrio-btn");

const calculateBalance = (cf, pu, cu) => {

    return cf / (pu - cu);
}

btnEquilibrio.addEventListener("click", () => {

    let cfv = parseFloat(cf.value);
    let puv = parseFloat(pu.value);
    let cuv = parseFloat(cu.value);

    let result = calculateBalance(cfv, puv, cuv);

    cell_equilbrio.innerText = result;
    cell_cf.innerText = cfv;
    cell_pu.innerText = puv;
    cell_cu.innerHTML = cuv;
})



