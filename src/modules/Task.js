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

    setDate(dueDate){
        this.dueDate = dueDate
    }

    getDate(){
        return this.duedate
    }

    getDAteFormatted(){
        const day = this.dueDate.split('/')[0]
        const month = this.dueDate.split('/')[1]
        const year = this.dueDate.split('/')[2]
        return `${day}/${month}/${year}`

    }
}