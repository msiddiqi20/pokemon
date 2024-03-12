const cardRow = document.getElementById("card-row");
const cardTemplate = document.getElementById("card");
const badge = document.getElementById("badge");
const chosenPokemon = document.getElementById("chosen-pokemon");
const opposingPokemon = document.getElementById("opposing-pokemon");
const offCanvas = new bootstrap.Offcanvas(
  document.getElementById("offcanvasTop")
);

const pokemonMap = new Map();

async function getPokemon() {
  for (let i = 1; i <= 493; i++) {
    let pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`);

    let pokemonSpecies = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${i}/`
    );

    let cardClone = cardTemplate.content.cloneNode(true);

    cardClone.querySelector(".col").id = i;
    pokemonMap.set(i, pokemon.data.name.toUpperCase());

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

cardRow.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();

  let target = event.target;

  if (target.id != "card-row" && !target.classList.contains("col")) {
    while (!target.classList.contains("col")) {
      target = target.parentNode;
    }

    let selectedPokemon = pokemonMap.get(parseInt(target.id));
    console.log(selectedPokemon);

    chosenPokemon.src = `PokemonGifs/FrontShiny/${selectedPokemon}.gif`;
    chosenPokemon.alt = `A Picture of ${selectedPokemon}`;

    let random = Math.floor(Math.random() * 493) + 1;
    let randomPokemon = pokemonMap.get(random);

    opposingPokemon.src = `PokemonGifs/FrontShiny/${randomPokemon}.gif`;
    opposingPokemon.alt = `A Picture of ${randomPokemon}`;
  }
});

cardRow.addEventListener("mouseover", (event) => {
  event.preventDefault();
  event.stopPropagation();

  let target = event.target;

  if (target.id != "card-row" && !target.classList.contains("col")) {
    while (!target.classList.contains("col")) {
      target = target.parentNode;
    }

    let selectedPokemon = pokemonMap.get(parseInt(target.id));

    let selectedCard = document.getElementById(target.id);
    selectedCard.querySelector(
      "img"
    ).src = `PokemonGifs/FrontShiny/${selectedPokemon}.gif`;
  }
});

cardRow.addEventListener("mouseout", async (event) => {
  event.preventDefault();
  event.stopPropagation();

  let target = event.target;

  if (target.id != "card-row" && !target.classList.contains("col")) {
    while (!target.classList.contains("col")) {
      target = target.parentNode;
    }

    let response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${parseInt(target.id)}/`
    );

    let selectedCard = document.getElementById(target.id);
    selectedCard.querySelector("img").src = response.data.sprites.front_shiny;
  }
});
