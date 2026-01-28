console.log('app.js carregado');

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM pronto');

  const statusBox = document.getElementById('statusBox');
  const userNameSpan = document.getElementById('userName');

  if (!statusBox) {
    alert('Erro crítico: statusBox não encontrado');
    return;
  }

  const userData = sessionStorage.getItem('user');

  if (!userData) {
    window.location.href = 'index.html';
    return;
  }

  const user = JSON.parse(userData);

  userNameSpan.textContent = user.name;

  statusBox.innerHTML = `
    <strong>Sistema carregado com sucesso.</strong><br><br>
    <b>Usuário:</b> ${user.name}<br>
    <b>E-mail:</b> ${user.email}<br><br>
    Ambiente operacional ativo.
  `;
});
