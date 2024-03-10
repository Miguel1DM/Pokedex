// //importando função
import {infosPokemon} from './consultarPokemon.js';

document.addEventListener('DOMContentLoaded', async function(){

    let urlEvolucoes = "";
    let evolucao1 = "";
    let evolucao2 = "";
    let evolucao3 = "";
    let nomePokemon = "";
    let nomeEvolucoes = "";
    let evolucoes = [];

    //Usando nome do Pokemon que foi salvo no LocalStorege
    nomePokemon = localStorage.getItem('nomePokemonIndex').toLowerCase();

    // buscando o endpoint das evoluções do pokemon pelo nome dele
    try {
        const resp = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${nomePokemon}/`)
        const dadosPokemon = await resp.json()

        urlEvolucoes = dadosPokemon.evolution_chain.url;
    }catch (error){
        console.log(`Não foi possivel achar o endPoint das evoluções desse Pokemon: ${nomePokemon}`)
    }

    // Depois de achado o endPoint desejado, é pegado o nome das evoluções
    try{
    const resp = await fetch(urlEvolucoes)
    const evolucoesPokemon = await resp.json()

    // Como existem diversos pokemons com vários números de evoluções o Json é diferente dependendo do número
    //de evoluções, por isso é feita uma validação para saber o tamanho do Array de evoluções no Json
    //esse array de OBj tem o nome de 'evolves_to'
    if( evolucoesPokemon.chain.evolves_to.length > 2){

        // se o tamanho do Array for maior que 1 ou seja, ter mais de duas evoluções dentro do Array
        //O nome dessas evoluções é colocadas dentro do Array 'evolucoes'
        for(let i = 0; i < evolucoesPokemon.chain.evolves_to.length; i++){
            nomeEvolucoes = evolucoesPokemon.chain.evolves_to[i].species.name;
            evolucoes.push(nomeEvolucoes)
        }

        console.log(nomePokemon)
        // usa-se a função 'infosPokemon' para colocar os elemento na Tela
        infosPokemon(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}`,nomePokemon, 'pokemon');
        for(let i = 0; i < evolucoes.length ; i++ ){
            infosPokemon(`https://pokeapi.co/api/v2/pokemon/${evolucoes[i]}/`,evolucoes[i], 'pokemon');
        }

    // Se o Pokemon não tiver evoluções
    }else if(evolucoesPokemon.chain.evolution_details.length === 0 && evolucoesPokemon.chain.evolves_to.length === 0){

        if(window.confirm("Esse Pokemon não tem evoluções")){
            window.location.href = 'index.html';
        }else{
            window.location.href = 'index.html';
        }

        infosPokemon(`https://pokeapi.co/api/v2/pokemon/${evolucao1}/`,evolucao1, 'pokemon');
        infosPokemon(`https://pokeapi.co/api/v2/pokemon/${evolucao2}/`,evolucao2, 'pokemon');

    // Se o Pokemon tiver 2 evoluções
    }else if(evolucoesPokemon.chain.evolves_to[0].evolves_to[0] == null ){
        
        evolucao1 = evolucoesPokemon.chain.species.name;
        evolucao2 = evolucoesPokemon.chain.evolves_to[0].species.name;
        
        infosPokemon(`https://pokeapi.co/api/v2/pokemon/${evolucao1}/`,evolucao1, 'pokemon');
        infosPokemon(`https://pokeapi.co/api/v2/pokemon/${evolucao2}/`,evolucao2, 'pokemon');

    // Se o Pokemon tiver 3 evoluções
    }else{
        evolucao1 = evolucoesPokemon.chain.species.name;
        evolucao2 = evolucoesPokemon.chain.evolves_to[0].species.name;
        evolucao3 = evolucoesPokemon.chain.evolves_to[0].evolves_to[0].species.name;

        infosPokemon(`https://pokeapi.co/api/v2/pokemon/${evolucao1}/`,evolucao1, 'pokemon');
        infosPokemon(`https://pokeapi.co/api/v2/pokemon/${evolucao2}/`,evolucao2, 'pokemon');
        infosPokemon(`https://pokeapi.co/api/v2/pokemon/${evolucao3}/`,evolucao3, 'pokemon');

    }

    }catch(error){
        console.log(`Não foi possivel achar o nome das evoluções do ${nomePokemon}`)
    }
    
})

//Função criada para mudar de página
document.getElementById('mudarPokemon').addEventListener('click', function(){
    window.location.href = 'index.html';
})
