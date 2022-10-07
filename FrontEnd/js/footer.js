class Footer extends HTMLElement{
    constructor(){
        super();
    }
    connectedCallback(){
        this.innerHTML = `
        <section>
        <!-- Footer -->
        <footer class="footer fixed-bottom text-center text-lg-start text-white" >
          <!-- Grid container
          <div class="container p-4 pb-0">
            <section class="">
              <p class="d-flex justify-content-center align-items-center">
                <span class="me-3">Register for free</span>
                <button type="button" class="btn btn-outline-light btn-rounded">
                  Sign up!
                </button>
              </p>
            </section>
          </div> Desbloquear footer-->
          <!-- Grid container -->
      
          <!-- Copyright -->
          <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
            © 2022 Copyright:
            <a class="text-white" href="">Guide-me.com</a>
          </div>
          <!-- Copyright -->
        </footer>
        <!-- Footer -->
      </section>
        `;
    }
}
window.customElements.define('menu-footer', Footer);