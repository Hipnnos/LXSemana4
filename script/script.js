const pokeCard = document.querySelector("[data-card]");
const pokeName = document.querySelector("[data-name]");
const pokeImg = document.querySelector("[data-img]");
const pokeId = document.querySelector("[data-id]");
const pokeTypes = document.querySelector("[data-types]");
const pokeStats = document.querySelector("[data-stats]");

const Pokemon = (event) => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then((data) => data.json())
        .then((response) => renderPokemonData(response))
        .catch((err) => renderNotFound());
};

const renderPokemonData = (data) => {
    const sprite = data.sprites.front_default;
    const { stats, types, moves } = data;

    pokeName.textContent = data.name;
    pokeImg.setAttribute("src", sprite);
    pokeId.textContent = `Nº ${data.id}`;
    renderPokemonTypes(types);
    renderPokemonStats(stats);
    renderPokemonMoves(moves);
};

const renderPokemonTypes = (types) => {
    pokeTypes.innerHTML = "";
    types.forEach((type) => {
        const typeTextElement = document.createElement("div");
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
};

const renderPokemonMoves = (moves) => {
    const pokeT = document.getElementById("txt_moves");
    if (moves != "") {
        let movimiento = [];
        for (let i = 0; i < 3; i++) {
            const element = moves[i];
            movimiento.push(element.move.name);
        }
        pokeT.innerHTML =
            "<div style='font-family: monospace; font-size: 12px;'><strong>Movimientos</strong>" +
            "<br>" +
            movimiento +
            "</div>";
    } else {
        pokeT.innerHTML = "";
    }
};

const renderPokemonStats = (stats) => {
    pokeStats.innerHTML = "";
    stats.forEach((stat) => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
};

const renderNotFound = () => {
    pokeName.textContent = "No encontrado";
    pokeImg.setAttribute("src", "img/pika.png");
    pokeImg.style.background = "#fff";
};
