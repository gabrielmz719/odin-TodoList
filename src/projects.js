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

projetoTeste.addTask('novaTask')

export const Teste = console.log(projetoTeste)
