// components.js — injeta componentes repetidos (ex.: rodapé)
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
<nav class="navbar navbar-expand-lg" aria-label="Main navigation">
  <div class="container">
    <a class="navbar-brand fw-bold" href="index.html">Andrade & Flores</a>
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
            <li><a class="dropdown-item" href="trabalhistas.html">Questões Trabalhistas</a></li>
            <li><a class="dropdown-item" href="tributario.html">Direito Tributário</a></li>
          </ul>
        </li>
        <li class="nav-item"><a class="nav-link" href="corpo.html">Corpo Jurídico</a></li>
        <li class="nav-item"><a class="nav-link btn btn-outline-light ms-2" href="contato.html">Contato</a></li>
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
        <p class="mb-3"><strong>Endereço:</strong><br>Rua Comendador Torlogo Dauntre Cambuí, 74<br>Sala 1207 — Campinas - SP</p>
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

    // helper to update body padding to nav height
    function updateBodyPadding() {
      try {
        const h = nav.offsetHeight;
        document.body.style.paddingTop = h + 'px';
      } catch (e) {
        // ignore
      }
    }

    // scroll handler: toggle scrolled class and update padding (nav may shrink)
    function onScroll() {
      if (window.scrollY > 50) nav.classList.add('navbar-scrolled'); else nav.classList.remove('navbar-scrolled');
      // allow transition to complete then update padding
      setTimeout(updateBodyPadding, 200);
    }

    // initial setup
    updateBodyPadding();
    onScroll();

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', updateBodyPadding);
  });
});
