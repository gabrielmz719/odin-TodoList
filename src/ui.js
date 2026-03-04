import { Project } from "./projects";

export function inicializar() {
  // inicializar() é a função principal que "liga" a página.
  // Ela existe porque precisamos esperar o HTML carregar antes de adicionar
  // os eventos nos botões. Tudo começa aqui.
  const dialogCriar = document.getElementById('dialogCriarProjeto');
  const dialogEditar = document.getElementById('dialogEditarProjeto');

  // Assim que a página abre, já carregamos os projetos salvos no localStorage
  // para o usuário ver os projetos mesmo após recarregar a página
  carregarProjetos();

  // ===== MODAL CRIAR =====
  // Conectamos cada botão do HTML com sua função correspondente
  // usando addEventListener — isso é melhor que onclick no HTML
  // pois mantém o comportamento separado da estrutura

  document.getElementById('abreModalProjetoBtn').addEventListener('click', () => {
    dialogCriar.showModal(); // showModal() é um método nativo do <dialog> do HTML
  });

  document.getElementById('cancelarProjetoBtn').addEventListener('click', () => {
    dialogCriar.close(); // close() fecha o dialog sem fazer nada
  });

  document.getElementById('criarProjetoBtn').addEventListener('click', () => {
    // Só fechamos o modal SE a criação foi bem sucedida
    // por isso criarProjetos() retorna true ou false
    if (criarProjetos()) {
      dialogCriar.close();
    }
  });

  // ===== MODAL EDITAR =====

  document.getElementById('cancelarEdicaoBtn').addEventListener('click', () => {
    dialogEditar.close();
  });

  document.getElementById('salvarEdicaoBtn').addEventListener('click', () => {
    // Chamamos salvarEdicao() que vai pegar os valores do formulário
    // e atualizar o projeto no localStorage
    salvarEdicao();
  });

  // ===== MODAL EXCLUIR =====

  document.getElementById('confirmarExclusaoBtn').addEventListener('click', () => {
    // Só excluímos quando o usuário confirmar no modal
    // isso evita exclusões acidentais
    confirmarExclusao();
  });

  document.getElementById('cancelarExclusaoBtn').addEventListener('click', () => {
    document.getElementById('dialogExcluirProjeto').close();
  });
}

// ===== CRIAR PROJETO =====

export function criarProjetos() {
  // criarProjetos() existe separada do inicializar() para ter
  // uma única responsabilidade — só criar projetos.
  // Isso deixa o código mais organizado e fácil de manter.
  const projectTitle = document.getElementById("projecTitle").value;
  const projectDescription = document.getElementById("projectDescription").value;

  // Validamos antes de criar — se faltar algum campo avisamos o usuário
  // e retornamos false para o modal não fechar
  if (!projectTitle || !projectDescription) {
    alert('Preencha todos os campos!!');
    return false;
  }

  // Criamos o objeto Project — a classe gera um ID único automaticamente
  // com crypto.randomUUID(), evitando conflitos entre projetos
  const project = new Project(projectTitle, projectDescription);

  // Salvamos no localStorage para persistir os dados
  salvarProjeto(project);

  // Adicionamos o botão na navbar para o usuário ver o projeto
  adicionarBotao(project);

  // Retornamos true para o inicializar() saber que pode fechar o modal
  return true;
}

// ===== LOCALSTORAGE =====

function salvarProjeto(project) {
  // salvarProjeto() existe para salvar UM projeto novo no localStorage.
  // Ela existe separada pois essa lógica de "pegar lista, adicionar, salvar"
  // seria repetida em vários lugares se não fosse uma função própria.

  // Pegamos a lista atual — se não existir nada ainda, começamos com []
  const projetos = JSON.parse(localStorage.getItem("projetos") || "[]");

  // Adicionamos o novo projeto na lista com seus 3 dados importantes
  projetos.push({ id: project.id, title: project.title, description: project.description });

  // JSON.stringify converte o array para texto, pois localStorage só salva texto
  localStorage.setItem("projetos", JSON.stringify(projetos));
}

function carregarProjetos() {
  // carregarProjetos() existe para recriar os botões na navbar
  // quando a página é carregada ou recarregada.
  // Sem ela, os projetos estariam salvos mas o usuário não veria nada na tela.
  const projetos = JSON.parse(localStorage.getItem("projetos") || "[]");

  // Para cada projeto salvo, recriamos o botão na navbar
  projetos.forEach(project => adicionarBotao(project));
}

function atualizarLocalStorage(projetos) {
  // atualizarLocalStorage() existe para substituir TODA a lista de projetos.
  // Usamos ela ao editar ou excluir, pois precisamos salvar a lista modificada.
  // É diferente de salvarProjeto() que só adiciona um projeto novo.
  localStorage.setItem("projetos", JSON.stringify(projetos));
}

function recarregarBotoes() {
  // recarregarBotoes() existe para atualizar visualmente a navbar
  // após uma edição ou exclusão.
  // Sem ela, o botão na navbar continuaria com o nome/dados antigos.

  // Limpamos todos os botões atuais
  document.getElementById("resultadoProjetos").innerHTML = "";

  // Relemos o localStorage (já atualizado) e recriamos os botões
  const projetos = JSON.parse(localStorage.getItem("projetos") || "[]");
  projetos.forEach(project => adicionarBotao(project));
}

// ===== NAVBAR =====

function adicionarBotao(project) {
  // adicionarBotao() existe para não repetir o mesmo HTML em vários lugares.
  // Ela é chamada tanto ao criar um projeto quanto ao carregar a página.
  // Usamos o ID do projeto ao invés do título para identificá-lo,
  // evitando conflitos se dois projetos tiverem o mesmo nome.
  document.getElementById("resultadoProjetos").innerHTML += `
    <button onclick="exibirProjeto('${project.id}')">
      ${project.title}
    </button><br>
  `;
}

// ===== EXIBIR PROJETO =====

window.exibirProjeto = function (id) {
  // exibirProjeto() existe para mostrar os detalhes de um projeto ao clicar no botão.
  // Ela está no window porque é chamada pelo onclick no HTML,
  // e funções dentro de módulos ES6 não ficam disponíveis globalmente por padrão.
  // Usamos o ID para buscar os dados mais atuais direto do localStorage,
  // garantindo que sempre exibimos a versão mais recente do projeto.
  const projetos = JSON.parse(localStorage.getItem("projetos") || "[]");
  const project = projetos.find(p => p.id === id); // find() retorna o primeiro que corresponder

  if (!project) return; // Se não encontrar, não faz nada

  document.getElementById("detalhesProjeto").innerHTML = `
    <h3>${project.title}</h3>
    <p>${project.description}</p>
    <button onclick="abrirModalEditar('${project.id}')">✏️ Editar</button>
    <button onclick="abrirModalExcluir('${project.id}')">🗑️ Excluir</button>
    <button onclick="abrirModalCriarTarefa('${project.id}')">➕ Criar Tarefa</button>

  `;
}

// ===== EDITAR PROJETO =====

window.abrirModalEditar = function (id) {
  // abrirModalEditar() existe para abrir o modal de edição já preenchido
  // com os dados atuais do projeto, facilitando a edição para o usuário.
  // Usamos dataset.id para "guardar" o ID dentro do próprio elemento do modal,
  // assim quando o usuário clicar em salvar, sabemos qual projeto atualizar.
  const projetos = JSON.parse(localStorage.getItem("projetos") || "[]");
  const project = projetos.find(p => p.id === id);

  if (!project) return;

  // Preenchemos o formulário do modal com os valores atuais
  document.getElementById("editTitle").value = project.title;
  document.getElementById("editDescription").value = project.description;

  // dataset é uma forma nativa do HTML de guardar dados extras em qualquer elemento
  // é como um "post-it" colado no elemento para usarmos depois
  document.getElementById('dialogEditarProjeto').dataset.id = id;

  document.getElementById('dialogEditarProjeto').showModal();
}

function salvarEdicao() {
  // salvarEdicao() existe para pegar os novos valores do formulário
  // e atualizar o projeto correto no localStorage usando o ID guardado no dataset.
  // Ela é separada de abrirModalEditar() pois são duas responsabilidades diferentes:
  // uma abre o modal, a outra salva os dados.

  // Recuperamos o ID que guardamos no dataset quando abrimos o modal
  const id = document.getElementById('dialogEditarProjeto').dataset.id;

  const novoTitulo = document.getElementById("editTitle").value;
  const novaDescricao = document.getElementById("editDescription").value;

  if (!novoTitulo || !novaDescricao) {
    alert("Preencha todos os campos!");
    return;
  }

  const projetos = JSON.parse(localStorage.getItem("projetos") || "[]");

  // findIndex() retorna a posição do projeto na lista — usamos para atualizar
  const index = projetos.findIndex(p => p.id === id);
  if (index !== -1) { // -1 significa que não encontrou
    projetos[index].title = novoTitulo;
    projetos[index].description = novaDescricao;
  }

  atualizarLocalStorage(projetos); // Salva a lista atualizada
  recarregarBotoes(); // Atualiza os botões na navbar com o novo nome
  window.exibirProjeto(id); // Atualiza os detalhes na tela

  document.getElementById('dialogEditarProjeto').close();
}

// ===== EXCLUIR PROJETO =====

window.abrirModalExcluir = function (id) {
  // abrirModalExcluir() existe para abrir um modal de confirmação antes de excluir.
  // Isso evita que o usuário exclua um projeto por acidente.
  // Assim como no editar, guardamos o ID no dataset para usar na confirmação.
  document.getElementById('dialogExcluirProjeto').dataset.id = id;
  document.getElementById('dialogExcluirProjeto').showModal();
}

function confirmarExclusao() {
  // confirmarExclusao() existe para de fato excluir o projeto
  // após o usuário confirmar no modal.
  // Ela é separada de abrirModalExcluir() pelo mesmo motivo do editar:
  // abrir o modal e excluir são responsabilidades diferentes.

  const id = document.getElementById('dialogExcluirProjeto').dataset.id;

  const projetos = JSON.parse(localStorage.getItem("projetos") || "[]");

  // filter() cria uma nova lista SEM o projeto que tem o ID informado
  // é melhor que splice() pois não modifica a lista original diretamente
  const novaLista = projetos.filter(p => p.id !== id);

  atualizarLocalStorage(novaLista); // Salva a lista sem o projeto excluído
  recarregarBotoes(); // Remove o botão da navbar

  // Limpa a área de detalhes pois o projeto não existe mais
  document.getElementById("detalhesProjeto").innerHTML = "";

  document.getElementById('dialogExcluirProjeto').close();
}
