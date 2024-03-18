// Resumo sobre a função no Final

// Função que obtem os elementos base de um Pokemon
export async function infosPokemon(urlPokemon, nomPokemon, idContainer){

    // Conversor
    let convertorHgKg = (hectograma) => {
        let kg = hectograma / 10;
        return kg.toFixed(0);
    }

    // Formatador de String
    let capitalizeString = (str) => {
        let primeiroChar = str.charAt(0).toUpperCase()
        let restoStr = str.slice(1);
        return primeiroChar + restoStr
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
                <div class"pokemon">
                <h1 class="tituloPokemon">${capitalizeString(nomePokemon)}</h1>
                <div class="containerImg">
                    <img id="imgPokemon" src="${itensPokemon.sprites.other.home.front_default}" alt="imagem de um pokémon">
                </div>
                <div class="infoPokemon">
                    <div>
                        <h1 id="pesoPokemon">${convertorHgKg(itensPokemon.weight)} Kg</h1>
                        <h2>Peso</h2>
                    </div>
                    <div>
                        <h1 id="tipoPokemon" class="voador">${tiposPokemon}</h1>
                        <h2>Tipo</h2>
                    </div>
                    <div>
                        <h1 id="alturaPokemon">${itensPokemon.height} M</h1>
                        <h2>Altura</h2>
                    </div>
                    <div>
                        <h1 id="vidaPokemon">${itensPokemon.stats[0].base_stat} HP</h1>
                        <h2>Vida</h2>
                    </div>
                    <div>
                        <h1> ${itensPokemon.stats[1].base_stat}</h1>
                        <h2> Attack Básico</h2>
                    </div>
                    <div>
                        <h1> ${itensPokemon.stats[2].base_stat}</h1>
                        <h2> Defesa Básica</h2>
                    </div>
                    <div>
                        <h1> ${itensPokemon.stats[5].base_stat}</h1>
                        <h2> Velocidade</h2>
                    </div>
                    
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