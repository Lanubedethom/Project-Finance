//seleccionar etiquetas componentes
const operation = document.querySelector(".class_select-operation");
const igv = document.querySelector("#form_IGV");
const interes = document.querySelector("#form_interes");
const gradiente = document.querySelector("#form_gradiente");
const amortizacion = document.querySelector("#form_amortizacion");
const anualidad = document.querySelector("#form_anualidad");
const van = document.querySelector("#form_VAN");
const tir = document.querySelector("#form_TIR");
const payback = document.querySelector("#form_payback");
const equilibrio = document.querySelector("#form_equilibrio");

//componentes que muestran el resultado
const result_igv = document.querySelector("#result_igv");
const result_anualidad = document.querySelector("#result_anualidad");
const result_interes = document.querySelector("#result_interes");
const result_gradiente = document.querySelector("#result_gradiente");
const result_van = document.querySelector("#result_van");
const result_payback = document.querySelector("#result_payback");
const result_equilibrio = document.querySelector("#result_equilibrio");

//input del checkbox de formulario anualidad
const check_vp = document.querySelector("#checkbox_VP");
const check_vf = document.querySelector("#checkbox_VF");

//input del checkbox de formulario gradiente
const check_vpg = document.querySelector("#checkbox_VPG");
const check_vfg = document.querySelector("#checkbox_VFG");

const forms = document.querySelectorAll(".form_group");
const forms_result = document.querySelectorAll(".form_group-result");

//ocultar formularios
const hidden = (val) => {
    forms.forEach(div => {
        if (div.id !== val.id)
            div.style.display = "none";
    })
}

//ocultar interfaces resultado
const hiddenResult = (val) => {
    forms_result.forEach((div) => {
        if (div.id !== val.id) {
            div.style.display = "none";
        }
    })
}

hidden(interes);
hiddenResult(result_interes);

//este módulo sirve para seleccionar solo uno de las dos
//opciones que ofrece el checkbox en el formulario anualidades
check_vf.addEventListener("click", () => {
    check_vp.checked = false;
})

check_vp.addEventListener("click", () => {
    check_vf.checked = false;
})

check_vfg.addEventListener("click", () => {
    check_vpg.checked = false;
})

check_vpg.addEventListener("click", () => {
    check_vfg.checked = false;
})



//hacer visible la opción seleccionada
operation.addEventListener("change", (e) => {

    const option = operation.selectedOptions[0];
    const value = option.value;

    switch (value) {
        case "form_IGV":
            igv.style.display = "block";
            result_igv.style.display = "block";
            hidden(igv)
            hiddenResult(result_igv);
            break;
        case "form_interes":
            interes.style.display = "block";
            result_interes.style.display = "block";
            hidden(interes);
            hiddenResult(result_interes);
            break;
        case "form_amortizacion":
            amortizacion.style.display = "block";
            hidden(amortizacion)
            break;
        case "form_anualidad":
            anualidad.style.display = "block";
            result_anualidad.style.display = "block";
            hidden(anualidad);
            hiddenResult(result_anualidad);
            break;
        case "form_gradiente":
            gradiente.style.display = "block";
            result_gradiente.style.display = "block";
            hidden(gradiente);
            hiddenResult(result_gradiente);
            break;
        case "form_VAN":
            van.style.display = "block";
            result_van.style.display = "block";
            hidden(van)
            hiddenResult(result_van);
            break
        case "form_payback":
            payback.style.display = "block";
            result_payback.style.display = "block";
            hidden(payback)
            hiddenResult(result_payback)
            break;
        case "form_equilibrio":
            equilibrio.style.display = "block";
            result_equilibrio.style.display = "block";
            hidden(equilibrio);
            hiddenResult(result_equilibrio);
            break;

    }



})