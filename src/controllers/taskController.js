import { taskFactory } from "../modulos/task";
import { getProjects } from "./projectController";

export function addTaskToProject(projectId, taskData) {
  const project = getProjects().find(p => p.id === projectId);

  if (!project) {
    throw new Error('Projeto não encontrado');
  }

  const task = taskFactory(taskData);
  project.tasks.push(task);

  return task;
}
