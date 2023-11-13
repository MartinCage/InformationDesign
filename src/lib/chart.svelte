<script>
    import { onMount } from 'svelte';

    export let data;

    // Ga dit pas doen, als de html bestaat
    onMount(() => {
        // doe iets met svg en d3
    })
</script>

<section>
    <svg></svg>
    <p id="test">hello world, aantal items: {data.length}</p>
</section>

<style>
    p {
        background: blue;
    }
</style>