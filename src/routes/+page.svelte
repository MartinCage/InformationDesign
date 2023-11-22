<script>
	import { onMount } from 'svelte';
    import { dataStore } from '../stores.js';
    import Nav from '$lib/Nav.svelte';
    import Filters from '$lib/Filters.svelte';


    onMount(() => {

        const { pokemonData } = $dataStore;
        console.log(pokemonData);

        function printPokemons(pokemonData) {   
            var container = document.getElementById('pokemon-holder');

            pokemonData.forEach(pokemon => {
                // Maak een nieuw div-element aan voor de kaart
                var firstLetter = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
                var pokemonId = pokemon.id < 10 ? '000' + pokemon.id : pokemon.id < 100 ? '00' + pokemon.id : pokemon.id >= 100 ? '0' + pokemon.id : pokemon.id;
                var card = document.createElement('a');
                card.className = 'card-link';
                card.href = `/?name=${pokemon.name}`;


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
        printPokemons(pokemonData);
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