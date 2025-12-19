// import { project } from "../modulos/project";
import { getProjects } from "../controllers/projectController";

const projects = getProjects();
const defaultProject = projects[0];




const button = document.getElementById('default-project-btn');
button.textContent = defaultProject.title;

button.addEventListener('click', () => {
  viewProject(defaultProject);
});

export function viewProject(project) {
  const view = document.getElementById('content-container');
  view.innerHTML = `
    <h2>${project.title}</h2>
    <p>${project.description}</p>
    <p>Prazo: ${project.deadline}</p>
  `;
}
