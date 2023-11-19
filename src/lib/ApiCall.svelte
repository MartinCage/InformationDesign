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
            let test = data;
        })
        .catch(error => {
            // Vang eventuele fouten op tijdens de aanroep
            console.error('Fetch failed:', error);
        });
    });
</script>