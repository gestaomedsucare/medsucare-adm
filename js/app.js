// app.js
// Controle principal da aplicação (sem loop)

(function initApp() {

  const userData = sessionStorage.getItem('user');

  if (!userData) {
    // Usuário não veio do login
    window.location.href = 'index.html';
    return;
  }

  const user = JSON.parse(userData);

  // Verifica se é o administrador principal
  if (user.email === CONFIG.ADMIN_EMAIL) {
    verificarEmpresa();
  } else {
    renderAcessoNegado();
  }

})();

async function verificarEmpresa() {
  try {
    const empresa = await loadSheet('Empresa');

    // Se não existir nenhum dado válido, é primeiro acesso
    if (!empresa || empresa.length === 0 || !empresa[0].razao_social) {
      renderPrimeiroAcesso();
      return;
    }

    renderSistemaLiberado();

  } catch (erro) {
    document.body.innerHTML = `
      <h2>Erro ao acessar a planilha</h2>
      <p>Verifique se a planilha foi publicada em CSV.</p>
    `;
  }
}

function renderPrimeiroAcesso() {
  document.body.innerHTML = `
    <h2>Configuração Inicial da Empresa</h2>
    <p>Este é o primeiro acesso. Preencha os dados da empresa para liberar o sistema.</p>
  `;
}

function renderSistemaLiberado() {
  document.body.innerHTML = `
    <h2>Sistema liberado</h2>
    <p>Bem-vindo à Gestão MedSuCare.</p>
    <footer style="margin-top:40px; font-size:12px; color:#666;">
      Feito pelo incrível ChatGPT ✨
    </footer>
  `;
}

function renderAcessoNegado() {
  document.body.innerHTML = `
    <h2>Acesso não autorizado</h2>
    <p>Sua solicitação será analisada pelo administrador.</p>
  `;
}
