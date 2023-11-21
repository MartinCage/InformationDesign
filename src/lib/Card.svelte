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

</style>

