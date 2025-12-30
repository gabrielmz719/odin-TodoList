import { addProject, getProjects } from "../controllers/projectController.js";
import { createAddTaskButton } from "./tasksView.js";

let currentProject = null;

const buttonAddProject = document.getElementById('btnAddProject');
const buttonDefaultProject = document.getElementById('btnDefaultProject');
const view = document.getElementById('content-container');
const sidebar = document.getElementById('sidebar');


export function viewProject(project) {
  if (!project) return;

  currentProject = project;

  view.innerHTML = `
    <h2>${project.title}</h2>
    <p>${project.description}</p>
    <p>Prazo: ${project.deadline ?? '—'}</p>
  `;

  
  project.tasks.forEach(task => {
    const taskEl = document.createElement('div');
    taskEl.textContent = task.title;
    view.appendChild(taskEl);
  });

  
  view.appendChild(createAddTaskButton());
}



function renderProjectButtons() {
  sidebar.innerHTML = "";

  getProjects().forEach(project => {
    const btn = document.createElement("button");
    btn.textContent = project.title;
    btn.addEventListener("click", () => viewProject(project));
    sidebar.appendChild(btn);
  });
}


const projects = getProjects();
const defaultProject = projects[0];

renderProjectButtons();

if (defaultProject) {
  buttonDefaultProject.textContent = defaultProject.title;
  viewProject(defaultProject);
}



function createDialog() {
  const dialog = document.createElement("dialog");

  dialog.innerHTML = `
    <form id="projectForm">
      <label>Título:</label>
      <input id="title" required>

      <label>Descrição:</label>
      <textarea id="description"></textarea>

      <label>Prazo:</label>
      <input id="deadline" type="date">

      <menu>
        <button type="button" id="cancel">Cancelar</button>
        <button type="submit">Confirmar</button>
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

dialog.querySelector('#cancel').addEventListener('click', () => {
  dialog.close();
});

dialog.querySelector('#projectForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = dialog.querySelector("#title").value;
  const description = dialog.querySelector("#description").value;
  const deadline = dialog.querySelector("#deadline").value;

  const project = addProject(title, description, deadline);

  renderProjectButtons();
  viewProject(project);

  dialog.close();
});



export function getCurrentProject() {
  return currentProject;
}
