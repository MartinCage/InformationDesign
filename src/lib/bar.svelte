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
	<div class="stars-wrapper">
		<div class="stars">
			<div class="content">
				<div class="visual">
					<img src="../images/drink.png" class="product-image" alt="Starbucks drink">
				</div>
				<header>
					<h2 class="product-title">{item.name}</h2>
				</header>
				<div class="product-info">
					<ul>
						<li class="amountCalories-{item.id}">Caloriën: </li>
						<li>Vet: {item.fat}</li>
						<li>Proteïne {item.protein}</li>
						<!-- <li >{item.suiker}</li> -->
					</ul>
				</div>
			</div>
		</div>
	</div>
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		max-width: 250px;
		width: 230px;
		background-color: #01754A;
		border-radius: 20px;
		transition: all .3s ease-in-out;
		color: white;
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
		background-image: url('../images/Stars-white.svg');
	}
	article:hover {
		transform: scale(1.1);
		cursor: pointer;
	}

	.stars-wrapper {
		background-color: rgba(1, 117, 74, 0.7);
		border-radius: 20px;
		height: 100%;
    	width: 100%;
	}

	.stars {
		height: 100%;
		width: 100%;
		border-radius: 20px;
		background-image: linear-gradient(to bottom, rgba(255,0,0,0), rgba(1,117,74,1), 100%, rgba(1,117,74,1));
	}

	.content {
		padding: 20px;
	}

	.visual {
		display: flex;
		justify-content: center;
	}

	.product-image {
		width: 150px;
		margin: 0 auto;
	}

	article header {
		width: 100%;
	}

	.product-title {
		font-size: 18px;
		min-height: 60px;
	}

	.product-info {
		width: 100%;
	}

	.product-info ul {
		padding: 0;
	}

	.product-info ul li {
		list-style-type: none;
		display: flex;
    	gap: 3px;
		color: rgba(0, 0, 0, 0.3);
		font-weight: bold;
	}

	article img {
		width: 200px;
	}
</style>

