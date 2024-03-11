let pokemonSection = document.getElementById("pokemon");

pokemonSection.style.display = "none";

document
  .getElementById("btnConsulte")
  .addEventListener("click", async function () {
    // Função para deixar a primeira letra ds string Maiúscula
    let capitalizeString = (str) => {
      let primeiroChar = str.charAt(0).toUpperCase();
      let restoStr = str.slice(1);
      return primeiroChar + restoStr;
    };

    // Conversor do Peso em Hectogramas para KG
    let convertorHgKg = (hectograma) => {
      let kg = hectograma / 10;
      return kg.toFixed(0);
    };

    // Conversor Decímetros para Metros
    let convertorDeciMetro = (decimetros) => {
      let metros = decimetros / 10;
      return metros.toFixed(2);
    };

    const tiposPokemon = [];

    //Declarando que a variável 'nomePokenon' é igual ao valor digitado no input
    let nomePokemon = document
      .getElementById("inputPokemon")
      .value.toLowerCase();

    await fetch(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}/`)
      .then((resp) => resp.json())

      .then((itensPokemon) => {
        // Fazendo um for para iterar cada índice da lista 'types' que contem cada tipo
        // de um Pokemon
        for (let i = 0; i < itensPokemon.types.length; i++) {
          // Atribuindo a variável o valor do tipo do pokemon, pelo caminho do formato Json
          let tipoPokemon = itensPokemon.types[i].type.name;

          //Adicionando a variável dentro do Array
          tiposPokemon.push(" " + tipoPokemon);
        }

        document
          .getElementById("imgPokemon")
          .setAttribute(
            "src",
            `${itensPokemon.sprites.other.home.front_default}`
          );
        document.getElementById("nomePokemon").innerHTML = capitalizeString(
          itensPokemon.name
        );
        document.getElementById("pesoPokemon").innerHTML = `${convertorHgKg(
          itensPokemon.weight
        )} KG`;
        document.getElementById("tipoPokemon").innerHTML = tiposPokemon;
        document.getElementById("alturaPokemon").innerHTML = convertorDeciMetro(
          itensPokemon.height
        );
        document.getElementById("vidaPokemon").innerHTML =
          itensPokemon.stats[0].base_stat;

        pokemonSection.style.display = "grid";

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
            document
              .getElementById("imgPokemon")
              .setAttribute(
                "src",
                `${itensPokemon.sprites.other.home.front_shiny}`
              );
          } else {
            document
              .getElementById("imgPokemon")
              .setAttribute(
                "src",
                `${itensPokemon.sprites.other.home.front_default}`
              );
          }
        });
      })
      .catch((error) => {
        // Manipula o erro da requisição
        pokemonSection.style.display = "none";
        let erroElemento = document.createElement("h3");
        erroElemento.style.color = "red";
        erroElemento.id = "erroPokemon";
        erroElemento.textContent = `Erro, pokemon: ${nomePokemon}, não existe`;
        document.querySelector("body").appendChild(erroElemento);
      });

    document
      .getElementById("btnConsulte")
      .addEventListener("click", function () {
        // Limpando mensagens de erro anteriores
        let erroElemento = document.getElementById("erroPokemon");
        if (erroElemento) {
          erroElemento.remove();
        }
      });
  });
