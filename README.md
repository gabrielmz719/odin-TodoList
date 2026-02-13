# Documentação – App de Tarefas por Projetos

## 1. Visão Geral

Este documento descreve o planejamento e a arquitetura do aplicativo de gerenciamento de tarefas baseado em projetos.

O objetivo do sistema é permitir que o usuário organize seus estudos, projetos e atividades de forma simples, estruturada e persistente, utilizando JavaScript puro e boas práticas de engenharia de software.

---

## 2. Objetivo do Sistema

O aplicativo deve permitir que o usuário:

* Criar projetos com nome e descrição
* Adicionar tarefas dentro de cada projeto
* Organizar tarefas por data, prioridade e checklist
* Salvar os dados localmente no navegador
* Gerenciar atividades sem depender de servidores externos

Foco principal:

> Simplicidade, organização e manutenibilidade.

---

## 3. Tecnologias Utilizadas

* **JavaScript (Vanilla JS)**
* **Webpack** (empacotamento)
* **LocalStorage** (persistência)
* **date-fns** (manipulação de datas)

Arquitetura baseada em separação de responsabilidades inspirada nos princípios **SOLID**.

---

## 4. Estrutura Conceitual do Sistema

O sistema é dividido em quatro camadas principais:

### 4.1 Domínio

Responsável por representar as entidades do sistema.

* `Project`
* `Task`
* `ChecklistItem`

> Essas entidades não possuem lógica de interface ou persistência.

---

### 4.2 Serviços (Lógica)

Responsável por aplicar as regras de negócio.

Funções principais:

* Criar, editar e remover projetos
* Criar, editar e remover tarefas
* Validar datas
* Ordenar por prioridade
* Gerenciar checklist

---

### 4.3 Persistência

Responsável por salvar e recuperar dados.

Utiliza **LocalStorage** para armazenar dados em formato JSON.

Funções principais:

* Salvar estado do app
* Carregar estado inicial
* Atualizar dados
* Limpar dados

---

### 4.4 Interface (UI)

Responsável pela interação com o usuário.

Funções principais:

* Exibir projetos
* Exibir tarefas
* Formulários
* Botões
* Modais

> A UI não contém regras de negócio.

---

## 5. Modelo de Dados

### 5.1 Estrutura Geral

```txt
App
 └── projects[]
      ├── id
      ├── name
      ├── description
      └── tasks[]
           ├── id
           ├── title
           ├── description
           ├── dueDate
           ├── priority
           └── checklist[]
                ├── id
                ├── text
                └── done
```

---

### 5.2 Projeto

Atributos:

* `id` → identificador único
* `name` → nome do projeto
* `description` → descrição curta
* `tasks` → lista de tarefas

---

### 5.3 Tarefa

Atributos:

* `id` → identificador único
* `title` → título
* `description` → descrição detalhada
* `dueDate` → data limite
* `priority` → prioridade numérica
* `checklist` → lista de itens

---

### 5.4 Checklist

Atributos:

* `id` → identificador único
* `text` → descrição
* `done` → booleano (concluído ou não)

---

## 6. Fluxo Principal do Usuário

### 6.1 Inicialização

1. Usuário abre o aplicativo
2. Sistema carrega dados do LocalStorage
3. Interface renderiza projetos

---

### 6.2 Criação de Projeto

1. Usuário preenche formulário
2. UI envia dados ao Controller
3. Sistema valida
4. Projeto é criado
5. Dados são salvos
6. Interface atualiza

---

### 6.3 Criação de Tarefa

1. Usuário seleciona projeto
2. Preenche formulário
3. Sistema valida
4. Tarefa é adicionada
5. Dados são salvos
6. Interface atualiza

---

### 6.4 Atualização de Checklist

1. Usuário marca/desmarca item
2. Sistema atualiza estado
3. Dados são salvos
4. Interface reflete mudança

---

## 7. Estrutura de Pastas (Conceitual)

```txt
src/
 ├── domain/
 │    ├── Project.js
 │    └── Task.js
 │
 ├── services/
 │    ├── ProjectService.js
 │    └── TaskService.js
 │
 ├── storage/
 │    └── StorageManager.js
 │
 ├── ui/
 │    ├── ProjectView.js
 │    └── TaskView.js
 │
 └── controller/
      └── AppController.js
```

---

## 8. Princípios de Arquitetura

### 8.1 Separação de Responsabilidades

Cada módulo deve ter apenas uma função principal.

* UI → exibe
* Service → processa
* Storage → salva

---

### 8.2 Baixo Acoplamento

Módulos não devem depender diretamente uns dos outros.

A comunicação deve ocorrer via contratos claros.

---

### 8.3 Manutenibilidade

O sistema deve permitir:

* Inclusão de novas funcionalidades
* Troca de persistência futuramente
* Refatoração segura

---

## 9. Regras do Sistema

1. Toda tarefa pertence a um projeto
2. Uma tarefa só pode existir dentro de um projeto
3. Tarefas possuem apenas um prazo
4. Prioridade é numérica (ex: 1 a 5)
5. Checklist possui status individual
6. IDs são obrigatórios

---

## 10. Uso do date-fns

A biblioteca **date-fns** será utilizada para:

* Formatação de datas
* Comparação de prazos
* Verificação de atraso
* Filtro por data

Exemplos de uso futuro:

* Mostrar tarefas vencidas
* Exibir "vence hoje"
* Ordenar por data

---

## 11. Persistência com LocalStorage

Estratégia:

* Todo o estado será salvo como JSON
* Uma chave principal será utilizada
* O estado será salvo após cada modificação

Exemplo conceitual:

```js
Key: taskAppData
Value: JSON.stringify(AppState)
```

---

## 12. Possíveis Evoluções Futuras

* Sistema de login
* Sincronização em nuvem
* Tags personalizadas
* Tarefas recorrentes
* Estatísticas de produtividade
* Exportação de dados

---

## 13. Processo de Desenvolvimento

Etapas sugeridas:

1. Implementar domínio
2. Implementar storage
3. Implementar serviços
4. Implementar controller
5. Implementar UI
6. Integrar tudo
7. Testar
8. Refatorar

---

## 14. Princípio Norteador

Antes de escrever código, responda:

* Em qual camada isso pertence?
* Isso viola alguma responsabilidade?
* Posso testar isso isoladamente?
* Isso facilita manutenção futura?

> O sistema deve ser simples, claro e sustentável a longo prazo.
