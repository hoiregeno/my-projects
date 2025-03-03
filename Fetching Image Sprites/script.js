const form = document.getElementById("input-box");

async function fetchSprite() {
    const pokemonName = document.getElementById("pokemon-name").value.trim();

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (!response.ok) {
            throw new Error("Could not find pokemon.");
        }

        const data = await response.json();
        const pokemonSprite = data.sprites.front_default;

        const imgElement = document.getElementById("pokemon-sprite")
        imgElement.src = pokemonSprite;
        imgElement.style.display = "block";
    }
    catch (error) {
        console.error(error);
    }
}

form.addEventListener("submit", e => e.preventDefault());