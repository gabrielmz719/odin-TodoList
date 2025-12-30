import {
  addProject,
  getProjects,
  updateProject,
  deleteProject
} from "../controllers/projectController.js";

import {
  deleteTask,
  updateTask
} from "../controllers/taskController.js";

import { createAddTaskButton } from "./tasksView.js";

let currentProject = null;

const buttonAddProject = document.getElementById('btnAddProject');
const buttonDefaultProject = document.getElementById('btnDefaultProject');
const view = document.getElementById('content-container');
const sidebar = document.getElementById('sidebar');


export function viewProject(project) {
  if (!project) return;

  currentProject = project;
  view.innerHTML = "";

  const title = document.createElement('h2');
  title.textContent = project.title;

  const desc = document.createElement('p');
  desc.textContent = project.description;

  const deadline = document.createElement('p');
  deadline.textContent = `Prazo: ${project.deadline ?? '—'}`;

  
  const editProjectBtn = document.createElement('button');
  editProjectBtn.textContent = '✏️ Editar Projeto';

  editProjectBtn.addEventListener('click', () => {
    openEditProjectDialog(project);
  });

  const deleteProjectBtn = document.createElement('button');
  deleteProjectBtn.textContent = '🗑 Excluir Projeto';

  deleteProjectBtn.addEventListener('click', () => {
    deleteProject(project.id);
    renderProjectButtons();

    const projects = getProjects();
    if (projects.length > 0) {
      viewProject(projects[0]);
    } else {
      view.innerHTML = "<p>Nenhum projeto</p>";
    }
  });

  view.append(title, desc, deadline, editProjectBtn, deleteProjectBtn);

  
  project.tasks.forEach(task => {
    const taskEl = document.createElement('div');
    taskEl.textContent = task.title;

    const editTaskBtn = document.createElement('button');
    editTaskBtn.textContent = '✏️';

    editTaskBtn.addEventListener('click', () => {
      openEditTaskDialog(project, task);
    });

    const deleteTaskBtn = document.createElement('button');
    deleteTaskBtn.textContent = '🗑';

    deleteTaskBtn.addEventListener('click', () => {
      deleteTask(project.id, task.id);
      viewProject(project);
    });

    taskEl.append(editTaskBtn, deleteTaskBtn);
    view.appendChild(taskEl);
  });

  view.appendChild(createAddTaskButton());
}


function renderProjectButtons() {
  sidebar.innerHTML = "";

  getProjects().forEach(project => {
    const btn = document.createElement('button');
    btn.textContent = project.title;
    btn.addEventListener('click', () => viewProject(project));
    sidebar.appendChild(btn);
  });
}


const projects = getProjects();
renderProjectButtons();

if (projects[0]) {
  buttonDefaultProject.textContent = projects[0].title;
  viewProject(projects[0]);
}


function createProjectDialog() {
  const dialog = document.createElement("dialog");

  dialog.innerHTML = `
    <form id="projectForm">
      <label>Título</label>
      <input id="title" required>

      <label>Descrição</label>
      <textarea id="description"></textarea>

      <label>Prazo</label>
      <input id="deadline" type="date">

      <menu>
        <button type="button" id="cancel">Cancelar</button>
        <button type="submit">Salvar</button>
      </menu>
    </form>
  `;

  document.body.appendChild(dialog);
  return dialog;
}

const projectDialog = createProjectDialog();

buttonAddProject.addEventListener('click', () => {
  projectDialog.showModal();
});

projectDialog.querySelector('#cancel').onclick = () => projectDialog.close();

projectDialog.querySelector('#projectForm').onsubmit = (e) => {
  e.preventDefault();

  const title = projectDialog.querySelector('#title').value;
  const description = projectDialog.querySelector('#description').value;
  const deadline = projectDialog.querySelector('#deadline').value;

  const project = addProject(title, description, deadline);
  renderProjectButtons();
  viewProject(project);

  projectDialog.close();
};


function openEditProjectDialog(project) {
  const dialog = document.createElement('dialog');

  dialog.innerHTML = `
    <form>
      <label>Título</label>
      <input id="title" value="${project.title}" required>

      <label>Descrição</label>
      <textarea id="description">${project.description}</textarea>

      <label>Prazo</label>
      <input id="deadline" type="date" value="${project.deadline ?? ''}">

      <menu>
        <button type="button" id="cancel">Cancelar</button>
        <button type="submit">Salvar</button>
      </menu>
    </form>
  `;

  document.body.appendChild(dialog);
  dialog.showModal();

  dialog.querySelector('#cancel').onclick = () => dialog.close();

  dialog.querySelector('form').onsubmit = (e) => {
    e.preventDefault();

    updateProject(project.id, {
      title: dialog.querySelector('#title').value,
      description: dialog.querySelector('#description').value,
      deadline: dialog.querySelector('#deadline').value
    });

    renderProjectButtons();
    viewProject(project);
    dialog.close();
  };
}


function openEditTaskDialog(project, task) {
  const dialog = document.createElement('dialog');

  dialog.innerHTML = `
    <form>
      <label>Título</label>
      <input id="title" value="${task.title}" required>

      <label>Descrição</label>
      <textarea id="description">${task.description}</textarea>

      <label>Prazo</label>
      <input id="dueDate" type="date" value="${task.dueDate ?? ''}">

      <menu>
        <button type="button" id="cancel">Cancelar</button>
        <button type="submit">Salvar</button>
      </menu>
    </form>
  `;

  document.body.appendChild(dialog);
  dialog.showModal();

  dialog.querySelector('#cancel').onclick = () => dialog.close();

  dialog.querySelector('form').onsubmit = (e) => {
    e.preventDefault();

    updateTask(project.id, task.id, {
      title: dialog.querySelector('#title').value,
      description: dialog.querySelector('#description').value,
      dueDate: dialog.querySelector('#dueDate').value
    });

    viewProject(project);
    dialog.close();
  };
}


export function getCurrentProject() {
  return currentProject;
}
