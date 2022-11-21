function inicio(){
    let cuerpo = document.querySelectorAll('#cuerpo');
    for(let i=0;i<cuerpo.length;i++){
        cuerpo[i].innerHTML = cuerpo[i].innerHTML.substring(0,105);
    }
}

window.onload = inicio;
