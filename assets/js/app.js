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
		
		<div class="col-md-12 mt-3 border py-3">
			<h2>Review</h2>
			<p v-if="!reviews.length">There are no reviews yet.</p>
			<ul class="list-group">
				<li v-for="review in reviews" class="list-group-item">
					<p>{{ review.name }}</p>
					<p>Rating: {{ review.rating }}</p>
					<p><p>{{ review.review }}</p></p>
				</li>
			</ul>
		</div>

		<product-review @review-submitted="addReview"></product-review>
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
			],
			reviews: []
		}
	},
	methods: {
		addToCart() {
			this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
		},
		updateProduct(index) {
			this.selectedVariant = index
		},
		addReview(productReview) {
			this.reviews.push(productReview)
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
});

Vue.component('product-review', {
	template: `
		<div class="col-md-4 mt-3 border">
			<p v-if="errors.length">
				<b>Please correct the following error(s):</b>
				<ul>
					<li v-for="error in errors">{{ error }}</li>
				</ul>			
			</p>
		
			<form @submit.prevent="onSubmit">
				<div class="form-group">
					<label for="name">Name:</label>
					<input type="text" id="name" name="name" class="form-control" v-model="name">
				</div>
				 
				<div class="form-group">
					<label for="review">Review:</label>
					<textarea name="review" id="review" class="form-control" cols="30" rows="6" v-model="review"></textarea>
				</div>
				
				<div class="form-group">
					<label for="rating">Rating:</label>
					<select name="rating" id="rating" class="form-control" v-model="rating">
						<option value="5">5</option>
						<option value="4">4</option>
						<option value="3">3</option>
						<option value="2">2</option>
						<option value="1">1</option>
					</select>				
				</div>
				
				<button type="submit" class="btn btn-primary">Submit</button>
			</form>
		</div>
	`,
	methods: {
		onSubmit() {
			if(this.name && this.rating && this.review) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                };

                this.$emit('review-submitted', productReview);
                this.name = null;
                this.review = null;
                this.rating = null;
			} else {
				if(!this.name) this.errors.push("Name is required.");
                if(!this.review) this.errors.push("Reviews is required.");
                if(!this.rating) this.errors.push("Rating is required.");
			}
		}
	},
	data() {
		return {
			name: null,
			review: null,
			rating: null,
			errors: []
		}
	}
});


var app = new Vue({
	el: '#app',
	data: {
		premium: true,
		cart: [],
		show: true
	},
	methods: {
		updateCart(id) {
			this.cart.push(id)
		},
        clickMe() {
			console.log(this);
		}
	}
});
