function nextPage(){
    var urlparams =  new URLSearchParams(window.location.search);
    var page = urlparams.get("page");
    if(page===null){
        page = 2;
    }else{
        page = parseInt(page) + 1;
    }
    document.querySelector('#next').href =`/listPublicaciones?page=${page}`
}
function prevPage(){
    var urlparams =  new URLSearchParams(window.location.search);
    var page = parseInt(urlparams.get("page"))-1;
    document.querySelector('#previus').href =`/listPublicaciones?page=${page}`
}
function inicio(){
    let cuerpo = document.querySelectorAll('#cuerpo');
    for(let i=0;i<cuerpo.length;i++){
        cuerpo[i].innerHTML = cuerpo[i].innerHTML.substring(0,105);
    }
    var urlparams =  new URLSearchParams(window.location.search);
    var page = parseInt(urlparams.get("page"));
    let hojas =  document.querySelectorAll('.foil');
    if(page>=hojas.length){
        document.querySelector('#next').classList.add('d-none')
    }
    if(page<2 || !page){
        document.querySelector('#previus').classList.add('d-none')
    }
    document.querySelector('#next').addEventListener('click',nextPage);
    document.querySelector('#previus').addEventListener('click',prevPage);
}

window.onload = inicio;
