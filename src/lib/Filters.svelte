<script>
	import { onMount } from 'svelte';

    onMount(() => {

        const apiUrl = 'https://raw.githubusercontent.com/MartinCage/starbucks-api/main/dataSet.json';
        let dataStore = [];

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
            return dataStore = data;
        })
        .catch(error => {
            // Vang eventuele fouten op tijdens de aanroep
            console.error('Fetch failed:', error);
        });

        // Functie om kaarten te sorteren op basis van calorieën
        function sortCards(order) {
            if (order === 'asc') {
                dataStore.sort((a, b) => a.calories - b.calories);
                updateCardDisplay();
            } else if (order === 'desc') {
                dataStore.sort((a, b) => b.calories - a.calories);
                updateCardDisplay();
            }
        }

        function updateCardDisplay() {
            var cardsContainer = document.getElementById('cards-holder');

            // Verwijder alle bestaande kaarten
            while (cardsContainer.firstChild) {
                cardsContainer.removeChild(cardsContainer.firstChild);
            }

            // // Voeg de kaarten opnieuw toe in de gesorteerde volgorde

            dataStore.forEach(function (item) {
                var newCard ='<div class="stars-wrapper">' +
                                '<div class="stars">' +
                                    '<div class="content">' +
                                        '<div class="visual">' +
                                            '<img src="../images/drink.png" class="product-image" alt="Starbucks drink">' +
                                        '</div>' +
                                        '<header>' +
                                            `<h2 class="product-title">${item.name}</h2>` +
                                        '</header>' +
                                        '<div class="product-info">' +
                                            '<ul>' +
                                                `<li id="amount-calories-${item.id}" class="info-detail">Caloriën: ${item.calories}</li>` +
                                                `<li id="amount-fat-${item.id}" class="info-detail">Vet: ${item.calories}</li>` +
                                                `<li id="amount-protein-${item.id}" class="info-detail">Proteïne:  ${item.calories}</li>` +
                                            '</ul>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>';

                var container = document.createElement('article');
                    container.classList.add('card');
                    container.style.transition = "all 1s"
                    container.setAttribute("id", `${item.name}`);
                    container.innerHTML = newCard;
                    cardsContainer.appendChild(container);
            });
        }

        function sortAscending() {
            sortCards('asc');
        }

        function sortDescending() {
            sortCards('desc');
        }

        document.getElementById("asc").addEventListener("click", sortAscending);
        document.getElementById("desc").addEventListener("click", sortDescending);

    });
</script>

<section>
    <input type="text" placeholder="Search for pokemon">
    <div class="button-holder">
        <button id="asc">Sorteer oplopend</button>
        <button id="desc">Aflopend</button>
        <button>Filter 3</button>
        <button>Filter 4</button>
    </div>
</section>

<style>

    section {
        margin: 60px 0;
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