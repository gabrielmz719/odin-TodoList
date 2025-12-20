import { addTasks, getTasks } from "../controllers/taskController";





const tasks = getTasks();

export function createAddTaskButton() {
    const addTaskButton = document.createElement('button');
    const dialogTask = createDialog();
    const cancelAddTaskButton = document.getElementById('cancelAddTAsk');

    addTaskButton.textContent = `Add Task`;
    addTaskButton.addEventListener('click', () => {
        dialogTask.showModal();
    });

    cancelAddTaskButton.addEventListener('click', () => {
        dialogTask.close();
    });

    return addTaskButton;
}

// export const buttonAddTask = document.getElementById('btnAddTask');



function createDialog() {
    const dialog = document.createElement("dialog");

    dialog.innerHTML = `
    <form method="dialog" id="projectForm">

      <label>Título:</label>
      <input id="title" required>

      <label>Descrição:</label>
      <textarea id="description"></textarea>

      <label>Prazo:</label>
      <input id="dueDate" type="date">

      <input type="checkbox" id="taskComplete" name="taskComplete" value="task_complete">
      <label for="taskComplete">Task Complete</label>

      <menu>
        <button id="cancelAddTAsk" type="reset">Cancelar</button>
        <button id="confirm" type="submit">Confirmar</button>
      </menu>
    </form>
  `;

    document.body.appendChild(dialog);
    return dialog;
}


