let teste = document.getElementById('teste');

teste.style.display = 'none';

document.getElementById('btnConsulte').addEventListener('click', function () {

    const tiposPokemon = [];

    //Declarando que a variável 'nomePokenon' é igual ao valor digitado no input
    let nomePokemon = document.getElementById('inputPokemon').value.toLowerCase();

    fetch(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}/`)

        .then(resp => resp.json())

        .then(itensPokemon => {

            // Fazendo um for para iterar cada índice da lista 'types' que contem cada tipo
            // de um Pokemon
            for (let i = 0; i < itensPokemon.types.length; i++) {

                // Atribuindo a variável o valor do tipo do pokemon, pelo caminho do formato Json
                let tipoPokemon = itensPokemon.types[i].type.name;

                //Adicionando a variável dentro do Array
                tiposPokemon.push(" " + tipoPokemon);
            }

            document.getElementById("imgPokemon").setAttribute("src", `${itensPokemon.sprites.other.home.front_default}`)
            document.getElementById("nomePokemon").innerHTML = itensPokemon.name;
            document.getElementById("pesoPokemon").innerHTML = `${itensPokemon.weight} KG`;
            document.getElementById("tipoPokemon").innerHTML = tiposPokemon;
            document.getElementById("alturaPokemon").innerHTML = itensPokemon.height;
            document.getElementById("vidaPokemon").innerHTML = itensPokemon.stats[0].base_stat;

            teste.style.display = 'grid';

        })
        .catch(error => {
            // Manipula o erro da requisição
            teste.style.display = 'none';
            let erroElemento = document.createElement("h3");
            erroElemento.style.color = 'red';
            erroElemento.id = 'erroPokemon';
            erroElemento.textContent = `Erro, pokemon: ${nomePokemon}, não existe`;
            document.querySelector("body").appendChild(erroElemento);
        });

    document.getElementById('btnConsulte').addEventListener('click', function () {
        // Limpando mensagens de erro anteriores
        let erroElemento = document.getElementById('erroPokemon');
        if (erroElemento) {
            erroElemento.remove();
        }
    })
})

