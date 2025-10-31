// --- Atualiza ano do rodapé ---
document.getElementById('year')?.textContent = new Date().getFullYear();

// --- Máscaras de CPF, telefone e CEP ---
document.addEventListener('DOMContentLoaded', () => {
  // CPF
  const cpf = document.getElementById('cpf');
  if (cpf) cpf.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g,'').slice(0,11);
    v = v.replace(/(\d{3})(\d)/,'$1.$2');
    v = v.replace(/(\d{3})(\d)/,'$1.$2');
    v = v.replace(/(\d{3})(\d{1,2})$/,'$1-$2');
    e.target.value = v;
  });

  // Telefone
  const tel = document.getElementById('telefone');
  if (tel) tel.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g,'').slice(0,11);
    v = v.replace(/^(\d{2})(\d)/g,'($1) $2');
    v = v.replace(/(\d)(\d{4})$/,'$1-$2');
    e.target.value = v;
  });

  // CEP
  const cep = document.getElementById('cep');
  if (cep) {
    cep.addEventListener('input', e => {
      let v = e.target.value.replace(/\D/g,'').slice(0,8);
      v = v.replace(/(\d{5})(\d)/,'$1-$2');
      e.target.value = v;
    });
  }
});
