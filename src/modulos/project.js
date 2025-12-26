import { v4 as uuidv4 } from 'uuid';

export function projectFactory({title,description='',deadline = null}){
    if(!title){
        throw new Error('Projeto precisa de um titulo');
    }

    return{
        id:uuidv4(),
        title,
        description,
        deadline,

        type:'project'

    }

}

