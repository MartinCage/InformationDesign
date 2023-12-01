
import { dataStorePokemonNames, dataStorePokemonStats, dataStoreSpecificPokemon } from "../stores";

// Haal de namen op van de pokemons en limiteer dit naar 50
export async function getAllPokemonNames() {
    const allPokemonsUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=50&offset=0';

    // Een GET-aanroep met fetch
    await fetch(allPokemonsUrl)
    .then(response => {
        // Controleer of het antwoord succesvol is
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        // Parse het om naar JSON
        return response.json();
    })
    .then(data => {
        // Vul de store stuur alleen de results uit data mee
        dataStorePokemonNames.set(data.results);
    })
    .catch(error => {
        // Vang eventuele fouten op tijdens de aanroep
        console.error('Fetch failed:', error);
    });
}

// Tweede Api Call
// Haal alle data van alle pokemons op uit de lijst op home
export function getAllPokemonStats(pokemonNames) {
    const pokemonStatsUrl = 'https://pokeapi.co/api/v2/pokemon/';
    var pokemonData = [];

    pokemonNames.forEach(async function (pokemon) {
        await fetch(pokemonStatsUrl + pokemon.name)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            let pokemonMoves = [];
            let pokemonTypes = [];

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

            // Stop elk pokemon object in de array pokemonData
            pokemonData.push(pokemon);

            // Zodra de pokemonData array even lang is de pokemonNames array vul dan de dataStorePokemonStats met pokemondata
            if(pokemonNames.length === pokemonData.length) {
                dataStorePokemonStats.set(pokemonData);
            }
        })
        .catch(error => {
            console.error('Fetch failed:', error);
        })
    });
}

// Derde API call
// Haal de specifieke pokemondata op de pokemon waar je op hebt geklikt en naar de detailpagina gaat
export async function getSpecificPokemon(pokemonName) {
    const pokemonStatsUrl = `https://pokeapi.co/api/v2/pokemon/`;
    var pokemonData = [];

    await fetch(pokemonStatsUrl + pokemonName)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        const pokemonMoves = [];
        const pokemonTypes = [];
        const pokemonAbilities = [];

        // Gewicht van hectogram naar kilogram
        const newPokemonWeight = data.weight / 10;


        // Stop elke move naam in de array pokemonMoves
        data.moves.forEach(element => {
            pokemonMoves.push(element.move.name);
        });

        // Stop elk type naam in de array pokemonTypes
        data.types.forEach(element => {
            pokemonTypes.push(element.type.name);
        });

        // Stop elk type naam in de array pokemonAbilities
        data.abilities.forEach(element => {
            pokemonAbilities.push(element.ability.name);
        });

        // Elk resultaat voeg je een komma en spatie toe
        const typeResult = pokemonTypes.join(', ');
        const abilitiesResult = pokemonAbilities.join(', ');

        // Maak een nieuw base stats object aan
        const pokemonBaseStats = {
            id: data.id,
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            speed: data.stats[3].base_stat
        }

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

        // Vul de store met de array pokemonData
        dataStoreSpecificPokemon.set(pokemonData);
    })
    .catch(error => {
        console.error('Fetch failed:', error);
    });
}