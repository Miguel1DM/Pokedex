// Resumo sobre a função no Final

// Função que obtem os elementos base de um Pokemon
export async function infosPokemon(urlPokemon, nomPokemon, idContainer){

    // Conversor
    let convertorHgKg = (hectograma) => {
        let kg = hectograma / 10;
        return kg.toFixed(0);
    }
    
    const tiposPokemon = [];
    let divFinal = "";

    // O nome do Pokemon sera passado como parâmetro
    let nomePokemon = nomPokemon.toLowerCase();

    // O endpoint sera passado como parâmetro 'urlPokemon';
    const resp = await fetch(urlPokemon)
    const itensPokemon = await resp.json()

        // Fazendo um for para iterar cada índice da lista 'types' que contem cada tipo
        // de um Pokemon
        for (let i = 0; i < itensPokemon.types.length; i++) {

                // Atribuindo hà variável o valor do tipo do pokemon, pelo caminho do formato Json
                let tipoPokemon = itensPokemon.types[i].type.name;

                // Colocando essa variável dentro de um Array
                tiposPokemon.push(tipoPokemon)
            }

            // Pegando as informações e montando uma Div com elas
            divFinal = `
                <div class"infosPokemon">
                    <h3> Nome Pokemon: ${nomePokemon}</h3>
                    <img id="imagePokemon" src="${itensPokemon.sprites.other.home.front_default}" class="imgs"></img>
                    <h3> Peso: ${convertorHgKg(itensPokemon.weight)} Kg</h3>
                    <h3> ALtura: ${itensPokemon.height} M</h3>
                    <h3> Tipo: ${tiposPokemon} </h3>
                    <h3> Vida: ${itensPokemon.stats[0].base_stat}</h3>
                    <h3> Attack Básico: ${itensPokemon.stats[1].base_stat}</h3>
                    <h3> Defesa Básica: ${itensPokemon.stats[2].base_stat}</h3>
                    <h3> Velocidade: ${itensPokemon.stats[5].base_stat}</h3>
                </div>
            `

            // Atribuindo a variável 'container' um elemento HTML, de preferencia Div, o seu valor
            // O id desse elemento HTMl deve ser passado como último  parâmetro e entre aspas ''
            const container = document.getElementById(idContainer)

            // Fazendo a validação, se a fnção conseguir achar esse elemento HTML pelo ID
            if (container) {
                container.innerHTML += divFinal;
            } else {
                console.error(`Elemento com ID ${idContainer} não encontrado.`);
            }
}

// Resumo sobre a função 

// atraves da função 'infosPokemon' é obtido infromções sobre os Pokemons e depois elas são colocadas no HTML
//como não foi possível deixar o endPoint dentro da função e depois importa-la, então o mesmo foi deixado
//como parâmetro, depois é usado o nome para completar o endPoint, e usado para exibiro nome do pokemon
//e por ultimo é pedido o id de uma Div criada no HTML para 'printar' as informações do Pokemon na tela