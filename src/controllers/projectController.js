import { projectFactory } from "../modulos/project";

const projects = [];

const defaultProject = projectFactory(
    'Padrão',
    'Projeto inicial',
    '2026-01-01'
);



projects.push(defaultProject);

export function getProjects(){
    return projects;
}

export function addProjects(title,description,deadline){
    const project = projectFactory(title,description,deadline);
    projects.push(project);
    return project;

}

