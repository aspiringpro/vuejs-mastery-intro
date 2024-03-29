Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
  `
})


Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
  <div class="product">
    <div class="product-image"><img v-bind:src="image" alt="" /></div>
    <div class="product-info">
      <h1>{{title}}</h1>
      <p v-if="inStock">In Stock</p>
      <p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>
      <p>{{sale}}</p>
      <p>Shipping: {{shipping}}</p>
      <product-details :details="details"></product-details>
      <div
        v-for="(variant, index) in variants"
        class="color-box"
        :style="{ backgroundColor: variant.variantColor }"
        :key="variant.variantId"
        @click="updateProduct(index)"
      ></div>
      <ul>
        <li v-for="size in sizes">{{size}}</li>
      </ul>
      <button @click="addToCart"
              :disabled="!inStock"
              :class="{ disabledButton: !inStock}">
        Add to Cart
      </button>
      <button type="button" name="remove" @click="removeFromCart">
        Remove
      </button>
      <a :href="link">More products like this</a>
      <div>
      <h2>Reviews</h2>
      <p v-if="!reviews.length">There are no reviews yet</p>
      <ul>
        <li v-for="review in reviews">
          <p>{{ review.name }}</p>
          <p>{{ review.review }}</p>
          <p>{{ review.rating }}</p>
          <p>Recommend?: {{ review.recommend }}</p>
        </li>
      </ul>
      </div>

      <product-review @review-submitted="addReview"></product-review>
    </div>
  </div>
  `,
  data() {
    return {
      brand: "Reed's",
      product: "Socks",
      description: "A warm fuzzy pair of socks",
      details: ['80% cotton', '20% polyester', 'Gender-neutral'],
      selectedVariant: 0,
      link:
        "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
      onSale: true,

      variants: [
        {
          variantId: 2234,
          variantColor: "green",
          variantImage:  "./assets/vmSocks-green-onWhite.jpg",
          variantQuantity: 0
        },
        {
          variantId: 2235,
          variantColor: "blue",
          variantImage:  "./assets/vmSocks-blue-onWhite.jpg",
          variantQuantity: 1
        }
      ],
      sizes: ["small", "medium", "large"],
      reviews: []
    }
  },
  methods: { //using es6 syntax here
    addToCart(){
      this.$emit('add-to-cart',this.variants[this.selectedVariant].variantId)
    },
    removeFromCart(){
      this.$emit('remove-from-cart',this.variants[this.selectedVariant].variantId)
    },
    updateProduct(index){
      this.selectedVariant = index
      console.log(index)
    },
    addReview(productReview){
      this.reviews.push(productReview)
    }
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product
    },
    image(){
      return this.variants[this.selectedVariant].variantImage
    },
    inStock(){
      return this.variants[this.selectedVariant].variantQuantity
    },
    sale() {
          if (this.onSale) {
            return this.brand + ' ' + this.product + ' are on sale!'
          }
            return  this.brand + ' ' + this.product + ' are not on sale'
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
    <form class="review-form" @submit.prevent="onSubmit">
      <p v-if="errors.length">
        <b>Please correct the following errors:</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>

        </ul>

      </p>
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" />
      </p>
      <p>
        <label for="review">Review:</label>
        <textarea id="review" v-model="review" ></textarea>
      </p>
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating" >
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>

        </select>
      </p>
      <p>Would you recommend this product?</p>
        <label>
          Yes
          <input type="radio" value="Yes" v-model="recommend"/>
        </label>
        <label>
          No
          <input type="radio" value="No" v-model="recommend"/>
        </label>
      <p>
        <input type="submit" value="Submit">
      </p>








    </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommend: null,
      errors: []
    }
  },
  methods: {
    onSubmit(){
      if (this.name && this.review && this.rating){
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend
        }
        this.$emit('review-submitted', productReview)
        this.name = null
        this.review = null
        this.rating = null
        this.recommend = null
      }
      else {
        if(!this.name) this.errors.push("Name required.")
        if(!this.review) this.errors.push("Review required.")
        if(!this.rating) this.errors.push("Rating required.")
        if(!this.recommend) this.errors.push("Recommendation required.")
      }
    }

  }

})



var app = new Vue({
  el: "#app",
  data: {
    premium: true,
    cart: []
  },
  methods: {
  updateCart(id){
      this.cart.push(id)
    },
  removeFromCart(id){
    this.cart.pop(id)
  }
  }

});
