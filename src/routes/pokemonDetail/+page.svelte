<script>
	import { onMount } from "svelte";
    import { dataStoreSpecificPokemon, dataStorePokemonGender } from "../../stores";
    import { getSpecificPokemon, getPokemonGender } from '$lib/apiCalls.js';
    import Nav from '$lib/Nav.svelte';
	import PokemonStatsChart from "../../lib/pokemonStatsChart.svelte";

    var selectedPokemon;
    var pokemonName;
    var pokemonGenderName;
    var selectedGender;
    var pokemonId;

    onMount(async () => {
        var url = window.location.href;
        const searchParams = new URLSearchParams(new URL(url).search);

        await getSpecificPokemon(searchParams.get('name'));
        await getPokemonGender(searchParams.get('id'));

        dataStorePokemonGender.subscribe((pokemonGender) => {
            selectedGender = pokemonGender[0];
            pokemonGenderName = selectedGender.gender.charAt(0).toUpperCase() + selectedGender.gender.slice(1);
        });

        dataStoreSpecificPokemon.subscribe((pokemonStats) => {

            // Haal uit de array de eerste waarde op (Zo kom je in het object)
            selectedPokemon = pokemonStats[0];
            pokemonName = selectedPokemon.name.charAt(0).toUpperCase() + selectedPokemon.name.slice(1);
            pokemonId = selectedPokemon.id < 10 ? '000' + selectedPokemon.id : selectedPokemon.id <= 100 ? '00' + selectedPokemon.id : selectedPokemon.id >= 100 ? '0' + selectedPokemon.id : selectedPokemon.id;
        
            // Maak een array voor de types
            var pokemonTypes = [];

            // Stop elke type naam in de array pokemonTypes
            selectedPokemon.type.forEach(element => {
                pokemonTypes.push(element);
                pokemonTypes.join(', ')
            });

        });
    });
</script>
<Nav/>

{#if selectedPokemon}
<section class="pokemon-detail">
    <div class="card-title">
        <h2>{pokemonName} <span>Nr. {pokemonId}</span></h2>
    </div>
    <div class="card-body">
        <div class="pokemon-visual">
            <img class="pokemon-image" src="{selectedPokemon.front_image}" alt="">
        </div>
            <div class="pokemon-data">
                <div class="col-left">
                    <div class="pokemon-height">
                        <p>Height</p>
                        <p>{selectedPokemon.height}</p>
                    </div>
                    <div class="pokemon-weight">
                        <p>Weight</p>
                        <p>{selectedPokemon.weight}</p>
                    </div>
                    <div class="pokemon-gender">
                        <p>Gender</p>
                        <p>{#if pokemonGenderName}{pokemonGenderName}{/if}</p>
                    </div>
                </div>
                <div class="col-right">
                    <div class="pokemon-category">
                        <p>Category</p>
                        <p>{selectedPokemon.weight}</p>
                    </div>
                    <div class="pokemon-weakness">
                        <p>Abilities</p>
                        <p>{selectedPokemon.abilities}</p>
                    </div>
                    <div class="pokemon-types">
                        <p>Types</p>
                        <p>{selectedPokemon.type}</p>
                    </div>
                </div>
            </div>

        <div class="pokemon-stats">
            <PokemonStatsChart/>
        </div>
        <div class="pokemon-evolutions">
            <p>Evolutions Hier</p>
        </div>
    </div>
</section>
{/if}

<style>
    .card-body {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .card-title {
        flex: 1 0 100%;
        text-align: center;
    }

    .card-title h2 {
        font-weight: 500;
    }

    .card-title span {
        color: rgb(141, 141, 141);
    }

    .pokemon-visual {
        flex: 1 0 100%;
        max-width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .pokemon-data {
        display: flex;
        flex: 1 0 50%;
        max-width: 50%;
        flex-wrap: wrap;
        background-color: #2FA7D7;
        border-radius: 10px;
        padding: 15px 15px;
        max-height: 200px;
    }

    .pokemon-data .col-left, .pokemon-data .col-right {
        flex: 1 0 50%;
        max-width: 50%;
    }

    .pokemon-data > div p{
        margin: 10px;
    }

    .pokemon-data > div p:first-of-type{
        color: white;
    }
    .pokemon-data > div p:last-of-type{
        font-size: 18px;
    }

    .pokemon-image {
        height: 250px;
        width: 250px;
    }

    .pokemon-evolutions {
        flex: 1 0 100%;
        max-width: 100%;
    }
</style>