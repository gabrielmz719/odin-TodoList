export class Task{
    constructor(title,description,date,priority,checklist){
        this.id=crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.date = datefns();
        this.priority=priority;
        this.checklist = this.checklist;

    }
}