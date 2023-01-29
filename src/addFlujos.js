//--------------btn para van y tir
const addBtn = document.querySelector("#id_añadir");
const form_flujo = document.querySelector("#flow_container-van");

//----------------btn para payback
const addBtnPayback = document.querySelector("#id_añadir-payback");
const form_flujo_payback = document.querySelector("#flow_container-payback");

let countFirst = 2;
let countNext;
let countFirstP = 2;
let countNextP;

addBtn.addEventListener("click", () => {

    countFirst += 1
    countNext = countFirst + 1
    const id = new Date().getTime().toString();
    const div = document.createElement("div");
    div.classList.add("form_flujo-grupo");

    div.innerHTML = `
                        <div class="input_flujo-margen" >
                            <label for="id-flujo1-${id}" class="class_form-label">Año <span>${countFirst}</span></label>
                            <div class="form__field-input">
                                <input type="text" id="id-flujo1-${id}" class="class_flujo-van"  value="">
                            </div>
                        </div>

                        <div>
                            <label for="id-flujo2-${id}" class="class_form-label">Año <span>${countNext}</span></label>
                            <div class="form__field-input">
                                <input type="text" id="id-flujo2-${id}" class="class_flujo-van" value="">
                            </div>
                        </div>
                     `
    form_flujo.appendChild(div);
    countFirst += 1
})

addBtnPayback.addEventListener("click", () => {

    console.log("all ok")
    countFirstP += 1
    countNextP = countFirstP + 1
    const id = new Date().getTime().toString();
    const div = document.createElement("div");
    div.classList.add("form_flujo-grupo");

    div.innerHTML = `
                        <div class="input_flujo-margen" >
                            <label for="id-flujo1-${id}" class="class_form-label">Año <span>${countFirstP}</span></label>
                            <div class="form__field-input">
                                <input type="text" id="id-flujo1-${id}" class="class_flujo-payback"  value="">
                            </div>
                        </div>

                        <div>
                            <label for="id-flujo2-${id}" class="class_form-label">Año <span>${countNextP}</span></label>
                            <div class="form__field-input">
                                <input type="text" id="id-flujo2-${id}" class="class_flujo-payback"  value="">
                            </div>
                        </div>
                     `
    form_flujo_payback.appendChild(div);
    countFirstP += 1;
})