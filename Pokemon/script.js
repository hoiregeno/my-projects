async function fetchData() {
    const pokemonName = document.getElementById("pokemon-name");
    const message = document.getElementById("message");

    if (pokemonName.value === "") {
        message.textContent = "Please enter something!";
        message.style.display = "block";
    }
    else {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.value}`);

            if (!response.ok) {
                throw new Error("Could not find pokemon!");
            }

            const data = await response.json();
            const pokemonSprite = data.sprites.front_default;

            const pokemonImg = document.getElementById("pokemon-sprite");
            pokemonImg.src = pokemonSprite;
            pokemonImg.style.display = "block";

            pokemonName.value = ""; // Reset user input.
            message.style.display = "none"; // Hide the message display.
        }
        catch (error) {
            console.error(error);
        }
    }
}