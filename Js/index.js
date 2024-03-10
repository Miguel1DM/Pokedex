let pokemon = document.getElementById('pokemon');
let evolucao = document.getElementById('divEvolucao');
pokemon.style.display = 'none';
evolucao.style.display = 'none';

document.getElementById('btnConsulte').addEventListener('click', async function () {
    let erroElemento = document.getElementById("erroPokemon");
    erroElemento.innerHTML = "Buscando..."

    let capitalizeString = (str) => {
        let primeiroChar = str.charAt(0).toUpperCase()
        let restoStr = str.slice(1);
        return primeiroChar + restoStr
    }

    let convertorHgKg = (hectograma) => {
        let kg = hectograma / 10;
        return kg.toFixed(0);
    }

    let convertorInchMetro = (inches) => {
        let metros = inches * 0.0254
        return metros.toFixed(2);
    }

    const tiposPokemon = [];

    //Declarando que a variável 'nomePokenon' é igual ao valor digitado no input
    let nomePokemon = document.getElementById('inputPokemon').value.toLowerCase();

    await fetch(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}`)

        .then(resp => resp.json())
        .then(itensPokemon => {
            erroElemento.innerHTML = ""
            pokemon.style.display = 'none';
            // Fazendo um for para iterar cada índice da lista 'types' que contem cada tipo
            // de um Pokemon
            for (let i = 0; i < itensPokemon.types.length; i++) {

                // Atribuindo a variável o valor do tipo do pokemon, pelo caminho do formato Json
                let tipoPokemon = itensPokemon.types[i].type.name;

                //Adicionando a variável dentro do Array
                tiposPokemon.push(" " + capitalizeString(tipoPokemon));
            }

            nomePokemon = itensPokemon.name;


            document.getElementById("nomePokemon").innerHTML = capitalizeString(nomePokemon) + " ";
            document.getElementById("imgPokemon").setAttribute("src", `${itensPokemon.sprites.other.home.front_default}`)
            document.getElementById("pesoPokemon").innerHTML = `${convertorHgKg(itensPokemon.weight)} KG`;
            document.getElementById("tipoPokemon").innerHTML = tiposPokemon;
            document.getElementById("tipoPokemon").setAttribute("class", `${tiposPokemon[0]}`);
            document.getElementById("alturaPokemon").innerHTML = `${convertorInchMetro(itensPokemon.height)} M`;
            document.getElementById("vidaPokemon").innerHTML = itensPokemon.stats[0].base_stat;

            // Estado para a mudar imagem do pokemon 
            let isShinyElement = document.getElementById("isShiny");
            let isShinyState = false;
            isShinyElement.addEventListener("change", () => {
                if (isShinyState == false) {
                    isShinyState = true;
                } else if (isShinyState == true) {
                    isShinyState = false;
                }
                if (isShinyState == true) {
                    document.getElementById("imgPokemon").setAttribute("src", `${itensPokemon.sprites.other.home.front_shiny}`)
                } else {
                    document.getElementById("imgPokemon").setAttribute("src", `${itensPokemon.sprites.other.home.front_default}`)
                }
            })

            // Buscando evoluções do pokemon pelo Id 
            fetch(`https://pokeapi.co/api/v2/evolution-chain/${itensPokemon.id}`)
                .then(response => response.json())
                .then(nomeEvolucao => nomeEvolucao.chain.evolves_to[0].species.name)
                .then(nomeEvolucao => document.getElementById("Evolucao").innerHTML = `Evolução: ${capitalizeString(nomeEvolucao)}`);


            pokemon.style.display = 'flex';
            evolucao.style.display = 'flex';
        })
        .catch(error => {
            // Manipula o erro da requisição
            pokemon.style.display = 'none';
            let erroElemento = document.getElementById("erroPokemon");
            console.log(error)
            erroElemento.innerHTML = "Pokemon não encontrado"
        });

        console.log(nomePokemon)
         // Salvando o nome do Pokemon no LocalStorage
        localStorage.setItem('nomePokemonIndex', document.getElementById('inputPokemon').value);
        
})
