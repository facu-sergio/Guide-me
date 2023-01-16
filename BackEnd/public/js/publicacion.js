function mostrar(event){
    let textarea =  document.createElement("textarea");
    textarea.setAttribute(`name`,`cuerpo`);
    textarea.setAttribute(`required`,``);
    textarea.classList.add('form-control','mt-1')
    let butonRes = document.createElement("input");
    butonRes.setAttribute(`type`,`submit`);
    butonRes.classList.add('btn','btn-primary','btn-sm','mt-1')
    event.target.classList.add('d-none')
    let buttons =  document.querySelectorAll('.replybtn');
    let res =  document.querySelectorAll('#formRes');
    for(let i = 0;buttons.length> i; i++){
        if(buttons[i]===event.target){
            res[i].appendChild(textarea);
            res[i].appendChild(butonRes);
        }
    }
}
function inicio(){
    let buttons =  document.querySelectorAll('.replybtn');
    /*buttons.forEach(button => {
        button.addEventListener('click',mostrar,button);
    })*/;
    for(let i = 0;buttons.length> i; i++){
        buttons[i].addEventListener('click',mostrar);
    }
}
window.onload = inicio;
