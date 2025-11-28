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
    });
});
