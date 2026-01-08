 import { tarefa1 } from "./tasks";
 class Project{
    name;
    
    constructor(name){
        this.name = name;
        this.tasks = []
    }
    addTask(newTask){

        this.tasks.push(newTask)
    }
}

let projetoTeste = new Project('teste');

projetoTeste.addTask(tarefa1)

export const Teste = console.log(projetoTeste)
