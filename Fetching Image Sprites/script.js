const form = document.getElementById("input-box");

async function fetchSprite() {
    const pokemonNameDisplay = document.getElementById("pokemon-name-display");
    const pokemonName = document.getElementById("pokemon-name");

    try {
        if (!pokemonName.value.trim()) {
            alert("Please enter a Pokémon name.");
            return;
        }

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.value.trim().toLowerCase()}`);

        if (!response.ok) {
            throw new Error("Could not find pokemon.");
        }

        const data = await response.json();

        // DISPLAY POKEMON NAME.
        pokemonNameDisplay.textContent = data.name;
        pokemonNameDisplay.style.display = "block";

        // DISPLAY POKEMON SPRITE.
        const pokemonSprite = data.sprites.front_default;
        const imgElement = document.getElementById("pokemon-sprite")
        imgElement.src = pokemonSprite;
        imgElement.alt = `Sprite of ${data.name}`;
        imgElement.style.display = "block";

        pokemonName.value = ""; // Reset user input.
    }
    catch (error) {
        console.error(error);
    }
}

form.addEventListener("submit", e => {
    e.preventDefault();
});