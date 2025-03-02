async function fetchData() {
    const pokemonInput = document.getElementById("pokemon-name");
    const pokemonName = pokemonInput.value.trim(); // Trim whitespace

    if (!pokemonName) {
        return alert("Please enter something!");
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);

        if (!response.ok) {
            throw new Error("Could not find Pokémon!");
        }

        const data = await response.json();
        const pokemonSprite = data.sprites.front_default;

        // Capitalize first letter correctly
        const formattedName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1).toLowerCase();

        // Update UI
        document.getElementById("message").textContent = formattedName;
        document.getElementById("message").style.display = "block";

        const pokemonImg = document.getElementById("pokemon-sprite");
        pokemonImg.src = pokemonSprite;
        pokemonImg.style.display = "block";

        pokemonInput.value = ""; // Clear input field
    } catch (error) {
        alert(error.message); // Inform user when Pokémon is not found
        console.error(error);
    }
}
