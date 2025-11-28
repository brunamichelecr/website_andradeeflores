// components.js — injeta componentes repetidos (ex.: rodapé)
document.addEventListener('DOMContentLoaded', function () {
  const placeholder = document.getElementById('site-footer');
  if (!placeholder) return;

  fetch('assets/components/footer.html')
    .then(function (res) {
      if (!res.ok) throw new Error('Footer not found');
      return res.text();
    })
    .then(function (html) {
      placeholder.innerHTML = html;
    })
    .catch(function (err) {
      console.warn('Could not load footer component:', err);
      // Fallback: inserir HTML do rodapé diretamente quando fetch falhar
      const fallback = `
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
      placeholder.innerHTML = fallback;
    });
});
