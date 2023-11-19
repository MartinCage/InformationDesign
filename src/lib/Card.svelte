<script>
	import { onMount } from 'svelte';
	export let item;

    onMount(() => {
		function printData(attrValue, src, element) {
			if (attrValue <= 0) {
				element.innerHTML += ` ${attrValue}`;
			} else {
			for (let j = 0; j < attrValue; j++) {
					let img = document.createElement("img");
					img.className = "info-detail";
					img.src = src;
					element.appendChild(img);
				}
			}
		}

		// Key is bijv id, name, calories
		// Value is de waarde 1, 'Ik ben de naam', 105

		for (const [key, value] of Object.entries(item)) {
			let id = item.id;
			const scales = [];
				scales['calories'] = 0.02;
				scales['fat'] = 0.02;
				scales['protein'] = 1;

			if(key != 'id' && key != 'name') {
				let attrValue = value * scales[key];
				let src = `../images/${key}.png`;
				let el = document.querySelector(`#amount-${key}-${id}`);
				printData(attrValue, src, el);
			}
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
						<li id="amount-calories-{item.id}" class="info-detail">Caloriën: </li>
						<li id="amount-fat-{item.id}" class="info-detail">Vet: </li>
						<li id="amount-protein-{item.id}" class="info-detail">Proteïne: </li>
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
		margin: 0 17.5px;
		flex-direction: column;
		width: calc(20% - 35px);
		flex: 1 0 calc(20% - 35px);
		max-width: calc(20% - 35px);
		background-color: #01754A;
		border-radius: 20px;
		transition: all .3s ease-in-out;
		color: white;
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
		background-image: url('../images/Stars-white.svg');
	}

	article:not(:nth-child(-n+5)) {
		margin-top: 35px;
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
		min-height: 90px;
	}

	.product-info ul {
		padding: 0;
		margin: 0;
	}

	.product-info ul li {
		list-style-type: none;
		display: flex;
    	gap: 3px;
		color: rgba(0, 0, 0, 0.3);
		font-weight: bold;
		width: 100%;
		font-size: 20px;
	}

	.info-detail{
		width: 20px;
		height: 20px;
	}

	article img {
		width: 200px;
	}
</style>

