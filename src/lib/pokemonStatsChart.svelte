<script>
    import { onMount } from "svelte";
    import * as d3 from 'd3';

    let data = [10, 20, 30, 40, 50];

    onMount(() => {
    const svg = d3.select('#chart');

    // Creëer de staafdiagram
    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d, i) => i * 70)
        .attr('y', d => 100 - d)
        .attr('width', 60)
        .attr('height', d => d)
        .attr('fill', 'blue');
    });
</script>

<div class="stats-chart">
    <p>Stats</p>
    <svg id="chart"></svg>
</div>

<style>
    .stats-chart {

    }

    svg {
      width: 100%;
      height: 150px;
    }
  </style>