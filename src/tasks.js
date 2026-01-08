class Task {
    title;
    description;
    priority;
    checklist;

    constructor(title, description, priority, checklist) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.checklist = checklist

    }
}

export let tarefa1 = new Task('tarefa1','description','importante','nao finalizada');

 