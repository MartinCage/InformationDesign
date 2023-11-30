<script>
	import { onMount } from 'svelte';
    import { dataStorePokemonNames } from "../stores";
    import { getAllPokemonNames, getAllPokemonStats } from '$lib/apiCalls.js';

    onMount(async () => {
        // Haal alle pokemon namen op
        await getAllPokemonNames();

        // Definieer de variabelen
        var pokemonNames = $dataStorePokemonNames;
        var pokemonSearchResult;
        var inputField;
        var inputQuery;
        var inputField = document.getElementById('search-pokemon');

        // Kijk of de waarde uit het input veld overeenkomt met de pokemonnaam
        function searchPokemon(input) {
            input = input.toLowerCase();

            return pokemonNames.filter(pokemon =>
                pokemon.name.toLowerCase().includes(input)
            );
        }

        // Kijk naar de waarde die je in het input veld stopt en roep de functie inputQuery aan
        // Als pokemonSearchResult gevuld is, laat dan de overeenkomende pokemons zien
        // Als pokemonSearchResult leeg is, laat dan alle pokemons zien.

        inputField.addEventListener('input', () => {
            inputQuery = inputField.value;
            pokemonSearchResult = searchPokemon(inputQuery);

            if(pokemonSearchResult) {
                getAllPokemonStats(pokemonSearchResult);
            } else {
                getAllPokemonStats(pokemonNames);
            }
        });

        // Haal standaard alle pokemons op
        await getAllPokemonStats(pokemonNames);

        // Leeg het inputveld als er op de knop wordt gedrukt
        var clearInputBtn = document.getElementById('clearInputBtn');
        function clearInputField(){
            inputField.value = '';
            getAllPokemonStats(pokemonNames);
        }
        clearInputBtn.addEventListener('click', clearInputField);

        // Sorteer op afabetische volgorde
        var sortAscBtn = document.getElementById('ascBtn');
        var sortDescBtn = document.getElementById('descBtn');

        function comparePokemonsASC(a, b) {
            if ( a.name < b.name ){
                return -1;
            } else {
                return 0;
            }
        }

        function comparePokemonsDESC(a, b) {
            if ( a.name > b.name ){
                return -1;
            } else {
                return 0;
            }
        }

        function sortPokemonsASC() {
            var result = pokemonNames.sort(comparePokemonsASC);
            getAllPokemonStats(result);
        }

        function sortPokemonsDESC() {
            var result = pokemonNames.sort(comparePokemonsDESC);
            getAllPokemonStats(result);
        }

        sortAscBtn.addEventListener('click', sortPokemonsASC);
        sortDescBtn.addEventListener('click', sortPokemonsDESC);
    });
</script>

<section>
    <div class="button-holder">
        <div class="input-holder">
            <input type="text" id="search-pokemon" placeholder="Search for pokemon...">
            <button id="clearInputBtn">
                <i class="fa-solid fa-xmark fa-xl"></i>
            </button>
        </div>
        <button id="ascBtn">A-Z</button>
        <button id="descBtn">Z-A</button>
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

    .input-holder {
        position: relative;
    }

    .input-holder input[type=text] {
        padding: 15px 15px;
        font-size: 16px;
    }

    #clearInputBtn {
        position: absolute;
        right: 10px;
        padding: 0;
        background-color: transparent;
        margin: 0;
        top: 50%;
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
    }
    #clearInputBtn:hover {
        color: black;
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