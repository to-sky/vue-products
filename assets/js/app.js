Vue.component('product', {
	props: {
		premium: {
			type: Boolean,
			required: true
		}
	},
	template: `
	<div class="row mt-3">
		<div class="col-md-4 pl-0">
			<img :src="image" class="img-thumbnail">
		</div>

		<div class="col-md-8">
			<h1>{{ title }}</h1>
			<p v-if="inStock">In Stock</p>
			<p v-else>Out of Stock</p>
			<p>Shipping: {{ shipping }}</p>

			<ul>
				<li v-for="detail in details">{{ detail }}</li>
			</ul>

			<div v-for="(variant, index) in variants" 
			  	 :key="variant.id" 
			  	 class="color-box"
			  	 :style="{ backgroundColor: variant.color }"
			  	 @mouseover="updateProduct(index)">
			</div>

			<div>
				<button v-on:click="addToCart" 
						:disabled="!inStock"
						class="btn btn-primary">
					Add to Cart
				</button>
			</div>
		</div>

		<product-review></product-review>
	</div>`,
	data() {
		return {
			brand: 'Adidas Original',
			product: 'Socks',
			selectedVariant: 0,
			details: ["80% cotton", "20% polyester", "Gender-neutral"],
			variants: [
				{
					id: 2234,
					color: "green",
					image: './assets/images/green-sock.jpg',
					qty: 10
				},
				{
					id: 3467,
					color: "blue",
					image: './assets/images/blue-sock.png',
					qty: 0
				},
			]
		}
	},
	methods: {
		addToCart() {
			this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
		},
		updateProduct(index) {
			this.selectedVariant = index
		}
	},
	computed: {
		title() {
			return this.brand + ' ' + this.product
		},
		image() {
			return this.variants[this.selectedVariant].image
		},
		inStock() {
			return this.variants[this.selectedVariant].qty
		},
		shipping() {
			if (this.premium) {
				return "Free"
			}
			
			return 2.99
		}
	}
})


Vue.component('product-review', {
	template: `
		<input v-model="name" class="form-control mt-2">
	`,
	data() {
		return {
			name: null
		}
	}
});


var app = new Vue({
	el: '#app',
	data: {
		premium: true,
		cart: []
	},
	methods: {
		updateCart(id) {
			this.cart.push(id)
		}
	}
})