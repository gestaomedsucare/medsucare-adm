// Verifica login
const userData = sessionStorage.getItem('user');

if (!userData) {
  window.location.href = 'index.html';
} else {
  const user = JSON.parse(userData);

  document.getElementById('userName').textContent = user.name;
  document.getElementById('statusBox').innerHTML = `
    <strong>Sistema carregado com sucesso.</strong><br><br>
    Usuário logado:<br>
    ${user.email}
  `;
}
