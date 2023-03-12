//const server = 'https://guide-me..com/'
//const server =  'http://localhost:3000/';
const server = 'https://guide-me.up.railway.app/'
async function saveNotificacion(idRemitente,IdDestinatario,idRedirect,tipo){
    try{
        const response = await fetch(`${server}savenotificacion`,{
                method:'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    idRemitente: idRemitente,
                    idDestinatario: IdDestinatario,
                    idRedirect: idRedirect,
                    tipo:tipo
                  })
            });
            const json =  await response.json();
                count.innerHTML  = parseInt(count.innerHTML)-1
                megusta.classList.remove('d-none')
                nomegusta.classList.add('d-none');
            
        }catch (error) {
            console.error('Error al guardar el me gusta:', error);
        }
}
async function getPublicador(){
    let params = new URLSearchParams(window.location.search);
    let idPublicacion = params.get("id");
    try{
        const response = await fetch(`${server}datospublicacion?idPublicacion=${idPublicacion}`,{
                method:'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const json =  await response.json();
            return json[0].ID_PERSONA;
        }catch (error) {
            console.error('Error al guardar el me gusta:', error);
        }
}
async function saveMegusta(){
const count = document.querySelector('#like-count');
let logged = await loged();
idPersona = logged.id;
let params = new URLSearchParams(window.location.search);
let idPublicacion = params.get("id");
var IdDestinatario = await getPublicador();
console.log(IdDestinatario);
    try{
    const response = await fetch(`${server}megusta?idpubli=${idPublicacion}&idpersona=${idPersona}`,{
            method:'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        const json =  await response.json();
        if(json){
            count.innerHTML  = parseInt(count.innerHTML)+1
            let megusta = document.querySelector('#megusta');
            megusta.remove();
            let nomegusta = document.createElement('i');
            nomegusta.classList.add('fa','fa-thumbs-up','fa-lg');
            nomegusta.setAttribute('id','nomegusta');
            contenedorLikes.appendChild(nomegusta)
            nomegusta.addEventListener('click',deleteLike);
            saveNotificacion(idPersona,IdDestinatario,idPublicacion,1);
        }
    }catch (error) {
        console.error('Error al guardar el me gusta:', error);
    }
}

async function deleteLike(){
const count = document.querySelector('#like-count');
let logged = await loged();
idPersona = logged.id;
let params = new URLSearchParams(window.location.search);
let idPublicacion = params.get("id");
    try{
        const response = await fetch(`${server}deletelike?idpubli=${idPublicacion}&idpersona=${idPersona}`,{
                method:'get',
                headers: { 'Content-Type': 'application/json' }
            });
            const json =  await response.json();
            let nomegusta = document.querySelector('#nomegusta');
            nomegusta.remove();
            count.innerHTML  = parseInt(count.innerHTML)-1;
            let megusta = document.createElement('i');
            megusta.classList.add('fa','fa-thumbs-o-up','fa-lg');
            megusta.setAttribute('id','megusta');
            contenedorLikes.appendChild(megusta);
            megusta.addEventListener('click',saveMegusta)
            
        }catch (error) {
            console.error('Error al guardar el me gusta:', error);
        }
}

async function loged(){
    try{
        const response = await fetch(`${server}islogged`,{
                method:'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const json =  await response.json();
            return json;
        }catch (error) {
            console.error('Error al verificar me gusta:', error);
        }
}
async function countLikes(){
    let params = new URLSearchParams(window.location.search);
    let idPubli = params.get("id");
    try{
        const response = await fetch(`${server}megustas?idpubli=${idPubli}`,{
                method:'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const json =  await response.json();
            if(json){
                let contenedorLikes = document.querySelector('#contenedorLikes');
                let span  = document.createElement('span');
                span.classList.add('badge', 'bg-primary','me-1');
                span.setAttribute('id','like-count');
                span.innerHTML = json.length;
                contenedorLikes.appendChild(span)
            }
        }catch (error) {
            console.error('Error al verificar me gusta:', error);
        }
}
 async function likeButtons (){
    let logged = await loged();
    let params = new URLSearchParams(window.location.search);
    let idPubli = params.get("id");
    if(logged.status=="logged"){
        let contenedorLikes = document.querySelector('#contenedorLikes');
        try{
            const response = await fetch(`${server}userlike?idpersona=${logged.id}&idpubli=${idPubli}`,{
                    method:'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                const json =  await response.json();
                if(json.length>0){
                    let nomegusta = document.createElement('i');
                    nomegusta.classList.add('fa','fa-thumbs-up','fa-lg');
                    nomegusta.setAttribute('id','nomegusta');
                    contenedorLikes.appendChild(nomegusta)
                    nomegusta.addEventListener('click',deleteLike);
                }else{
                    let megusta = document.createElement('i');
                    megusta.classList.add('fa','fa-thumbs-o-up','fa-lg');
                    megusta.setAttribute('id','megusta');
                    contenedorLikes.appendChild(megusta)
                    megusta.addEventListener('click',saveMegusta);
                }

                
            }catch (error) {
                console.error('Error al verificar me gusta:', error);
            }
    }
}

async function getComentarios(){
    
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    let contenedorCommentarios =  document.querySelector('#contenedor-comentarios');
        let comentariosDelete = document.querySelectorAll('.commentation')
        comentariosDelete.forEach(comment => {
            comment.remove();
        });
        let logged = await loged();
        
            try{
                const response = await fetch(`${server}getComentarios?id=${id}`,{
                        method:'GET',
                        headers: { 'Content-Type': 'application/json' }
                    });
                    const json =  await response.json();
                    for(let i=0;i<json.comentarios.length;i++){
                        
                        let comentario = comentarios.content.cloneNode(true);
                        let img = comentario.querySelector("img");
                        let nombre =  comentario.querySelector('#nombre');
                        let cuerpo =  comentario.querySelector('#cuerpo');
                        let btnResponse =  comentario.querySelector('#btnResponse');
                        let cardHilo = comentario.querySelector('.card-hilo');
                        let ul =  comentario.querySelector("ul");
                        cardHilo.setAttribute(`id`,json.comentarios[i].ID_COMENTARIO)
                        img.setAttribute(`src`,`uploads/${json.fotosComentarios[i]}`);
                        nombre.setAttribute(`href`,`/perfil?id=${json.comentarios[i].ID_PERSONA}`) ;
                        if(logged.status=="logged"){ 
                            //btnResponse.setAttribute(`data-id`,`${json.comentarios[i].ID_COMENTARIO}`);
                            btnResponse.addEventListener('click',enviarComment.bind(null,`${json.comentarios[i].ID_COMENTARIO}`));
                        }
                        
                        if(logged.id == json.comentarios[i].ID_PERSONA ){
                           let divDrop = comentario.querySelector('#idDropdown');
                           divDrop.classList.remove('d-none')
                        }
                        nombre.innerHTML = `${json.nombresComentarios[i]} ${json.apellidosComentarios[i]} `
                        cuerpo.innerHTML = `${json.comentarios[i].CUERPO}`
                        contenedorCommentarios.appendChild(comentario);
                        
                        for(let l=0;l<json.respuestas.length;l++){
                            if(json.respuestas[l].EN_RESPUESTA_DE == json.comentarios[i].ID_COMENTARIO){
                                let respuesta = respuestas.content.cloneNode(true);
                                let img2 = respuesta.querySelector("img");
                                let nombre =  respuesta.querySelector('#Rnombre');
                                let cuerpo =  respuesta.querySelector('#Rcuerpo')
                                let divDrop2 = respuesta.querySelector('#dropRespuesta')
                                let contendorRespuesta =  document.querySelectorAll('#i-response')
                                if(logged.id==json.respuestas[l].ID_PERSONA){
                                    divDrop2.classList.remove('d-none');
                                }
                                img2.setAttribute(`src`,`uploads/${json.fotosRespuestas[l]}`);
                                nombre.setAttribute(`href`,`/perfil?id=${json.respuestas[l].ID_PERSONA}`)
                                nombre.innerHTML = `${json.nombresRespuestas[l]} ${json.apellidosRespuestas[l]}`
                                cuerpo.innerHTML = `${json.respuestas[l].CUERPO}`
                                contendorRespuesta[i].appendChild(respuesta);    
                            }
                                
                        }               
                    }

                    setTimeout(function() {
                        let btnshow = document.querySelectorAll('.replybtn');
                        
                        for(let i=0;i<btnshow.length;i++){
                            btnshow[i].addEventListener('click',mostrar.bind(null,i))
                        }
                        let btnEditarComment = document.querySelectorAll('.editarComment')
                        
                        for(let i=0;i<btnEditarComment.length;i++){
                           btnEditarComment[i].addEventListener('click',habilitarEdicionComentario.bind(null,json.comentarios[i].ID_COMENTARIO,i))
                        }
                        let btnEliminarComment = document.querySelectorAll('.eliminarComment');

                        for(let i=0;i<btnEliminarComment.length;i++){
                            btnEliminarComment[i].addEventListener('click',eliminarComentario.bind(null,json.comentarios[i].ID_COMENTARIO,i))
                         }
                        let btnEditarRespuesta = document.querySelectorAll('.editarRespuesta')
                        for(let i=0;i<btnEditarRespuesta.length;i++){
                            btnEditarRespuesta[i].addEventListener('click',habilitarEdicionRespuesta.bind(null,json.respuestas[i].ID_COMENTARIO,i))
                        }
                        let btnEliminarRepuesta = document.querySelectorAll('.eliminarRespuesta');
                        for(let i=0;i<btnEliminarRepuesta.length;i++){
                            btnEliminarRepuesta[i].addEventListener('click',eliminarComentario.bind(null,json.respuestas[i].ID_COMENTARIO,i))
                        }

                        
                        
                      }, 210);
                }catch (error) {
                    console.error('Error al traer comentarios', error);
                }
        
    
}


async function enviarComment(idcomment){
    let nuevo = document.querySelector('#cuerpoNewComment');
    let respuestas = document.querySelectorAll('#cuerpoRespuesta');
    let cuerpo ;
    respuestas.forEach(respuesta => {
        if(respuesta.value!=''){
            cuerpo = {cuerpo:respuesta.value} ;
        }
    });
   
    let params = new URLSearchParams(window.location.search);
    let idPublicacion = params.get("id");
    let logged = await loged();
    let idPersona = logged.id;
    var IdDestinatario = await getPublicador();
    if(nuevo.value!=''){
        cuerpo ={cuerpo:nuevo.value} ;
    }
    try{
        const response = await fetch(`${server}savecomentario?idpubli=${idPublicacion}&idcoment=${idcomment}`,{
                method:'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cuerpo) 
            });
            const json =  await response.json();
            getComentarios();
            saveNotificacion(idPersona,IdDestinatario,idPublicacion,2);
            nuevo.value = "";
            respuestas.value = "";
        }catch (error) {
            console.error('Error al guardar el comentario', error);
        }
}
function mostrar(number){
    let divHilo = document.querySelectorAll('.divHilo');
    let rowbtn = document.querySelectorAll('.rowbtn')
    for(let i=0;i<divHilo.length;i++){
        divHilo[number].classList.remove('d-none')
        rowbtn[number].classList.add('d-none')
    }
}
function habilitarEdicionComentario(idComentario,num){
    console.log(num)
    let textoComentario =  document.querySelectorAll('.cuerpoComentario');
    var botonGuardar = document.createElement("button");
    let input = document.createElement("input");
    botonGuardar.classList.add('btn','btn-success','ms-1');
    botonGuardar.setAttribute('id','btnUpdate');
    input.classList.add('rounded')
    input.setAttribute('id','cuerpoEditado')
    botonGuardar.innerHTML = "Guardar";
    console.log(idComentario);
    input.value = textoComentario[num].innerHTML;
    textoComentario[num].innerHTML = "";
    textoComentario[num].appendChild(input);
    textoComentario[num].appendChild(botonGuardar);

    let btnUpdateComment =  document.querySelectorAll('#btnUpdate');
    for(let i=0;i<btnUpdateComment.length;i++){
        btnUpdateComment[i].addEventListener('click',updateComent.bind(null,idComentario,i));
    }
        
}
function habilitarEdicionRespuesta(idComentario,num){
    console.log(num)
    let textoComentario =  document.querySelectorAll('.cuerpoRespuesta');
    var botonGuardar = document.createElement("button");
    let input = document.createElement("input");
    botonGuardar.classList.add('btn','btn-success','ms-1');
    botonGuardar.setAttribute('id','btnUpdate');
    input.classList.add('rounded')
    input.setAttribute('id','cuerpoEditado')
    botonGuardar.innerHTML = "Guardar";
    console.log(idComentario);
    input.value = textoComentario[num].innerHTML;
    textoComentario[num].innerHTML = "";
    textoComentario[num].appendChild(input);
    textoComentario[num].appendChild(botonGuardar);

    let btnUpdateComment =  document.querySelectorAll('#btnUpdate');
    for(let i=0;i<btnUpdateComment.length;i++){
        btnUpdateComment[i].addEventListener('click',updateComent.bind(null,idComentario,i));
    }
        
}



 async function updateComent(idComentario,num){
    let input =  document.querySelectorAll('#cuerpoEditado')
    let cuerpo =  input[num].value;
    try{
        const response = await fetch(`${server}updatecomentario`,{
                method:'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    idComentario: idComentario,
                    cuerpo: cuerpo,
                  })
            });
            const json =  await response.json();
            console.log(json)
            getComentarios();
        }catch (error) {
            console.error('Error al verificar me gusta:', error);
        }
 }

 async function eliminarComentario(idComent){
    try{
        const response = await fetch(`${server}deletecomentario?idcomentario=${idComent}`,{
                method:'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            const json =  await response.json();
           getComentarios();
        }catch (error) {
            console.error('Error al verificar me gusta:', error);
        }
 }
async function inicio(){
    getPublicador();
    likeButtons();
    countLikes();
    getComentarios();
    setTimeout(() => {
        const nomegusta = document.querySelector('#nomegusta');
        const megusta = document.querySelector('#megusta');
        if(nomegusta){
            nomegusta.addEventListener('click',deleteLike);
        }
        if(megusta){
            megusta.addEventListener('click',saveMegusta);
        }
    }, 200);
    
    const mgNotlogin =  document.querySelector('#mgNotlogin');
    let logged = await loged();
    if(logged.status=="logged"){
        if(mgNotlogin){
            mgNotlogin.classList.add('d-none');
        }
        
        document.querySelector('#enviarComment').addEventListener('click',enviarComment.bind(null,0));       
     }
    
}

window.onload = inicio;
