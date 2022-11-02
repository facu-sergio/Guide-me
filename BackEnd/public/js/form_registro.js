
let i = 1;
function mostrar(){
    let divNuevaCarrera = document.querySelector('#rowCarreras')
    let divCarrera = document.querySelector('#divCarrera')
    let divUniversidad = document.querySelector('#divUniversidad')

    let inputCarrera =  document.createElement("input");
    let labelCarrera = document.createElement("label");
    let inputUniversidad =  document.createElement("input");
    let labelUniversidad = document.createElement("label");

    inputCarrera.setAttribute(`name`,`carrera${i}`);
    inputCarrera.setAttribute(`id`,`carrera${i}`);
    inputCarrera.setAttribute(`class`,`form-control`);
    inputCarrera.setAttribute(`type`,`text`);
    labelCarrera.setAttribute(`for`,`carrera${i}`);
    labelCarrera.setAttribute(`class`,`form-label mt-2`)
    labelCarrera.innerHTML = "Nombre de carrera:";

    inputUniversidad.setAttribute(`name`,`universidad${i}`);
    inputUniversidad.setAttribute(`id`,`universidad${i}`);
    inputUniversidad.setAttribute(`class`,`form-control`);
    inputUniversidad.setAttribute(`type`,`text`);
    labelUniversidad.setAttribute(`for`,`universidad${i}`);
    labelUniversidad.setAttribute(`class`,`form-label mt-2`)
    labelUniversidad.innerHTML = "Universidad:";

    divCarrera.appendChild(labelCarrera);
    divCarrera.appendChild(inputCarrera);
    divUniversidad.appendChild(labelUniversidad);
    divUniversidad.appendChild(inputUniversidad);
    divNuevaCarrera.appendChild(divCarrera);
    divNuevaCarrera.appendChild(divUniversidad);
    i++;
}

function inicio(){
     document.querySelector('#addCarrera').addEventListener('click',mostrar)
}



window.onload = inicio;