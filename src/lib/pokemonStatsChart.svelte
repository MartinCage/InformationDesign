<script>
    import { onMount } from "svelte";
    import * as d3 from 'd3';
    export let stats = [];

    onMount(() => {
        let data = stats;
        var finalDataArray = [];

        // Begin bij 2 element. Sla het 1e (id) over.
        for (let i = 1; i < data.length; i++) {
            finalDataArray.push(data[i]);
        }

            var width = 300;
            var height = 300;
            const specificColors = ['#ee4266', '#ffa100', '#3bceac', '#540d6e'];
            const labels = ['HP', 'ATT', 'DEF', 'SPD'];

            const highestValue = Math.max(...finalDataArray);
            console.log(highestValue);

            //Adds a linear scale for y axis
            var y = d3.scaleLinear()
                .range([height, 0])
                .domain([0, d3.max(finalDataArray, function(d) { return d; })])

            var yAxis = d3.axisLeft()
                        .scale(y);

            //Select chart and set its width and height
            var chart = d3.select(".bar-chart")
                .attr("width", width)
                .attr("height", height);

            var barWidth = width/finalDataArray.length;

            var bar = chart.selectAll("g")
                .data(finalDataArray)
                .enter()
                .append("g")
                .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

            bar.append("rect")
                .attr("y", function(d) { return y(d); })
                .attr("width", barWidth - 20)
                .attr("height", function(d) { return height - y(d); })
                .attr('fill', (d, i) => (i < 4 ? specificColors[i] : colorScale(i - 4)))

            bar.append("text")
                .attr("x", (barWidth / 2) - 3)
                .attr("y", function(d) { return height - y (highestValue - (d/2)); })
                .attr("dy", ".75em")
                .text(function(d) { return d; });

            bar.append("text")
                .attr("x", (barWidth / 2) + 4)
                .attr("y", function(d) { return height - y (highestValue - (highestValue / 17)); })
                .attr("dy", ".75em")
                .text((d, i) => (i < 4 ? labels[i] : (i - 4)));

            chart.append("g")
            .attr("transform", "translate(0, 400)")
            .call(yAxis);

    });
    </script>

    <svg height="600" class="bar-chart"></svg>

    <style>
        .bar-chart {
            fill: white;
            font: 16px sans-serif;
            text-anchor: end;
        }
    </style>