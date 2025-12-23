// DOM ready: initialize cookie consent after a short delay so footer components can load
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(initCookieConsent, 300);
});

// Cookie consent: initialize when components are loaded
function initCookieConsent() {
  const bar = document.getElementById('cookie-consent');
  // If bar markup is missing (component not loaded), attempt to inject a minimal bar
  let consentBar = bar;
  if (!consentBar) {
    const html = '\n<div id="cookie-consent" class="cookie-consent" aria-live="polite">\n  <div class="container d-flex flex-column flex-md-row align-items-center justify-content-between py-3">\n    <div class="cookie-text small text-muted mb-2 mb-md-0">Utilizamos cookies para melhorar a sua experiência. Ao continuar navegando, você concorda com nossa <a href="#" data-bs-toggle="modal" data-bs-target="#privacyModal">Política de Privacidade</a>.</div>\n    <div class="cookie-actions d-flex align-items-center">\n      <button id="cookie-accept" class="btn btn-primary btn-sm me-2">Aceitar</button>\n      <button id="cookie-close" class="btn btn-link cookie-close p-0" aria-label="Fechar aviso de cookies">✕</button>\n    </div>\n  </div>\n</div>\n\n<!-- Privacy modal (fallback for sites without components) -->\n<div class="modal fade privacy-modal" id="privacyModal" tabindex="-1" aria-labelledby="privacyModalLabel" aria-hidden="true">\n  <div class="modal-dialog modal-lg modal-dialog-scrollable">\n    <div class="modal-content">\n      <div class="modal-header">\n        <h5 class="modal-title" id="privacyModalLabel">Termos e Política de Privacidade</h5>\n        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>\n      </div>\n      <div class="modal-body">\n        <h3>TERMOS E CONDIÇÕES DE USO</h3>\n        <h5>1. Apresentação:</h5>\n        <p>Este site é mantido por Andrade e Flores Sociedade de Advogados. O acesso e a utilização deste site implicam na concordância integral com estes Termos e Condições de Uso.</p>\n        <h5>2. Finalidade do Site:</h5>\n        <p>O site tem finalidade exclusivamente informativa e institucional, destinado a apresentar conteúdos, áreas de atuação, materiais educativos e canais de contato relacionados aos serviços jurídicos prestados pelo escritório.\n        O uso deste site não cria qualquer relação advogado-cliente. Tal relação somente se estabelece por meio de contrato formal firmado pelo escritório.</p>\n        <h5>3. Conteúdos:</h5>\n        <p>Os conteúdos disponibilizados não constituem, em nenhuma hipótese, parecer jurídico, aconselhamento específico ou consulta formal. As informações podem ser atualizadas ou removidas a qualquer momento, sem necessidade de aviso prévio.\n        O escritório não garante a ausência de erros, interrupções ou indisponibilidades temporárias.</p>\n        <h5>4. Propriedade Intelectual:</h5>\n        <p>Todos os textos, imagens, logotipos, marcas, documentos, gráficos, vídeos e demais conteúdos deste site são de propriedade exclusiva do escritório, salvo quando indicada fonte diversa.\n        É proibida a reprodução, distribuição, modificação ou uso para fins comerciais sem autorização expressa.</p>\n        <h5>5. Conduta do Usuário:</h5>\n        <p>Ao acessar o site, o usuário compromete-se a:\n        não praticar atos que comprometam a segurança, integridade ou funcionamento da plataforma;\n        não utilizar conteúdos do site de forma ilícita ou contrária a estes Termos;\n        não enviar mensagens com conteúdo ofensivo, discriminatório, ilegal, difamatório ou que infrinjam direitos de terceiros.</p>\n        <h5>6. Links Externos:</h5>\n        <p>O site pode conter links para páginas de terceiros. O escritório não se responsabiliza por conteúdos, políticas ou práticas desses sites externos.</p>\n        <h5>7. Isenção de Responsabilidade:</h5>\n        <p>O escritório não se responsabiliza por decisões tomadas pelo usuário com base em informações gerais do site; por danos causados em razão de falhas do servidor ou indisponibilidade; por atos praticados por terceiros, como invasões, vírus ou fraudes.</p>\n        <h5>8. Atendimento e Contato:</h5>\n        <p>O formulário de contato, WhatsApp, e e-mails disponibilizados no site destinam-se apenas à comunicação inicial. Informações enviadas pelo usuário podem ser utilizadas para retorno de contato, mas não configuram contratação automática de serviços jurídicos.</p>\n        <h5>9. Alterações dos Termos:</h5>\n        <p>Estes Termos podem ser alterados a qualquer momento. A versão atualizada estará sempre disponível neste site.</p>\n\n        <h3 class="mt-3">POLÍTICA DE PRIVACIDADE</h3>\n        <p>Esta Política explica como o escritório coleta, utiliza e protege os dados pessoais dos usuários, conforme a Lei nº 13.709/2018 (LGPD).</p>\n        <h5>1. Dados Coletados</h5>\n        <p>Podem ser coletados:</p>\n        <p><strong>1.1. Dados fornecidos pelo usuário</strong><br>Nome completo; RG ou CPF; E-mail; Telefone; Áreas de interesse; Dados enviados voluntariamente em formulários ou mensagens.</p>\n        <p><strong>1.2. Dados coletados automaticamente</strong><br>Endereço IP; Informações sobre dispositivo e navegador; Cookies e identificadores online; Dados de navegação e estatísticas (Google Analytics, Meta Pixel etc.), quando utilizados.</p>\n        <h5>2. Finalidades do Tratamento</h5>\n        <p>Os dados podem ser utilizados para: responder mensagens enviadas pelo usuário; melhorar a experiência de navegação; produzir estatísticas de acesso; cumprir obrigações legais; manter a segurança do site. O escritório não vende, não compartilha e não utiliza dados pessoais para fins comerciais indevidos.</p>\n        <h5>3. Cookies</h5>\n        <p>Os cookies podem ser utilizados para: lembrar preferências do usuário; analisar acessos e comportamento no site; melhorar funcionalidade. O usuário pode controlar ou desativar cookies no próprio navegador.</p>\n        <h5>4. Alterações da Política</h5>\n        <p>Esta Política pode ser atualizada a qualquer momento. A versão vigente estará sempre publicada neste site.</p>\n      </div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>\n      </div>\n    </div>\n  </div>\n</div>\n';
    document.body.insertAdjacentHTML('beforeend', html);
    consentBar = document.getElementById('cookie-consent');
  }
  const accepted = localStorage.getItem('cookieConsent');
  if (accepted === 'yes' || accepted === 'no') {
    consentBar.classList.add('d-none');
    return;
  }
  // show bar (ensure visible)
  consentBar.classList.remove('d-none');
  consentBar.style.display = '';

  const acceptBtn = document.getElementById('cookie-accept');
  const closeBtn = document.getElementById('cookie-close');

  function hideBar() {
    consentBar.classList.add('d-none');
  }

  if (acceptBtn) {
    acceptBtn.addEventListener('click', function () {
      localStorage.setItem('cookieConsent', 'yes');
      hideBar();
    });
  }
  if (closeBtn) {
    // Treat explicit close as consent and hide
    closeBtn.addEventListener('click', function () {
      localStorage.setItem('cookieConsent', 'yes');
      hideBar();
    });
  }
}

// Try to init on custom event (components loaded) and also on DOMContentLoaded
document.addEventListener('components:loaded', function () { initCookieConsent(); });
document.addEventListener('DOMContentLoaded', function () { setTimeout(initCookieConsent, 300); });

// Lazy-load Google Maps placeholders: replace .map-placeholder with iframe on intersection or click
function initMapPlaceholders() {
  const placeholders = document.querySelectorAll('.map-placeholder');
  if (!placeholders || placeholders.length === 0) return;

  function loadPlaceholder(el) {
    if (!el || el.dataset.loaded) return;
    const src = el.getAttribute('data-src');
    if (!src) return;
    const iframe = document.createElement('iframe');
    iframe.setAttribute('title', 'Mapa — Andrade & Flores');
    iframe.setAttribute('src', src);
    iframe.setAttribute('style', 'border:0; width:100%; height:100%;');
    iframe.setAttribute('loading', 'lazy');
    iframe.setAttribute('allowfullscreen', '');
    el.innerHTML = '';
    el.appendChild(iframe);
    el.dataset.loaded = 'true';
  }

  // click handler to load immediately
  placeholders.forEach(function (ph) {
    const btn = ph.querySelector('.map-load-btn');
    if (btn) btn.addEventListener('click', function () { loadPlaceholder(ph); });
  });

  // Use IntersectionObserver where available
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          loadPlaceholder(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { root: null, rootMargin: '200px', threshold: 0.01 });

    placeholders.forEach(function (ph) { io.observe(ph); });
  }
}

document.addEventListener('components:loaded', initMapPlaceholders);
document.addEventListener('DOMContentLoaded', function () { setTimeout(initMapPlaceholders, 500); });
