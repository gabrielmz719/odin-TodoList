import { taskFactory } from "../modulos/task";

const tasks = [];



export function getTasks(){
    return [...tasks];
}

export function addTask(title,description,dueDate,priority,checklist){
    const task = taskFactory({
        title,
        description,
        dueDate,
        priority,
        checklist
    });
    tasks.push(task);
    return task;
}

