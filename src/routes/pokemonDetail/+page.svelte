<script>
	import { onMount } from "svelte";
    import { dataStorePokemonStats, dataStoreSpecificPokemon } from "../../stores";
    import { getSpecificPokemon } from '$lib/apiCalls.js';
    import Nav from '$lib/Nav.svelte';
	import PokemonStatsChart from "../../lib/pokemonStatsChart.svelte";

    var selectedPokemon;
    var pokemonName;
    var pokemonId;

    onMount(async () => {
        var url = window.location.href;
        const searchParams = new URLSearchParams(new URL(url).search);

        // await getPokemonGender(searchParams.get('name'));
        await getSpecificPokemon(searchParams.get('name'));

        dataStoreSpecificPokemon.subscribe((pokemonStats) => {
            // Haal de waarde van de 'name'-parameter op

            selectedPokemon = pokemonStats[0];
            pokemonName = selectedPokemon.name.charAt(0).toUpperCase() + selectedPokemon.name.slice(1);
            pokemonId = selectedPokemon.id < 10 ? '000' + selectedPokemon.id : selectedPokemon.id <= 100 ? '00' + selectedPokemon.id : selectedPokemon.id >= 100 ? '0' + selectedPokemon.id : selectedPokemon.id;
        
            var pokemonTypes = [];

            // Stop elke move naam in de array pokemonMoves
            selectedPokemon.type.forEach(element => {
                pokemonTypes.push(element);
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
        <div class="col-left">
            <div class="pokemon-visual">
                <img class="pokemon-image" src="{selectedPokemon.front_image}" alt="">
            </div>
            <div class="pokemon-stats">
                <PokemonStatsChart/>
            </div>
        </div>
        <div class="col-right">
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
                        <p>{selectedPokemon.weight}</p>
                    </div>
                </div>
                <div class="col-right">
                    <div class="pokemon-category">
                        <p>Category</p>
                        <p>{selectedPokemon.weight}</p>
                    </div>
                    <div class="pokemon-weakness">
                        <p>Abilities</p>
                        <p>{selectedPokemon.weight}</p>
                    </div>
                </div>
            </div>
            <div class="pokemon-types">
                <p>Types</p>
                <p>{selectedPokemon.type}</p>
            </div>
        </div>
        <div class="pokemon-evolutions">
            <p>Evolutions Hier</p>
        </div>
    </div>
</section>
{/if}

<style>
    .pokemon-detail {
        /* padding: 0 250px; */
    }

    .card-body {
        display: flex;
        flex-wrap: wrap;
    }
    .card-body > .col-left, .card-body > .col-right {
        display: flex;
        flex: 1 0 50%;
        max-width: 50%;
        flex-direction: column;
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
        flex: 1 0 50%;
        max-width: 50%;
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