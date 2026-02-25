import { Project } from "./projects";

export function inicializar() {
  const dialog = document.getElementById('dialogCriarProjeto');

  document.getElementById('abreModalProjetoBtn').addEventListener('click', () => {
    dialog.showModal();
  });

  document.getElementById('cancelarProjetoBtn').addEventListener('click', () => {
    dialog.close();
  });

  document.getElementById('criarProjetoBtn').addEventListener('click', () => {
    if (criarProjetos()) {

      dialog.close();
    }


  });
}

export function criarProjetos() {
  const projectTitle = document.getElementById("projecTitle").value;
  const projectDescription = document.getElementById("projectDescription").value;

  if (!projectTitle || !projectDescription) {
    alert('Preencha todos os campos!!');
    return;
  }

  const project = new Project(projectTitle, projectDescription)

  document.getElementById("resultadoProjetos").innerHTML = ` 
         <button onclick="exibirProjetos('${project.title}', '${project.description}')">
          ${project.title}
          </button>
        `;
  return true;
}

window.exibirProjetos = function (titulo,descricao){
  document.getElementById("detalhesProjeto").innerHTML =`
    <h3>${titulo}</h3>
    <p>${descricao}</p>
  `;
}