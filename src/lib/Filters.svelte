<script>
	import { onMount } from 'svelte';

    onMount(() => {

        const apiUrl = 'https://raw.githubusercontent.com/MartinCage/starbucks-api/main/dataSet.json';

        // Een eenvoudige GET-aanroep met fetch
        fetch(apiUrl)
        .then(response => {
            // Controleer of het antwoord succesvol is (status 200-299)
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            // Parseer het antwoord als JSON
            return response.json();
        })
        .then(data => {
            // Doe iets met de ontvangen gegevens
            console.log(data);
        })
        .catch(error => {
            // Vang eventuele fouten op tijdens de aanroep
            console.error('Fetch failed:', error);
        });

        // // Functie om kaarten te sorteren op basis van calorieën
        // function sortCards(order) {
        //     const sortedCards = [...data]; // Maak een kopie van de gegevens om de originele volgorde te behouden

        //     if (order === 'asc') {
        //         sortedCards.sort((a, b) => a.calories - b.calories);
        //     } else if (order === 'desc') {
        //         sortedCards.sort((a, b) => b.calories - a.calories);
        //     }
        // }

        // document.getElementById("asc").addEventListener("click", sortCards('asc'));
        // document.getElementById("desc").addEventListener("click", sortCards('desc'));

    });
</script>

<section>
    <div class="button-holder">
        <button id="asc">Sorteer oplopend</button>
        <button id="desc">Aflopend</button>
        <button>Filter 3</button>
        <button>Filter 4</button>
    </div>
</section>

<style>

    section {
        padding-bottom: 25px;
    }
    .button-holder {
        width: 100%;
        display: flex;
        justify-content: center;
        gap: 40px;
    }

    .button-holder button {
        padding: 15px 25px;
        border-radius: 15px;
        border: none;
        background-color: #e9e9e9;
        text-transform: uppercase;
        letter-spacing: 3px;
        font-weight: 600;
        transition: all .3s ease-in-out;
    }

    .button-holder button:hover {
        cursor: pointer;
        background-color: #01754A;
        color: white;
    }
</style>