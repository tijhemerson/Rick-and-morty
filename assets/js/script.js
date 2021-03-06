//Variáveis que vão ser usadas para guardar os valores buscados na API
var nome = document.querySelector("#nome");
var perfil = document.querySelector("#perfil");
var estado = document.querySelector("#estado");
var especie = document.querySelector("#especie");
var genero = document.querySelector("#genero");
var origem = document.querySelector("#origem");
var ul = document.querySelector("#ul");

var cards = document.querySelectorAll('.botao');

var node = document.getElementById("result");

//Constantes de pesquisa
const barra = document.querySelector("#barra");
const clicke = document.querySelector("#clicke");
//Função para pegar o resultado na API e limpando a pesquisa que pode ter sido feita anteriormente
function fetchData() {
    fetch(`https://rickandmortyapi.com/api/character/?name=${barra.value}`)
    .then(resposta=>{
        return resposta.json();
    })
    .then(dados => {     

        document.querySelector('#result').innerHTML = '';
        for (dados of dados.results){
            let pes = `
            <div class="card">
            <a id="${dados.id}" class="botao" data-toggle="modal" data-target="#exampleModal" onclick="fetchChar(${dados.id})">
                <img class="card-img-top" src="${dados.image}" alt="Card image cap">
                <div class="card-body">
                <h5 class="card-title">${dados.name}</h5>
                </div> 
            </a>
            </div>`;
            document.querySelector('#result').innerHTML += pes;
            barra.value = "";

        }
    });    
}
//Função para o funcionamento com o uso do "click"
clicke.addEventListener('click', function(evt) {
    evt.preventDefault();
    fetchData();
});
//Função para o funcionamento com o uso da tecla "Enter" 
barra.addEventListener("keydown", (evt) => {
    if(evt.key == "Enter") {
        evt.preventDefault();
        fetchData();
    }
});
//Função para colocar os dados nos novos cards após à pesquisa
function fetchChar(id) {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then(function(resposta){
        return resposta.json();
    })
    .then(function(dados){
        console.log(dados)
            nome.textContent = dados.name;
            perfil.src = dados.image;
            estado.textContent = dados.status;
            especie.textContent = dados.species;
            genero.textContent = dados.gender;
            origem.textContent = dados.origin.name;
            ul.textContent = dados.location.name;
    });        
}