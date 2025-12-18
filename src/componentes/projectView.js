import { project } from "../modulos/project";

const button = document.getElementById('default-project-btn');
button.textContent = defaultProject.title;

button.addEventListener('click', () => {
  openProject(defaultProject);
});

export function viewProject(project) {
  const view = document.getElementById('content-container');
  view.innerHTML = `
    <h2>${project.title}</h2>
    <p>${project.description}</p>
    <p>Prazo: ${project.deadline}</p>
  `;
}
