function inicio(){
    let cuerpo = document.querySelectorAll('#cuerpo');
    for(let i=0;i<cuerpo.length;i++){
        cuerpo[i].innerHTML = cuerpo[i].innerHTML.substring(0,140);
    }
}

window.onload = inicio;
