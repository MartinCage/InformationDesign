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
    <div class="circle"></div>
</section>

<style>
    section {
        display: flex;
        flex-wrap: wrap;
        gap: 35px;
        padding: 50px 0 50px 0;
        position: relative;
    }

    .circle {
        background-color: #01754A;
        opacity: 0.2;
        width: 750px;
        height: 750px;
        border-radius: 50%;
        position: absolute;
        right: -700px;
        z-index: -1;
        background-image: url('../../images/Starbucks.png');
        background-size: 100%;
    }
</style>
