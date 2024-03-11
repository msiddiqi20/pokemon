let cardRow = document.getElementById("card-row");
let cardTemplate = document.getElementById("card");
let badge = document.getElementById("badge");

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
      pokemon.data.name.split("-")[0].charAt(0).toUpperCase() +
      pokemon.data.name.split("-")[0].slice(1);
    cardBody.firstElementChild.textContent = pokemonDisplayName;

    for (let flavorTextEntry of pokemonSpecies.data.flavor_text_entries) {
      if (flavorTextEntry.language.name == "en") {
        cardBody.lastElementChild.textContent = flavorTextEntry.flavor_text;
        break;
      }
    }

    let cardFooter = cardClone.querySelector(".card-footer");

    pokemon.data.types.forEach((typeEntry) => {
      let typeBadge = badge.content.cloneNode(true);
      typeBadge = typeBadge.querySelector("span");

      let typeName =
        typeEntry.type.name.charAt(0).toUpperCase() +
        typeEntry.type.name.slice(1);
      typeBadge.textContent = typeName;

      if (cardFooter.firstElementChild) {
        typeBadge.classList.add("mx-2");
      }

      cardFooter.appendChild(typeBadge);
    });

    cardRow.appendChild(cardClone);
  }
}

getPokemon();
