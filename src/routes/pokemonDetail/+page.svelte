<script>
	import { onMount } from "svelte";
    import { dataStoreSpecificPokemon } from "../../stores";
    import { getSpecificPokemon } from '$lib/apiCalls.js';
    import Nav from '$lib/Nav.svelte';
	import PokemonStatsChart from "../../lib/pokemonStatsChart.svelte";
    import * as d3 from 'd3';

    var selectedPokemon;
    var pokemonName;
    var pokemonGenderName;
    var pokemonId;
    var pokemonBaseStatsObject;
    var pokemonBaseStats = [];

    onMount(async () => {
        var url = window.location.href;
        const searchParams = new URLSearchParams(new URL(url).search);

        await getSpecificPokemon(searchParams.get('name'));
        // await getPokemonGender(searchParams.get('id'));

        // dataStorePokemonGender.subscribe((pokemonGender) => {
        //     selectedGender = pokemonGender[0].name;
        //     pokemonGenderName = selectedGender.charAt(0).toUpperCase() + selectedGender.slice(1);
        // });

        dataStoreSpecificPokemon.subscribe((pokemonStats) => {
            // Haal uit de array de eerste waarde op
            selectedPokemon = pokemonStats[0];
            pokemonBaseStatsObject = pokemonStats[0].base_stats;

            console.log(pokemonBaseStatsObject);

            for (const key in pokemonBaseStatsObject) {
                pokemonBaseStats.push(pokemonBaseStatsObject[key]);
            }

            pokemonName = selectedPokemon.name.charAt(0).toUpperCase() + selectedPokemon.name.slice(1);
            pokemonId = selectedPokemon.id < 10 ? '000' + selectedPokemon.id : selectedPokemon.id <= 100 ? '00' + selectedPokemon.id : selectedPokemon.id >= 100 ? '0' + selectedPokemon.id : selectedPokemon.id;
        });
    });
</script>
<Nav/>

{#if selectedPokemon}
<section class="pokemon-detail">
    <div class="pokemon-detail-card">
        <div class="card-title">
            <h2>{pokemonName} <span>Nr. {pokemonId}</span></h2>
        </div>
        <div class="card-body">
            <div class="pokemon-visual">
                <img class="pokemon-image" src="{selectedPokemon.front_image}" alt="">
            </div>
                <div class="pokemon-data">
                    <div class="pokemon-height data-col">
                        <div class="data">
                            <img class="data-icon" src="/images/height.png" alt="">
                            <p>{selectedPokemon.height} dm</p>
                        </div>
                    </div>
                    <div class="pokemon-weight data-col">
                        <div class="data">
                            <img class="data-icon" src="/images/weight.png" alt="">
                            <p>{selectedPokemon.weight} kg</p>
                        </div>
                    </div>
                    <div class="pokemon-category data-col">
                        <div class="data">
                            <img class="data-icon" src="/images/pokeball.png" alt="">
                            <p>{selectedPokemon.type}</p>
                        </div>
                    </div>
                    <div class="pokemon-abilities data-col">
                        <div class="data">
                            <img class="data-icon" src="/images/swords.png" alt="">
                            <p>{selectedPokemon.abilities}</p>
                        </div>
                    </div>
                    <div id="pokemon-types">
                        <div class="data" id="dataPokemonTypes"></div>
                    </div>
                </div>

            <div class="pokemon-stats">
                <PokemonStatsChart stats={pokemonBaseStats}/>
            </div>
        </div>
    </div>
    <div class="data-legenda">
        <div class="data-height">
            <img class="data-icon" src="/images/height.png" alt="">
            <p>Height in dm</p>
        </div>
        <div class="data-weight">
            <img class="data-icon" src="/images/weight.png" alt="">
            <p>Weight in kg</p>
        </div>
        <div class="data-type">
            <img class="data-icon" src="/images/pokeball.png" alt="">
            <p>Pokemon types</p>
        </div>
        <div class="data-abilities">
            <img class="data-icon" src="/images/swords.png" alt="">
            <p>Abilities</p>
        </div>
        <div class="data-hp">
            <div class="rectangle"></div>
            <p>Hp amount</p>
        </div>
        <div class="data-att">
            <div class="rectangle"></div>
            <p>Attack</p>
        </div>
        <div class="data-def">
            <div class="rectangle"></div>
            <p>Defense</p>
        </div>
        <div class="data-spd">
            <div class="rectangle"></div>
            <p>Speed</p>
        </div>
    </div>
</section>
{/if}

<style>
    .pokemon-detail {
        display: flex;
        justify-content: center;
        position: relative;
    }

    .pokemon-detail-card {
        max-width: 400px;
    }
    .card-body {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .card-title {
        text-align: center;
        padding: 25px 15px 15px;
        background-color: white;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    .card-title h2 {
        font-weight: 500;
        margin: 0;
    }

    .card-title span {
        color: rgb(141, 141, 141);
    }

    .pokemon-visual {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
    }
    .pokemon-data {
        display: flex;
        flex-wrap: wrap;
        background-color: #2FA7D7;
        padding: 25px;
    }

    .data-col {
        flex: 1 0 50%;
        max-width: 50%;
        display: flex;
    }

    .data {
        display: flex;
        align-items: center;
    }

    .data-icon {
        height: 35px;
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

    .pokemon-stats {
        width: 100%;
        height: 300px;
        background-color: #2FA7D7;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        display: flex;
        justify-content: center;
    }

    .data-legenda {
        background-color: white;
        border-radius: 10px;
        position: absolute;
        padding: 15px;
        right: 0;
    }

    .data-legenda > div {
        display: flex;
        align-items: center;
        margin: 10px 0;
    }

    .data-legenda > div:first-of-type {
        margin: 0;
        margin-bottom: 10px;
    }

    .data-legenda > div:last-of-type {
        margin: 0;
        margin-top: 10px;
    }

    .data-legenda .rectangle {
        height: 10px;
        width: 20px;
    }

    .data-hp .rectangle {
        background-color: rgb(238, 66, 102);
    } 

    .data-att .rectangle {
        background-color: rgb(255, 161, 0);
    } 

    .data-def .rectangle {
        background-color: rgb(59, 206, 172);
    }
     .data-spd .rectangle {
        background-color: rgb(84, 13, 110);
    }

    .data-legenda p {
        margin: 0;
        margin-left: 5px;
    }

    @media only screen and (max-width: 600px) {
        .pokemon-detail {
            flex-wrap: wrap;
            gap: 50px;
        }

        .data-legenda {
            position: static;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
        }

        .data-legenda > div {
            flex: 1 0 50%;
        }

        .data-legenda > div:first-of-type {
            margin: 0;
        }

        .data-legenda > div:last-of-type {
            margin: 0;
        }
    }

    @media only screen and (min-width: 768px) and (max-width: 991px){
        .pokemon-detail-card {
            max-width: 350px;
        }
    }
        
</style>