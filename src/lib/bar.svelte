<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	export let item;

    onMount(() => {
        // doe iets met svg en d3

		const calorieElement = document.querySelector(`.amountCalories-${item.id}`);

		const newCalories = Math.floor(item.calories / 16);

		for (let i = 0; i < newCalories; i++) {
			var img = document.createElement("img");
			img.src = "https://freesvg.org/img/Sugar-cube-34345345.png";
			img.style.width = "20px";
			img.style.height = "20px";

			calorieElement.appendChild(img);
		}
    });
</script>

<article class="card" id="{item.name}">
	<header>
		<h2 class="product-title">{item.name}</h2>
	</header>
	<img src="../images/drink.png" class="product-image" alt="Starbucks drink">
	<div class="product-info">
		<ul>
			<li class="amountCalories-{item.id}">Caloriën: </li>
			<li>Vet: {item.fat}</li>
			<li>Proteïne {item.protein}</li>
			<!-- <li >{item.suiker}</li> -->
		</ul>
	</div>
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 250px;
		width: 230px;
		background-color: #01754A;
		border-radius: 20px;
		transition: all .3s ease-in-out;
		padding: 20px;
		color: white;
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.2);
	}
	article:hover {
		transform: scale(1.1);
		cursor: pointer;
	}


	article header {
		width: 100%;
	}

	.product-title {
		text-align: center;
		font-size: 18px;
		min-height: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.product-image {
		width: 175px;
	}

	.product-info {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.product-info ul {
		padding: 0;
	}

	.product-info ul li {
		list-style-type: none;
		display: flex;
    	gap: 3px;
	}

	article img {
		width: 200px;
	}
</style>

