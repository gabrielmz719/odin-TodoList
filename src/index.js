// src/index.js
import "./styles.css";
import { tarefa1 } from "./tasks";
import { Projeto } from "./projects";
import { listaProjetos } from "./projects";



const conteudo = document.getElementById("conteudoPagina");
// conteudo.innerText = "";

// const exibidos = new Set();

function renderizarProjetos(listaProjetos) {
   return [...new Set(listaProjetos.map(obj => obj.titulo))];
  
}


console.log(renderizarProjetos(listaProjetos));

const form = document.getElementById('dialogProjeto')

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nomeProjeto = document.getElementById("nomeProjeto").value;
  const descricaoProjeto = document.getElementById("descricaoProjeto").value;

 
  const novoProjeto = new Projeto(nomeProjeto, descricaoProjeto);

  listaProjetos.push(novoProjeto);
  
  console.log(listaProjetos);
  modalProjetos.close();
});




console.log(tarefa1)

const modalProjetos = document.getElementById('dialogProjeto');
const btnAbrirFormProjeto = document.getElementById('btnCriarNovoProjeto');
const btnFecharFormProjeto = document.getElementById('btnFechar');


btnAbrirFormProjeto.addEventListener('click', () => {
    modalProjetos.showModal();
});


btnFecharFormProjeto.addEventListener('click', () => {
    modalProjetos.close();
});