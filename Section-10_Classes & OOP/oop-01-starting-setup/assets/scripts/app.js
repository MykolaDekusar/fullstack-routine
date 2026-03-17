//Definiamo la classe Product
class Product {
  title = "DEFAULT";
  imageUrl; //undefined
  price; //undefined
  description; //undefined
}

const productList = {
  products: [
    // Utilizziamo la classe Product per creare un nuovo prodotto
    // Grazie al constructor
    new Product(),
    {
      title: "A pillow",
      imageUrl:
        "https://m.media-amazon.com/images/I/91ZmVcNJh9L._AC_UF894,1000_QL80_.jpg",
      price: 19.99,
      description: "A super soft comfy pillow",
    },
    {
      title: "Carpet",
      imageUrl:
        "https://www.loomkart.com/cdn/shop/files/fauxsilkcarpetloomkart_neosilk550017_3.jpg?v=1753537930",
      price: 499.99,
      description: "Persian premium carpet",
    },
  ],
  render() {
    const renderLocation = document.getElementById("app");
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    for (const prod of this.products) {
      const prodEl = document.createElement("li");
      prodEl.className = "product-item";
      prodEl.innerHTML = `
      <div>
        <img src ='${prod.imageUrl}' alt = '${prod.title}'>
        <div class='product-item__content'>
          <h2>${prod.title}</h2>
          <h3>\$${prod.price}</h3>
          <p>${prod.description}</p>
          <button>Add to Cart</button>
        </div>
      </div>
      `;
      prodList.append(prodEl);
    }

    renderLocation.append(prodList);
  },
};

productList.render();
