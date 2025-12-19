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

