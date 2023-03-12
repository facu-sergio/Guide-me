
//const server =  'http://localhost:3000/';
const server = 'https://guide-me.up.railway.app/'
async function getNotificaciones(idPersona){
    try{
        const response = await fetch(`${server}getnotificaciones?idPersona=${idPersona}`,{
                method:'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const json =  await response.json();
            let tipoNoti = "";
            let prefijo = "";
            if(json.length>0){
                let count =  document.getElementById('count');
                count.innerHTML = json.length;
                for(let i = 0;i<json.length;i++){
                    let btnNotificaciones =  document.querySelector('#notificaciones');
                    let li =  document.createElement('li');
                    let a =  document.createElement('a');
                    if(json[i].TIPO_NOTIFICACION==1){
                        prefijo = "A"
                        tipoNoti = "le gusta tu publicacion"
                    }
                    if(json[i].TIPO_NOTIFICACION==2){
                        prefijo = ""
                        tipoNoti = "Comento tu publicacion"
                    }
                    let persona = await getPersona(json[i].ID_REMITENTE)
                    if(persona){
                        a.innerHTML = `${prefijo} ${persona[0].NOMBRE} ${persona[0].APELLIDO} ${tipoNoti}`
                    }
                    a.setAttribute('href',`/publicacion?id=${json[i].ID_REDIRECT}`);
                    a.classList.add('dropdown-item')
                    li.appendChild(a);
                    btnNotificaciones.appendChild(li);
                
            }}else{
                let btnNotificaciones =  document.querySelector('#notificaciones');
                let li =  document.createElement('li');
                let a =  document.createElement('a');
                a.classList.add('dropdown-item');
                a.innerHTML= "No tienes notifiaciones nuevas"
                li.appendChild(a);
                btnNotificaciones.appendChild(li);
            }
        }catch (error) {
            console.error('Error al verificar me gusta:', error);
        }

}

async function getPersona(idPersona){
    try{
        const response = await fetch(`${server}getpersona?idPersona=${idPersona}`,{
                method:'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const json =  await response.json();
            return json;
        }catch (error) {
            console.error('Error al verificar me gusta:', error);
        }
}

async function inicio(){
    let id ;
    let status;
    try{
        const response = await fetch(`${server}islogged`,{
                method:'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const json =  await response.json();
            status = json.status
            id = json.id
        }catch (error) {
            console.error('Error al verificar me gusta:', error);
        }
        if(status=="logged"){
            getNotificaciones(id);
        }
        
}

window.addEventListener("load", inicio);