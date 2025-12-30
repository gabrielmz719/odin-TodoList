import { taskFactory } from "../modulos/task";
import { getProjects, saveProjects } from "./projectController.js";

/**
 * Adiciona uma task a um projeto
 */
export function addTaskToProject(projectId, taskData) {
  const project = getProjects().find(p => p.id === projectId);

  if (!project) {
    throw new Error("Projeto não encontrado");
  }

  const task = taskFactory(taskData);
  project.tasks.push(task);

  saveProjects();
  return task;
}

/**
 * Atualiza uma task existente
 */
export function updateTask(projectId, taskId, data) {
  const project = getProjects().find(p => p.id === projectId);
  if (!project) return;

  const task = project.tasks.find(t => t.id === taskId);
  if (!task) return;

  task.title = data.title ?? task.title;
  task.description = data.description ?? task.description;
  task.dueDate = data.dueDate ?? task.dueDate;
  task.priority = data.priority ?? task.priority;
  task.completed = data.completed ?? task.completed;

  saveProjects();
}

/**
 * Remove uma task de um projeto
 */
export function deleteTask(projectId, taskId) {
  const project = getProjects().find(p => p.id === projectId);
  if (!project) return;

  project.tasks = project.tasks.filter(task => task.id !== taskId);

  saveProjects();
}
