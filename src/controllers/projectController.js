import { projectFactory } from "../modulos/project";

const STORAGE_KEY = "odin_projects";

function loadProjects() {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
        return [];
    }

    return JSON.parse(data)
}

export function saveProjects() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

const projects = loadProjects();

if (projects.length === 0) {
    const defaultProject = projectFactory({
        title: 'Padrão',
        description: 'Projeto Inicial',
        deadline: '2026-01-01'
    });
    projects.push(defaultProject);
    saveProjects();

}


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
    saveProjects()
    return project;
}



