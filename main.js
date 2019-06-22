var app = new Vue({
  el: "#app",
  data: {
    product: "Socks",
    description: "A warm fuzzy pair of socks",
    image: "./assets/vmSocks-green-onWhite.jpg",
    link:
      "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
    inStock: false,
    onSale: false,
    details: ["80% cotton", "20% polyester", "Gender-Neutral"],
    variants: [
      {
        variantId: 2234,
        variantColor: "green",
        variantImage:  "./assets/vmSocks-green-onWhite.jpg"
      },
      {
        variantId: 2235,
        variantColor: "blue",
        variantImage:  "./assets/vmSocks-blue-onWhite.jpg"
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
    updateProduct(variantImage){
      this.image = variantImage

    }
  }
});
