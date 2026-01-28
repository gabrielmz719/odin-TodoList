// src/index.js
import "./styles.css";
import { tarefa1 } from "./tasks";
import { Projeto } from "./projects";
import { listaProjetos } from "./projects";



// conteudo.innerText = "";


// const exibidos = new Set();

function renderizarProjetos(listaProjetos) {
  const conteudo = document.getElementById("conteudoPagina");

  // limpa antes de renderizar (importante se chamar a função mais de uma vez)
  conteudo.innerHTML = "";

  const titulosUnicos = [...new Set(listaProjetos.map(obj => obj.titulo))];

  titulosUnicos.forEach(titulo => {
    const div = document.createElement("div");
    const h2 = document.createElement("h2");

    h2.textContent = titulo;

    div.appendChild(h2);
    conteudo.appendChild(div);
  });
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