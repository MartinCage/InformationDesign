<script>
	import { onMount } from 'svelte';
    import { dataStorePokemonStats } from "../stores";
    import Nav from '$lib/Nav.svelte';
    import Filters from '$lib/Filters.svelte';

    onMount(async () => {
        // 'Abboneer' op de store. Als de waarde in de store veranderd, verander dan ook de waardes in deze code mee
        dataStorePokemonStats.subscribe((pokemonStats) => {
            const container = document.getElementById('pokemon-holder');

            // // Zolang er nog cards bestaan, haal deze (oude) weg 
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }

            // Maak voor elke pokemon een nieuwe card aan en stuur deze naar de DOM
            pokemonStats.forEach(pokemon => {
                // Maak elke lekker van de pokemon naam een hoofdletter
                let firstLetter = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

                // Elk pokemon id krijgt een 0 ervoor op basis van het aantal getallen waar het id uit bestaat
                let pokemonId = pokemon.id < 10 ? '000' + pokemon.id : pokemon.id <= 100 ? '00' + pokemon.id : pokemon.id >= 100 ? '0' + pokemon.id : pokemon.id;

                // Creëer het kaartje met een link naar de detailpagina van die pokemon. Stuur de naam en id mee in de url
                let card = document.createElement('a');
                card.className = 'card-link';
                card.href = `pokemonDetail?name=${pokemon.name}&id=${pokemon.id}`;

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
        })
    });
</script>
<div class="container">
    <Nav/>
    <Filters/>
    <div id="pokemon-holder"></div>
</div>

<style>
    #pokemon-holder {
        display: flex;
        flex-wrap: wrap;
        gap: 50px;
        justify-content: center;
    }
</style>