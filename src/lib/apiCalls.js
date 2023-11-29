
import { dataStorePokemonNames, dataStorePokemonStats, dataStoreSpecificPokemon } from "../stores";

export async function getAllPokemonNames() {
    const allPokemonsUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=50&offset=0';

    // Een eenvoudige GET-aanroep met fetch
    await fetch(allPokemonsUrl)
    .then(response => {
        // Controleer of het antwoord succesvol is (status 200-299)
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        // console.log(response.json());
        return response.json();
    })
    .then(data => {
        // Roep de getPokemons functie aan en stuur alleen de results uit data mee
        dataStorePokemonNames.set(data.results);
    })
    .catch(error => {
        // Vang eventuele fouten op tijdens de aanroep
        console.error('Fetch failed:', error);
    });
}

// Tweede Api Call

export function getAllPokemonStats(pokemonNames) {
    const pokemonStatsUrl = 'https://pokeapi.co/api/v2/pokemon/';
    var pokemonData = [];

    pokemonNames.forEach(async function (pokemon) {
        await fetch(pokemonStatsUrl + pokemon.name)
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

            // Zodra de pokemonData array even lang is de pokemonNames array set dan de dataStorePokemonStats
            if(pokemonNames.length === pokemonData.length) {
                dataStorePokemonStats.set(pokemonData);
            }
        })
        .catch(error => {
            // Vang eventuele fouten op tijdens de aanroep
            console.error('Fetch failed:', error);
        })
    });
}

// Derde API call

export async function getSpecificPokemon(pokemonName) {
    const pokemonStatsUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`;
    var pokemonData = [];

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
        const pokemonMoves = [];
        const pokemonTypes = [];
        const pokemonAbilities = [];

        // Stop elke move naam in de array pokemonMoves
        data.moves.forEach(element => {
            pokemonMoves.push(element.move.name);
        });

        console.log(data);

        // Stop elk type naam in de array pokemonTypes
        data.types.forEach(element => {
            pokemonTypes.push(element.type.name);
        });

        // Stop elk type naam in de array pokemonTypes
        data.abilities.forEach(element => {
            pokemonAbilities.push(element.ability.name);
        });

        const pokemonBaseStats = {
            id: data.id,
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            speed: data.stats[3].base_stat
        }

        const newPokemonWeight = data.weight / 10;
        const typeResult = pokemonTypes.join(', ');
        const abilitiesResult = pokemonAbilities.join(', ');

        // Maak een nieuw pokemon object met bijbehorende data
        const pokemon = {
            id: data.id,
            name: data.name,
            moves: pokemonMoves,
            type: typeResult,
            height: data.height,
            weight: newPokemonWeight,
            front_image: data.sprites.front_default,
            shiny_image: data.sprites.front_shiny,
            abilities: abilitiesResult,
            base_stats: pokemonBaseStats
        }

        // Stop elke pokemon in de array pokemonData
        pokemonData.push(pokemon);

        dataStoreSpecificPokemon.set(pokemonData);
    })
    .catch(error => {
        // Vang eventuele fouten op tijdens de aanroep
        console.error('Fetch failed:', error);
    });
}
