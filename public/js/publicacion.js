

//const server =  'http://localhost:3000/';
const server = 'https://guide-me.onrender.com/'

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



async function saveMegusta(){
const count = document.querySelector('#like-count');
const nomegusta = document.querySelector('#nomegusta');
const megusta = document.querySelector('#megusta');
var idPublicacion = megusta.dataset.idpubli;
var idPersona =  megusta.dataset.idpersona;
var IdDestinatario = megusta.dataset.iddestinatario;
    try{
    const response = await fetch(`${server}megusta?idpubli=${idPublicacion}&idpersona=${idPersona}`,{
            method:'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        const json =  await response.json();
        if(json){
            megusta.classList.add('d-none')
            nomegusta.classList.remove('d-none');
            count.innerHTML  = parseInt(count.innerHTML)+1
            saveNotificacion(idPersona,IdDestinatario,idPublicacion,1);
        }
    }catch (error) {
        console.error('Error al guardar el me gusta:', error);
    }
}

async function deleteLike(){
const count = document.querySelector('#like-count');
const nomegusta = document.querySelector('#nomegusta');
const megusta = document.querySelector('#megusta');
var idPublicacion = megusta.dataset.idpubli;
var idPersona =  megusta.dataset.idpersona;
    try{
        const response = await fetch(`${server}deletelike?idpubli=${idPublicacion}&idpersona=${idPersona}`,{
                method:'get',
                headers: { 'Content-Type': 'application/json' }
            });
            const json =  await response.json();
                count.innerHTML  = parseInt(count.innerHTML)-1
                megusta.classList.remove('d-none')
                nomegusta.classList.add('d-none');
            
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
                        cardHilo.setAttribute(`id`,json.comentarios[i].ID_COMENTARIO)
                        img.setAttribute(`src`,`uploads/${json.fotosComentarios[i]}`);
                        nombre.setAttribute(`href`,`/perfil?id=${json.comentarios[i].ID_PERSONA}`) ;
                        if(logged.status=="logged"){ 
                            //btnResponse.setAttribute(`data-id`,`${json.comentarios[i].ID_COMENTARIO}`);
                            btnResponse.addEventListener('click',enviarComment.bind(null,`${json.comentarios[i].ID_COMENTARIO}`));
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
                               
                                let contendorRespuesta =  document.querySelectorAll('#i-response')
        
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
                        
                      }, 200);
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
   
    if(nuevo.value!=''){
        cuerpo ={cuerpo:nuevo.value} ;
        try{
            
            const response = await fetch(`${server}getpersonascomentando?idComent=${idcomment}`,{
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
    var idPublicacion = megusta.dataset.idpubli;
    var idPersona =  megusta.dataset.idpersona;
    var IdDestinatario = megusta.dataset.iddestinatario;
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
 
async function inicio(){
    
    getComentarios();
    const nomegusta = document.querySelector('#nomegusta');
    const megusta = document.querySelector('#megusta');
    
    let logged = await loged();
    if(logged.status=="logged"){
        document.querySelector('#enviarComment').addEventListener('click',enviarComment.bind(null,0));
        megusta.addEventListener('click',saveMegusta);
         nomegusta.addEventListener('click',deleteLike);
         var idPublicacion = megusta.dataset.idpubli;
         var idPersona =  megusta.dataset.idpersona;
         try{
             const response = await fetch(`${server}userlike?idpersona=${idPersona}&idpubli=${idPublicacion}`,{
                     method:'GET',
                     headers: { 'Content-Type': 'application/json' }
                 });
                 const json =  await response.json();
                 if(json.length>0){
                     megusta.classList.add('d-none')
                 }else{
                     nomegusta.classList.add('d-none')
                 }
             }catch (error) {
                 console.error('Error al verificar me gusta:', error);
             }
     }
    
    setTimeout(function() {
        let btnshow = document.querySelectorAll('.replybtn');
        megusta.classList.remove('d-none')
        megusta.classList.remove('d-none')
        for(let i=0;i<btnshow.length;i++){
            btnshow[i].addEventListener('click',mostrar.bind(null,i))
        }
        
        }, 200);
}

window.onload = inicio;
