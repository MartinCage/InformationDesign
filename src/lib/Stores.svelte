<script>
    import { dataStore } from '$lib/Stores.js';
    import { onMount } from 'svelte';

    onMount(async () => {
        //Api Urls
        const allPokemonsUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=200&offset=0';
        var pokemons;
        var pokemonData = [];

        // Een eenvoudige GET-aanroep met fetch
        await fetch(allPokemonsUrl)
        .then(response => {
            // Controleer of het antwoord succesvol is (status 200-299)
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            // Parseer het antwoord als JSON
            return response.json();
        })
        .then(data => {
            // Roep de getPokemons functie aan en stuur alleen de results uit data mee
            pokemons = data.results;
        })
        .catch(error => {
            // Vang eventuele fouten op tijdens de aanroep
            console.error('Fetch failed:', error);
        });

        // Tweede API-aanroep

        //Api Urls
        const pokemonStatsUrl = 'https://pokeapi.co/api/v2/pokemon/';
        var data2;

        // Een eenvoudige GET-aanroep met fetch
        await fetch(pokemonStatsUrl)
        .then(response => {
            // Controleer of het antwoord succesvol is (status 200-299)
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            // Parseer het antwoord als JSON
            return response.json();
        })
        .then(data => {
            // Roep de getPokemons functie aan en stuur alleen de results uit data mee
            data2 = data;
        })
        .catch(error => {
            // Vang eventuele fouten op tijdens de aanroep
            console.error('Fetch failed:', error);
        });

        pokemons.forEach(function (pokemon) {
            fetch(pokemonStatsUrl + pokemon.name)
            .then(response => {
                // Controleer of het antwoord succesvol is (status 200-299)
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                // Parseer het antwoord als JSON
                return response.json();
            })
            .then(data => {
                var pokemonMoves = [];
                var pokemonTypes = [];

                // Stop elke move naam in de array pokemonMoves
                data.moves.forEach(element => {
                    pokemonMoves.push(element.move.name);
                });

                // Stop elk type naam in de array pokemonTypes
                data.types.forEach(element => {
                    pokemonTypes.push(element.type.name);
                });

                // Maak een nieuw pokemon object met bijbehorende data
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

                // Stop elke pokemon in de array pokemonData
                pokemonData.push(pokemon);
            })
            .catch(error => {
                // Vang eventuele fouten op tijdens de aanroep
                console.error('Fetch failed:', error);
            })
        });

        console.log(pokemonData);

        // Sla de gecombineerde gegevens op in de store
        dataStore.set(pokemonData);
    });
</script>