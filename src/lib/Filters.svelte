<script>
	import { onMount } from 'svelte';
    import { dataStorePokemonNames } from "../stores";
    import { getAllPokemonNames, getAllPokemonStats } from '$lib/apiCalls.js';

    onMount(async () => {

        await getAllPokemonNames();

        var pokemonNames = $dataStorePokemonNames;

        // Doe hier je search filter functie ding

        function searchPokemon(input) {
            input = input.toLowerCase();

            return pokemonNames.filter(pokemon =>
                pokemon.name.toLowerCase().includes(input)
            );
        }

        // Voeg een event listener toe aan het input-element
        const inputField = document.getElementById('search-pokemon');
        var pokemonSearchResult;

        inputField.addEventListener('input', () => {
            const inputQuery = inputField.value;
            pokemonSearchResult = searchPokemon(inputQuery);

            if(pokemonSearchResult) {
                getAllPokemonStats(pokemonSearchResult);
            } else {
                getAllPokemonStats(pokemonNames);
            }
        });
        await getAllPokemonStats(pokemonNames);
    });
</script>

<section>
    <div class="button-holder">
        <input type="text" id="search-pokemon" placeholder="Search for pokemon...">
        <button id="asc">Lowest number</button>
        <button id="desc">Highest number</button>
        <button>A-Z</button>
        <button>Z-A</button>
    </div>
</section>

<style>
    section {
        margin: 60px 0;
        display: flex;
    }
    .button-holder {
        width: 100%;
        display: flex;
        gap: 20px;
        justify-content: center;
    }

    .button-holder input{
        width: 400px;
    }

    .button-holder input[type=text] {
        padding: 5px 10px;
        font-size: 16px;
    }

    .button-holder input::placeholder {
        opacity: 0.5;
        font-size: 16px;
    }

    .button-holder button {
        padding: 15px 25px;
        border-radius: 5px;
        border: none;
        background-color: #e9e9e9;
        text-transform: uppercase;
        letter-spacing: 3px;
        font-weight: 600;
        transition: all .3s ease-in-out;
    }

    .button-holder button:hover {
        cursor: pointer;
        background-color: #E50013;
        color: white;
    }
</style>