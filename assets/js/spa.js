document.addEventListener('DOMContentLoaded', () => {

  const main = document.querySelector('main'); // Área onde o conteúdo será carregado
  const links = document.querySelectorAll('nav a'); // Links do menu

  // --- Atualiza ano do footer ---
  function initYear() {
    const yearEl = document.getElementById('year');
    if(yearEl) yearEl.textContent = new Date().getFullYear();
  }

  // --- Inicializa galeria (se houver) ---
  function initGallery() {
    const grid = document.querySelector('.gallery-grid');
    const lightbox = document.getElementById('lightbox');
    if (!grid || !lightbox) return;

    const lbImg = lightbox.querySelector('img');
    const lbClose = document.getElementById('lb-close');

    grid.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        lbImg.src = a.getAttribute('href');
        lbImg.alt = a.querySelector('img')?.alt || 'Imagem da galeria';
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        lbClose.focus();
      });
    });

    function closeLB() {
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden','true');
      lbImg.src = '';
    }

    lbClose.addEventListener('click', closeLB);
    lightbox.addEventListener('click', e => { if(e.target === lightbox) closeLB(); });
    document.addEventListener('keydown', e => { if(e.key === 'Escape') closeLB(); });
  }

  // --- Inicializa máscaras de formulário ---
  function initMasks() {
    const cpf = document.getElementById('cpf');
    if (cpf) cpf.addEventListener('input', e => {
      let v = e.target.value.replace(/\D/g,'').slice(0,11);
      v = v.replace(/(\d{3})(\d)/,'$1.$2');
      v = v.replace(/(\d{3})(\d)/,'$1.$2');
      v = v.replace(/(\d{3})(\d{1,2})$/,'$1-$2');
      e.target.value = v;
    });

    const tel = document.getElementById('telefone');
    if (tel) tel.addEventListener('input', e => {
      let v = e.target.value.replace(/\D/g,'').slice(0,11);
      v = v.replace(/^(\d{2})(\d)/g,'($1) $2');
      v = v.replace(/(\d)(\d{4})$/,'$1-$2');
      e.target.value = v;
    });

    const cep = document.getElementById('cep');
    if (cep) cep.addEventListener('input', e => {
      let v = e.target.value.replace(/\D/g,'').slice(0,8);
      v = v.replace(/(\d{5})(\d)/,'$1-$2');
      e.target.value = v;
    });
  }

  // --- Função principal para carregar páginas ---
  async function loadPage(page) {
    try {
      // Busca dentro da pasta pages/
      const res = await fetch(`pages/${page}`);
      if (!res.ok) throw new Error('Erro ao carregar a página');
      const html = await res.text();
      main.innerHTML = html;
      window.scrollTo(0,0);

      // Reativa scripts necessários
      initGallery();
      initMasks();
      initYear();
    } catch (err) {
      main.innerHTML = `<p style="color:red;">Falha ao carregar o conteúdo.</p>`;
      console.error(err);
    }
  }

  // --- Intercepta clique nos links do menu ---
  links.forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if(href && href.endsWith('.html')) {
        e.preventDefault();
        loadPage(href);
        window.history.pushState({page: href}, '', href);
      }
    });
  });

  // --- Suporte para voltar/avançar do navegador ---
  window.addEventListener('popstate', e => {
    if (e.state && e.state.page) loadPage(e.state.page);
  });

  // Inicializa scripts na primeira carga
  initGallery();
  initMasks();
  initYear();

});
