<script>
    import Nav from '$lib/Nav.svelte';
    import Card from '$lib/Card.svelte';
    import Chart from '$lib/chart.svelte'
    import data from '$lib/data/dataSet.json';
    import Filters from '$lib/Filters.svelte';
</script>

<Nav/>

<Filters/>

<div class="section-wrapper">
<section>
    {#each data as item}
        <Card {item} /> 
    {/each}
    <div class="circle"></div>
</section>
</div>

<style>
.section-wrapper {
    max-width: 1440px;
    margin: 0 auto;
}

    section {
        display: flex;
        flex-wrap: wrap;
        padding: 50px 0 50px 0;
        position: relative;
        margin: 0 -17.5px;
        overflow-x: hidden;
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
