export class Project{
    constructor(title,description){
        this.id=crypto.randomUUID();
        this.title = title;
        this.description = description;

    }
}