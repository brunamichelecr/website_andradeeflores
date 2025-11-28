document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      alert('Por favor preencha os campos obrigatórios.');
      return;
    }

    const subject = encodeURIComponent('Contato via site - ' + name);
    const body = encodeURIComponent(`Nome: ${name}\nEmail: ${email}\nTelefone: ${phone}\n\nMensagem:\n${message}`);
    // email principal do escritório (alterar conforme necessário)
    const to = 'contato@andradeeflores.com';
    // abrir cliente de e-mail com os dados preenchidos
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });
});
