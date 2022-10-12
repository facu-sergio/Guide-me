class Menu extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = `<nav class="navbar navbar-expand-sm navbar-light bg-light mt-2">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img src="./Assets/chatting.png" alt="" height="75">
                Guide-me
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="./index.html">Home</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Carreras
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Comercio internacional</a></li>
                            <li><a class="dropdown-item" href="#">Gestión areoportuaria</a></li>
                            <li><a class="dropdown-item" href="#">Logistica</a></li>
                            <li><a class="dropdown-item" href="#">Turismo</a></li>
                            <li><a class="dropdown-item" href="#">Desarrollo de software</a></li>
                            <li><a class="dropdown-item" href="#">Higiene y Seguridad</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="./form-publicacion.html">Crear publicacion</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="./login.html">Login</a>
                    </li>
                    <li>
                        <a class="nav-link active" aria-current="page" href="./formulario_registro.html">Registrarse</a>
                    </li>
                </ul>
        
                <!--Notificaciones-->
                <div class="dropdown">
                    <button class=" btn text-reset me-3 dropdown-toggle hidden-arrow " href="#" id="navbarDropdownMenuLink"
                        role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fas fa-bell"></i>
                        <span class="badge badge-notification bg-danger">1</span>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                        <li>
                            <a class="dropdown-item" href="#">A sebastian Lopez le gusta tu comentario</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#">Cristian Lopez subio una nueva publicación</a>
                        </li>
                    </ul>
                </div>
                <!--Perfil-->
                <div class="dropdown">
                    <a class="dropdown-toggle d-flex align-items-center hidden-arrow" href="#"
                        id="navbarDropdownMenuAvatar" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <img src="./Assets/ruth.jpg " class="rounded-circle"
                            height="25" alt="Black and White Portrait of a Man" loading="lazy" />
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuAvatar">
                        <li>
                            <a class="dropdown-item" href="./mi_perfil.html">Mi Perfil</a>
                        </li>
                        <li>
                        <a class="dropdown-item" href="./editar_perfil.html">Editar Perfil</a>
                    </li>
                        <li>
                            <a class="dropdown-item" href="./misPublicaciones.html">Mis publicaciones</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#">Logout</a>
                        </li>
                    </ul>
                </div>
        
            </div>
        </div>
        </nav>`;
    }
}
window.customElements.define('menu-navegacion', Menu);





