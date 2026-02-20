

export function inicializar() {
  const dialog = document.getElementById('dialogCriarProjeto');

  document.getElementById('abreModalProjetoBtn').addEventListener('click', () => {
    dialog.showModal(); 
  });

  document.getElementById('cancelarProjetoBtn').addEventListener('click', () => {
    dialog.close();
  });

  document.getElementById('criarProjetoBtn').addEventListener('click', () => {
    alert('Enviado!');
    dialog.close();
  });
}