<script>
	import { onMount } from 'svelte';
    import Nav from '$lib/Nav.svelte';
    import Filters from '$lib/Filters.svelte';

    onMount(() => {
        const allPokemonsUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=200&offset=0';
        const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/';

        let pokemonData = [];

        // Een eenvoudige GET-aanroep met fetch
        fetch(allPokemonsUrl)
        .then(response => {
            // Controleer of het antwoord succesvol is (status 200-299)
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            // Parseer het antwoord als JSON
            return response.json();
        })
        .then(data => {
            // Doe iets met de ontvangen gegevens
            getPokemons(data.results);
        })
        .catch(error => {
            // Vang eventuele fouten op tijdens de aanroep
            console.error('Fetch failed:', error);
        });

        function getPokemons(pokemons) {
            pokemons.forEach(function (pokemon) {
                fetch(pokemonUrl + pokemon.name)
                .then(response => {
                    // Controleer of het antwoord succesvol is (status 200-299)
                    if (!response.ok) {
                        throw new Error(`Network response was not ok: ${response.statusText}`);
                    }
                    // Parseer het antwoord als JSON
                    return response.json();
                })
                .then(data => {
                    let pokemonMoves = []
                    let pokemonTypes = []

                    data.moves.forEach(element => {
                        pokemonMoves.push(element.move.name);
                    });

                    data.types.forEach(element => {
                        pokemonTypes.push(element.type.name);
                    });

                    const pokemon = {
                        id: data.id,
                        name: data.name,
                        moves: pokemonMoves,
                        type: pokemonTypes,
                        height: data.height,
                        weight: data.weight,
                        front_image: data.sprites.front_default,
                        shiny_image: data.sprites.front_shiny
                    }
                    pokemonData.push(pokemon);

                    if(pokemonData.length === pokemons.length) {
                        printPokemons(pokemonData);
                    }
                })
                .catch(error => {
                    // Vang eventuele fouten op tijdens de aanroep
                    console.error('Fetch failed:', error);
                })
            });
        }

        function printPokemons(pokemonData) {   
            var container = document.getElementById('pokemon-holder');

            pokemonData.forEach(pokemon => {
                // Maak een nieuw div-element aan voor de kaart
                var firstLetter = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
                var pokemonId = pokemon.id < 10 ? '000' + pokemon.id : pokemon.id < 100 ? '00' + pokemon.id : pokemon.id >= 100 ? '0' + pokemon.id : pokemon.id;
                var card = document.createElement('a');
                card.className = 'card-link';
                card.href = `/pokemon/?name=${pokemon.name}`;


                // Voeg de titel en inhoud toe aan de kaart
                card.innerHTML = `
                <div class="card">
                    <img src="${pokemon.front_image}">
                    <div class="card-info">
                        <p>#${pokemonId}</p>
                        <h2 class="card-title">${firstLetter}</h2>
                    </div>
                </div>
                `;

                // Voeg de kaart toe aan het container-element
                container.appendChild(card);
            });
        }
    });
</script>
<Nav/>
<Filters/>
<div id="pokemon-holder"></div>
  
<style>
    #pokemon-holder {
        display: flex;
        flex-wrap: wrap;
        gap: 50px;
        justify-content: center;
    }
</style>