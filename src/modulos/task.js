import { v4 as uuidv4 } from 'uuid';

export function taskFactory(title,description,dueDate,priority,checklist){
    return{
        id:uuidv4(),
        title:title,
        description:description,
        dueDate:dueDate,
        priority:priority,
        checklist:checklist,
        type:'task'
    }
}
