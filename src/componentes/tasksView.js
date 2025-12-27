import { addTaskToProject } from "../controllers/taskController";
import { getCurrentProject } from "./projectView";
import { viewProject } from "./projectView";


export function createAddTaskButton() {
  const addTaskButton = document.createElement('button');
  const dialogTask = createDialog();

  const cancelAddTaskButton = dialogTask.querySelector('#cancelAddTask');
  const taskForm = dialogTask.querySelector('#taskForm');

  addTaskButton.textContent = 'Add Task';

  addTaskButton.addEventListener('click', () => {
    dialogTask.showModal();
  });

  cancelAddTaskButton.addEventListener('click', () => {
    dialogTask.close();
  });

  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = dialogTask.querySelector('#title').value;
    const description = dialogTask.querySelector('#description').value;
    const dueDate = dialogTask.querySelector('#dueDate').value;

    const currentProject = getCurrentProject();

    if (!currentProject) {
      throw new Error('Nenhum projeto selecionado');
    }

    addTaskToProject(currentProject.id, {
      title,
      description,
      dueDate
    });

    viewProject(currentProject);

    taskForm.reset();
    dialogTask.close();
  });

  return addTaskButton;
}

function createDialog() {
  const dialog = document.createElement("dialog");

  dialog.innerHTML = `
    <form id="taskForm">
      <label>Título:</label>
      <input id="title" required>

      <label>Descrição:</label>
      <textarea id="description"></textarea>

      <label>Prazo:</label>
      <input id="dueDate" type="date">

      <menu>
        <button id="cancelAddTask" type="button">Cancelar</button>
        <button type="submit">Confirmar</button>
      </menu>
    </form>
  `;

  document.body.appendChild(dialog);
  return dialog;
}
