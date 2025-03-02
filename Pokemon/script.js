
async function fetchData() {
    const pokemonName = document.getElementById("pokemon-name");

    if (pokemonName.value === "") {
        window.alert("Please enter something!");
    }
    else {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.value.toLowerCase()}`);

            if (!response.ok) {
                throw new Error("Could not find pokemon!");
            }

            const data = await response.json();
            const pokemonSprite = data.sprites.front_default;

            const message = document.getElementById("message");
            message.textContent = (pokemonName.value).charAt(0).toUpperCase() + (pokemonName.value).slice(1);
            message.style.display = "block";

            const pokemonImg = document.getElementById("pokemon-sprite");
            pokemonImg.src = pokemonSprite;
            pokemonImg.style.display = "block";

            pokemonName.value = ""; // Reset user input. 
        }
        catch (error) {
            console.error(error);
        }
    }
}