// components.js - injeta componentes repetidos (ex.: rodapé)
document.addEventListener('DOMContentLoaded', function () {
  // Inserir navbar e footer via fetch (com fallbacks para file:// preview)
  function loadComponent(id, url, fallbackHtml) {
    const el = document.getElementById(id);
    if (!el) return Promise.resolve();
    return fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error('Component not found: ' + url);
        return res.text();
      })
      .then(function (html) {
        el.innerHTML = html;
      })
      .catch(function (err) {
        console.warn('Could not load component', url, err);
        if (fallbackHtml) el.innerHTML = fallbackHtml;
      });
  }

  const navbarFallback = `
<nav class="navbar navbar-expand-lg bg-dark-custom" aria-label="Main navigation">
  <div class="container">
    <a class="navbar-brand fw-bold d-inline-flex align-items-center" href="index.html">
      <svg class="navbar-logo me-2" width="40" height="40" viewBox="0 0 128 108.38516" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Andrade & Flores logo">
        <g transform="translate(-659.01062,-406.69818)">
          <g transform="matrix(0.40680762,0,0,0.40680762,322.47064,334.03091)">
            <g transform="matrix(1.7455096,0,0,1.7455096,501.46797,-5.009355)">
              <path style="fill:#ffffff" d="m 253.45882,239.38224 c 4.91729,-7.1676 -4.93337,-17.90406 -7.64157,-18.37998 -2.43545,4.49756 -4.66551,11.85286 7.64157,18.37998 z" />
            </g>
            <g transform="matrix(-1.7455096,0,0,1.7455096,1467.7182,-4.7285459)">
              <path style="fill:#ffffff" d="m 253.45882,239.38224 c 4.91729,-7.1676 -4.93337,-17.90406 -7.64157,-18.37998 -2.43545,4.49756 -4.66551,11.85286 7.64157,18.37998 z" />
            </g>
            <g transform="matrix(1.7455096,0,0,1.7455096,501.86584,9.1476594)" style="stroke:#ffffff">
              <path style="fill:#ffffff;stroke:#ffffff" d="m 276.09959,98.654307 h 0.0852 l 5.63063,110.123833 c -5.79857,5.41522 -6.03119,5.46518 -11.02473,0 z" />
            </g>
          </g>
        </g>
      </svg>
      <span>Andrade & Flores</span>
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navMenu">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="sobre.html">Sobre Nós</a></li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Áreas</a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="civil.html">Direito Civil</a></li>
            <li><a class="dropdown-item" href="empresarial.html">Direito Empresarial</a></li>
            <li><a class="dropdown-item" href="familia.html">Direito de Família</a></li>
            <li><a class="dropdown-item" href="trabalhistas.html">Direito Trabalhista</a></li>
            <li><a class="dropdown-item" href="tributario.html">Direito Tributário</a></li>
          </ul>
        </li>
        <li class="nav-item"><a class="nav-link" href="corpo.html">Corpo Jurídico</a></li>
        <li class="nav-item"><a class="nav-link btn btn-primary ms-2" href="contato.html">Contato</a></li>
      </ul>
    </div>
  </div>
</nav>
  `;

  const footerFallback = `
<footer class="site-footer bg-dark text-light pt-5">
  <div class="container">
    <div class="row gy-4">
      <div class="col-md-6">
        <div class="ratio ratio-16x9 rounded">
          <iframe src="https://www.google.com/maps?q=Rua%20Comendador%20Torlogo%20Dauntre%20Cambu%C3%AD%2C%2074%20Sala%201207%20Campinas%20SP&output=embed" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
        </div>
      </div>
      <div class="col-md-6">
        <h5>Andrade & Flores Sociedade de Advogados</h5>
        <p class="mb-1"><strong>CNPJ:</strong> 59.636.849/0001-07</p>
        <p class="mb-3"><strong>Endereço:</strong><br>Rua Comendador Torlogo Dauntre Cambuí, 74<br>Sala 1207 - Campinas - SP</p>
        <a href="contato.html" class="btn btn-primary">Entrar em contato</a>
      </div>
    </div>
  </div>
  <div class="developer-credit bg-black text-center py-2 mt-4">
    <small>Desenvolvido por <a href="https://github.com/brunamichelecr" target="_blank" class="text-light">Bruna Ribeiro</a></small>
  </div>
</footer>
  `;

  // Load navbar then footer
  Promise.all([
    loadComponent('site-navbar', 'assets/components/navbar.html', navbarFallback),
    loadComponent('site-footer', 'assets/components/footer.html', footerFallback)
  ]).then(function () {
    // Add scroll effect to navbar and keep content visible by adding body padding equal to navbar height
    const nav = document.querySelector('#site-navbar .navbar');
    if (!nav) return;

    // helper to update a spacer element height equal to nav height
    function updateNavSpacer() {
      try {
        const h = nav.offsetHeight;
        let spacer = document.getElementById('nav-spacer');
        if (!spacer) {
          spacer = document.createElement('div');
          spacer.id = 'nav-spacer';
          // insert spacer immediately after the #site-navbar placeholder
          const placeholder = document.getElementById('site-navbar');
          if (placeholder && placeholder.parentNode) placeholder.parentNode.insertBefore(spacer, placeholder.nextSibling);
          else document.body.insertBefore(spacer, document.body.firstChild);
        }
        spacer.style.height = h + 'px';
      } catch (e) {
        // ignore
      }
    }

    // scroll handler: toggle scrolled class and update padding (nav may shrink)
    function onScroll() {
      if (window.scrollY > 50) nav.classList.add('navbar-scrolled'); else nav.classList.remove('navbar-scrolled');
      // allow transition to complete then update spacer height
      setTimeout(updateNavSpacer, 220);
    }

    // initial setup
    updateNavSpacer();
    onScroll();

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', updateNavSpacer);
  });
});
