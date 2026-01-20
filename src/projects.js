class Projeto{
    constructor(titulo,descricao){
        this.titulo = titulo;
        this.descricao = descricao;
        this.tarefas = []
    }
    adcionarTarefa(tarefa){
        this.tarefas.push(tarefa)
    }
}

export const projeto1 = new Projeto(
    "Construir algo",
    "Descrição da construção"
)

export const projetoPadrao = new Projeto(
    "Projeto Padrão",
    "Descrição da construção",
)

