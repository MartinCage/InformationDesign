<script>
    import Nav from '$lib/Nav.svelte';
    import Bar from '$lib/bar.svelte';
    import Chart from '$lib/chart.svelte'
    import data from '$lib/data/dataSet.json';
    import Filters from '$lib/Filters.svelte';
    import { onMount } from 'svelte';
</script>

<Nav/>

<Filters/>

<section>
    {#each data as item}
        <Bar {item} /> 
    {/each}
</section>

<style>
    section {
        display: flex;
        flex-wrap: wrap;
        gap: 35px;
        justify-content: center;
        padding: 50px 0 50px 0;
    }
</style>
