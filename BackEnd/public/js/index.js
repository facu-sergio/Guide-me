function inicio(){
    let cuerpo = document.querySelectorAll('#cuerpo');
    console.log(cuerpo)
    for(let i=0;i<cuerpo.length;i++){
        cuerpo[i].innerHTML = cuerpo[i].innerHTML.substring(0,150);
    }
}

window.onload = inicio;
