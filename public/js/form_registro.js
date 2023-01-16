let i = 1;
function newCarrera(){
    let divNuevaCarrera = document.querySelector('#rowCarreras')
    let divCarrera = document.querySelector('#divCarrera')
    let divUniversidad = document.querySelector('#divUniversidad')
    
    let inputCarrera =  document.createElement("input");
    let labelCarrera = document.createElement("label");
    let inputUniversidad =  document.createElement("input");
    let labelUniversidad = document.createElement("label");
    let divInvalidCarrera = document.createElement("div");
    let divInvalidUniversidad = document.createElement("div");

    inputCarrera.setAttribute(`name`,`carrera[]`);
    inputCarrera.setAttribute(`id`,`carrera`);
    inputCarrera.setAttribute(`class`,`form-control`);
    inputCarrera.setAttribute(`type`,`text`);
    labelCarrera.setAttribute(`for`,`carrera[]`);
    labelCarrera.setAttribute(`class`,`form-label mt-2`)
    labelCarrera.innerHTML = "Nombre de carrera:";

    inputUniversidad.setAttribute(`name`,`universidad[]`);
    inputUniversidad.setAttribute(`id`,`universidad`);
    inputUniversidad.setAttribute(`class`,`form-control`);
    inputUniversidad.setAttribute(`type`,`text`);
    labelUniversidad.setAttribute(`for`,`universidad[]`);
    labelUniversidad.setAttribute(`class`,`form-label mt-2`)
    labelUniversidad.innerHTML = "Universidad:";

    divInvalidCarrera.setAttribute(`class`,`invalid-feedback text-warning`)
    divInvalidCarrera.innerHTML = "Ingrese una carrera";
    divInvalidUniversidad.setAttribute(`class`,`invalid-feedback text-warning`)
    divInvalidUniversidad.innerHTML = "Ingrese una Universidad";


    divCarrera.appendChild(labelCarrera);
    divCarrera.appendChild(inputCarrera);
    divCarrera.appendChild(divInvalidCarrera);
    divUniversidad.appendChild(labelUniversidad);
    divUniversidad.appendChild(inputUniversidad);
    divUniversidad.appendChild(divInvalidUniversidad);
    divNuevaCarrera.appendChild(divCarrera);
    divNuevaCarrera.appendChild(divUniversidad);
    i++;
}

function validar(e){
    let invalidos =  document.querySelectorAll('.is-invalid');
    //limpio los que tengan la clase invalid
    invalidos.forEach((e)=>{
        e.classList.remove('is-invalid');
    })
    let flag = true;
    let aceptExtension = ['jpeg', 'jpg','png'];
    let count = 0;
    let nombre =  document.querySelector('#nombre');
    let apellido =  document.querySelector('#apellido');
    let fecha =  document.querySelector('#fecha_nac');
    let fechaParsed =  Date.parse(fecha.value);
    let fechaMax = Date.parse('2004-12-31');
    let img =  document.querySelector('#imagen');
    let imgExtension =  document.querySelector('#imagen').value.split('.').pop().toLowerCase();
    let email = document.querySelector('#email');
    let password =  document.querySelector('#password');
    let carrera =  document.querySelectorAll('#carrera')
    let universidad =  document.querySelectorAll('#universidad')
    //valido nombre
    if(nombre.value == ""){
        flag = false;
        nombre.classList.add('is-invalid');
    }else{
        nombre.classList.add('is-valid');
    }
    //valido apellido
    if(apellido.value == ""){
        flag = false;
        apellido.classList.add('is-invalid');
    }else{
        apellido.classList.add('is-valid');
    }
    //valido fecha
    if(fechaParsed > fechaMax){
        flag = false;
        fecha.classList.add('is-invalid');
    }else{
        fecha.classList.add('is-valid');
    }
    //valido imagen
    for(let i=0;i<aceptExtension.length;i++){
        if(imgExtension===aceptExtension[i]){
            count++;
        }
    }
    if(count<1){
        flag = false;
        img.classList.add('is-invalid');
    }else{
        img.classList.add('is-valid');
    }

    //valido email
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)){
        flag = false;
        email.classList.add('is-invalid');
    }else{
        email.classList.add('is-valid');
    }
     //valido password
    if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password.value)){
        flag = false;
        password.classList.add('is-invalid');
    }else{
        password.classList.add('is-valid');
    }
    //valido carreras
    for(let i=0;i<carrera.length;i++){
        if(carrera[i].value==""){
            flag = false;
            carrera[i].classList.add('is-invalid');
        }else{
            carrera[i].classList.add('is-valid');
        }
    }
     //valido universidades
     for(let i=0;i<universidad.length;i++){
        if(universidad[i].value==""){
            flag = false;
            universidad[i].classList.add('is-invalid');
        }else{
            universidad[i].classList.add('is-valid');
        }
    }
    if(flag===false){
        e.preventDefault();
    }
}

function inicio(){
     document.querySelector('#addCarrera').addEventListener('click',newCarrera);
     document.querySelector('#mi_formulario').addEventListener('submit',validar);
}

window.onload = inicio;