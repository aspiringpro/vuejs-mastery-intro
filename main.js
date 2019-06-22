var app = new Vue({
  el: "#app",
  data: {
    product: "Socks",
    description: "A warm fuzzy pair of socks",
    image: "./assets/vmSocks-green-onWhite.jpg",
    link:
      "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
    inventory: 10,
    onSale: false,
    details: ["80% cotton", "20% polyester", "Gender-Neutral"],
    variants: [
      {
        variantId: 2234,
        variantColor: "green"
      },
      {
        variantId: 2235,
        variantColor: "blue"
      }
    ],
    sizes: ["small", "medium", "large"]
  }
});
