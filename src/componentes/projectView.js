import { addProjects, getProjects } from "../controllers/projectController.js";
import { createAddTaskButton } from "./tasksView.js";


const addTask=createAddTaskButton();
const projects = getProjects();
const defaultProject = projects[0];

const buttonDefaultProject = document.getElementById('btnDefaultProject');
buttonDefaultProject.textContent = defaultProject.title;

const buttonAddProject = document.getElementById('btnAddProject');


buttonDefaultProject.addEventListener('click', () => {
  viewProject(defaultProject);
});


export function viewProject(project) {
  const view = document.getElementById('content-container');
  view.innerHTML = `
    <h2>${project.title}</h2>
    <p>${project.description}</p>
    <p>Prazo: ${project.deadline}</p>
  `;
  view.appendChild(addTask)
}

function renderProjectButtons() {
  const container = document.getElementById("sidebar"); // <-- alterado
  container.innerHTML = "";

  const allProjects = getProjects();

  allProjects.forEach((project) => {
    const btn = document.createElement("button");
    btn.textContent = project.title;

    btn.addEventListener("click", () => {
      viewProject(project);
    });

    container.appendChild(btn);
  });
}



 function createDialog() {
  const dialog = document.createElement("dialog");

  dialog.innerHTML = `
    <form method="dialog" id="projectForm">

      <label>Título:</label>
      <input id="title" required>

      <label>Descrição:</label>
      <textarea id="description"></textarea>

      <label>Prazo:</label>
      <input id="deadline" type="date">

      <menu>
        <button id="cancel" type="reset">Cancelar</button>
        <button id="confirm" type="submit">Confirmar</button>
      </menu>
    </form>
  `;

  document.body.appendChild(dialog);
  return dialog;
}

const dialog = createDialog();


buttonAddProject.addEventListener('click', () => {
  dialog.showModal();
});

const cancelButton = document.getElementById('cancel');

cancelButton.addEventListener('click', () => {
  dialog.close();
});


dialog.querySelector('#projectForm').addEventListener('submit', (e) => {
  const title = dialog.querySelector("#title").value;
  const description = dialog.querySelector("#description").value;
  const deadline = dialog.querySelector("#deadline").value;

  const project = addProjects(title, description, deadline);

  renderProjectButtons();

  viewProject(project);

  dialog.close();
});
