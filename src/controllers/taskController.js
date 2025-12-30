import { taskFactory } from "../modulos/task";
import { saveProjects, getProjects } from "./projectController";

export function addTaskToProject(projectId, taskData) {
  const projects = getProjects();
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    throw new Error('Projeto não encontrado');
  }

  const task = taskFactory(taskData);
  project.tasks.push(task);

  saveProjects(projects); 

  return task;
}
