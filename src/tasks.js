class Tarefa {
    constructor(titulo,descricao,dueDate,notes = "",checklist = []){
        this.titulo = titulo;
        this.descricao = descricao;
        this.dueDate = dueDate;
        this.notes = notes;
        this.checklist = checklist;

    }

    adcionarItemChecklist(item){
        this.checklist.push({
            texto: item,
            concluido: false
        })
    }
    marcarItemConcluido(index){
        if(this.checklist[index]){
            this.checklist[index].concluido = true;
        }
    }
    removerItemChecklist(index){
        this.checklist.splice(index,1);
    }
}

export const tarefa1 = new Tarefa(
    "Estudar javascript",
    "Revisar classes e objetos",
    "2026-02-01",
    "Focar exmplos praticos"

)

tarefa1.adcionarItemChecklist('Ler documentação');




 