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

export function updateProject(projectId, data) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    project.title = data.title ?? project.title;
    project.description = data.description ?? project.description;
    project.deadline = data.deadline ?? project.deadline;

    saveProjects();
}

export function deleteProject(projectId){
    const index = projects.findIndex(p=>p.id===projectId);
    if(index === -1)return;

    projects.splice(index,1);
    
    saveProjects();
}



