import { taskFactory } from "../modulos/task";

const tasks = [];



export function getTasks(){
    return tasks;
}

export function addTasks(title,description,dueDate,priority,checlist){
    const task = taskFactory(title,description,dueDate,priority,checlist);
    tasks.push(task);
    return task;
}

