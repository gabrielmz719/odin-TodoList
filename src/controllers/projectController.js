import { projectFactory } from "../modulos/project";

const projects = [];

const defaultProject = projectFactory({
    title: 'Padrão',
    description: 'Projeto Inicial',
    deadline: '2026-01-01'
});
projects.push(defaultProject);

export function getProjects() {
    return projects;
}



export function addProject(title, description, deadline) {
    const project = projectFactory({
        title, 
        description,
        deadline
    });
    projects.push(project);
    return project;
}



