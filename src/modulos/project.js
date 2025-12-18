import { v4 as uuidv4 } from 'uuid';

export function projectFactory(title,description,deadline){
    return{
        id:uuidv4(),
        title:title,
        description:description,
        deadline:deadline,

        type:'project'

    }

}
const project = projectFactory('Sistema', 'Criar API', '2026-01-10');
console.log(project)