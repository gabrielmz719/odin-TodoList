import { toDate, isToday, isThisWeek, subDays, } from 'date-fns'

export default class Task{
    constructor (title,description,dueDate = 'No date',priority,notes,checklist){
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.notes = notes
        this.checklist = checklist
    }
    setName(name){
        this.name = name
    }
    getName(){
        return this.name
    }

}