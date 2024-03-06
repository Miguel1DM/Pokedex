document.getElementById('pesPokemon').addEventListener('click', function(){

    const tiposPokemon = [];

    //Declarando que a variável 'nomePokenon' é igual ao valor digitado no input
    let nomePokemon = document.getElementById('nomePokemon').value;

    //Delcarando que a variável 'listaPokemon' é iguel a div HTMl 'lisPokemon'
    const listaPokemon = document.getElementById('lisPokemon');

    fetch(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}/`)

    .then(resp => resp.json())

    .then(itensPokemon => {

        // Fazendo um for para iterar cada índice da lista 'types' que contem cada tipo
        // de um Pokemon
        for(let i = 0; i < itensPokemon.types.length; i++){
            
            // Atribuindo a variável o valor do tipo do pokemon, pelo caminho do formato Json
            let tipoPokemon = itensPokemon.types[i].type.name;

            //Adicionando a variável dentro do Array
            tiposPokemon.push(" " + tipoPokemon);
        }
            listaPokemon.innerHTML=`
                    <div id ="infoPokemon">
                        <p> Nome: ${itensPokemon.name}</p>
                        <p> Peso: ${itensPokemon.weight}</p>
                        <p> Tipo: ${tiposPokemon}</p>
                        <p> vida: ${itensPokemon.stats[0].base_stat}</p>
                    </div>
                        ` 
        })
    })
