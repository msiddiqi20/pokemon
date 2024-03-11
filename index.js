let cardRow = document.getElementById("card-row");
let cardTemplate = document.getElementById("card");

async function getPokemon() {
  for (let i = 1; i <= 493; i++) {
    let pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`);

    let pokemonSpecies = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${i}/`
    );

    let cardClone = cardTemplate.content.cloneNode(true);

    let cardImg = cardClone.querySelector(".card-img-top");
    cardImg.src = pokemon.data.sprites.front_shiny;
    cardImg.alt = `A Picture of ${pokemon.data.name}`;

    let cardBody = cardClone.querySelector(".card-body");
    let pokemonDisplayName =
      pokemon.data.name.charAt(0).toUpperCase() + pokemon.data.name.slice(1);
    cardBody.firstChild.textContent = pokemonDisplayName;

    for (let flavorTextEntry of pokemonSpecies.data.flavor_text_entries) {
      if (flavorTextEntry.language.name == "en") {
        cardBody.lastChild.textContent = flavorTextEntry.flavor_text;
        break;
      }
    }

    let cardFooter = cardClone.querySelector(".card-footer");

    pokemon.data.types.forEach((typeEntry) => {
      cardFooter.firstChild.textContent += `${typeEntry.type.name},`;
    });

    cardRow.appendChild(cardClone);
  }
}

getPokemon();
