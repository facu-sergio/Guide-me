/*
function validarFormulario(event) {
    validar = document.querySelector(click,"#enviar_form").value;
    let esValido = true;

    // Nombre
    let elNombre = document.getElementById('nombre_us');
    elNombre.classList.remove('is-invalid');
    // 2 palabras, min 5 y max 50
    // valida largo de string
    if (elNombre.value.length < 5 || elNombre.value.length>60) {
        esValido = false;
        elNombre.classList.add('is-invalid');
    }
    // valida cantidad de palabras
    let arrPalabras = elNombre.value.split(/ +/);

    let elApellido = document.getElementById('apellido_us');
    elApellido.classList.remove('is-invalid');
    // 2 palabras, min 5 y max 50
    // valida largo de string
    if (elApellido.value.length < 5 || elApellido.value.length>20) {
        esValido = false;
        elApellido.classList.add('is-invalid');
    }
    // valida cantidad de palabras
    let arrApellido = elApellido.value.split(/+/);



    // let arrPalabras = elNombre.value.split(' '); 
    // Se prefiere usar expresiones regulares por si se da el caso de que pongan 
    // dos espacios para separar una palabra (ver en ese caso como queda la variable arrPalabras con console.log)
    
    // valida que las palabras sean solo de letras (sin simbolos, numeros, ni acentos ni ñ)
    // Esto es opcional, no estaba en la consigna
    let regex = new RegExp('^[a-zA-Z ]+$');
    if (!regex.test(elNombre.value)) {
        esValido = false;
        elNombre.classList.add('is-invalid');
    }

    let regex2 = new RegExp('^[a-zA-Z]+$');
    if (!regex.test(elApellido.value)) {
        esValido = false;
        elApellido.classList.add('is-invalid');
    }

    // Mail
    let elMail = document.getElementById('mail');
    // regexp email valido, max 120 caracteres
    // TODO:

    // Fecha
    let elFecha = document.getElementById('fecha_nac');
    // 1/9/2017 a hoy
    // epoch 
    let dateFrom = Date.parse('2017-09-01');
    let dateTo = Date.now();
    let dateForm = Date.parse(elFecha.value);
    console.log(dateFrom, dateTo, dateForm);
    // TODO: validar

    // Descripcion
    let elDescripcion = document.getElementById('descripcion');
    // min 30
    // TODO:

    if (esValido) {
        console.log('El formulario es valido');
    } else {
        console.log('El formulario es invalido');
    }
    event.preventDefault();
}
*/

function validar_form(event){
    event.preventDefault()
    let bandera= true;
    

let nombre = document.querySelector("#nombre_us")

if (nombre.value.length < 3 ){

    nombre.classList.add("is-invalid");
    bandera = false;
}else{
    nombre.classList.add("is-valid");
}
if (bandera == true) {
    alert("todo ok")
}



}

function inicio(){
    let formulario = document.querySelector("#mi_formulario")
    formulario.addEventListener('submit', validar_form)
    let pattern = /e/;    
    console.log(pattern.test("nombr"))
    let text = "How are you doing today?";
    const myArray = text.split(" ");
    console.log(myArray);

}
window.onload= inicio;