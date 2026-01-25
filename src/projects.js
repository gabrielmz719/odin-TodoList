export var listaProjetos = [];
export class Projeto {
    constructor(titulo, descricao) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.tarefas = []
    }
    adcionarTarefa(tarefa) {
        this.tarefas.push(tarefa)
    }
}

const projetoPadrao = new Projeto(
    "Projeto Padrão",
    "Descrição da construção",
)
listaProjetos.push(projetoPadrao)

