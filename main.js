var app = new Vue({
  el: "#app",
  data: {
    brand: "Reed's",
    product: "Socks",
    description: "A warm fuzzy pair of socks",
    selectedVariant: 0,
    link:
      "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
    onSale: true,
    details: ["80% cotton", "20% polyester", "Gender-Neutral"],
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
    cart: 0,

  },

  methods: { //using es6 syntax here
    addToCart(){
      this.cart += 1
    },
    removeFromCart(){
      this.cart -= 1
    },
    updateProduct(index){
      this.selectedVariant = index
      console.log(index)

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
        }
  }
});
