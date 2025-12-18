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

