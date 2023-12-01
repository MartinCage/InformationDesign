<script>
    import { onMount } from "svelte";
    import * as d3 from 'd3';
    export let stats = [];

    onMount(() => {
        let data = stats;
        var finalDataArray = [];

        // Begin bij 2 element. Sla de 1e (id) over.
        for (let i = 1; i < data.length; i++) {
            finalDataArray.push(data[i]);
        }

        // Hoogte en breedte van de grafiek
        var width = 300;
        var height = 300;
        
        // Kleuren en labels van de balkjes
        const specificColors = ['#ee4266', '#ffa100', '#3bceac', '#540d6e'];
        const labels = ['HP', 'ATT', 'DEF', 'SPD'];

        const highestValue = Math.max(...finalDataArray); // Ga per datawaarde door de array heen en onthoud deze

        //Adds a linear scale for y axis
        var y = d3.scaleLinear()
            .range([height, 0])
            .domain([0, highestValue])

        var yAxis = d3.axisLeft() // Maak een as aan de linkerkant van het plot
            .scale(y); // Configureer een as en koppel hem aan de y

        //Select chart and set its width and height
        var chart = d3.select(".bar-chart")
            .attr("width", width)
            .attr("height", height);

        // Breedte van de balkjes
        var barWidth = width/finalDataArray.length;

        // Maak de grafiek
        var bar = chart.selectAll("g")
            .data(finalDataArray)
            .enter()
            .append("g")
            .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

        // Voeg de balkjes toe aan de grafiek
        bar.append("rect")
            .attr("y", function(d) { return y(d); }) // Bepaal y coordinaat van de rec door de datawaarde van d met schaalfunctie y
            .attr("width", barWidth - 20)
            .attr("height", function(d) { return height - y(d); }) // Bepaal hoogte van de rec door de datawaarde met schaalfucntie y
            .attr('fill', (d, i) => (i < 4 ? specificColors[i] : colorScale(i - 4))) // Is i kleiner dan 4 kijk dan naar de waarde in array. Pak anders colorscale
        // Voeg de waardes toe aan de grafiek
        bar.append("text")
            .attr("x", (barWidth / 2) - 3)
            .attr("y", function(d) { return height - y (highestValue - (d/2)); }) // Bepaal y coordinaat door datawaarde
            .attr("dy", ".75em")
            .text(function(d) { return d; });

        // Voeg de labels toe aan de grafiek
        bar.append("text")
            .attr("x", (barWidth / 2) + 4)
            .attr("y", function(d) { return height - y (highestValue - (highestValue / 17)); })
            .attr("dy", ".75em") // Verschuif text met 75% van de lettergrootte. Dy staat voor DeltaY
            .text((d, i) => (i < 4 ? labels[i] : (i - 4))); // Is i kleiner dan 4 kijk dan naar de waarde in array.

        // Koppel de grafiek aan de container
        chart.append("g")
        .attr("transform", "translate(0, 400)") // Verschuif 400 pixels op Y as naar beneden
        .call(yAxis); // Koppel yAxis aan g

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