//Definiamo la classe Product
class Product {
  title = "DEFAULT";
  imageUrl; //undefined
  price; //undefined
  description; //undefined
  // Creiamo un metodo speciale per costruire
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }
}

class ProductItemRender {
  constructor(product) {
    this.product = product;
  }
  render() {
    const prodEl = document.createElement("li");
    const prod = this.product;
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
    // Creiamo un addCartButton per ogni singolo elemento siccome ne creiamo 1 ogni volta
    const addCartButton = prodEl.querySelector("button");
    // Con bind gli passiamo il this che si riferisce all'oggetto
    addCartButton.addEventListener("click", this.addToCart.bind(this));
    return prodEl;
  }

  addToCart() {
    console.dir(this);
    console.log(`Adding ${this.product.title} to cart`);
  }
}

// Creiamo la classe del carrello
class ShoppingCart {
  items = [];
  render() {
    const cartEl = document.createElement("section");
    let total = 0;
    cartEl.innerHTML = `
    <h2>Total: \$${total}</h2>
    <button>Order Now!</button>
    `;
    cartEl.className = "cart";
    return cartEl;
  }
}

// Creaimo una classe che contiene la logica
class ProductList {
  products = [
    // Utilizziamo la classe Product per creare un nuovo prodotto
    // Grazie al constructor
    new Product(
      "A pillow",
      "https://m.media-amazon.com/images/I/91ZmVcNJh9L._AC_UF894,1000_QL80_.jpg",
      19.99,
      "A super soft comfy pillow",
    ),
    new Product(
      "Carpet",
      "https://www.loomkart.com/cdn/shop/files/fauxsilkcarpetloomkart_neosilk550017_3.jpg?v=1753537930",
      499.99,
      "Persian premium carpet",
    ),
  ];
  constructor() {}
  // Passiamo qua dentro la logica
  render() {
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    for (const prod of this.products) {
      const productItem = new ProductItemRender(prod);
      const prodEl = productItem.render();
      prodList.append(prodEl);
    }
    return prodList;
  }
}

class Shop {
  render() {
    const renderLocation = document.getElementById("app");
    const cart = new ShoppingCart();
    cart.render();
    const productList = new ProductList();
    renderLocation.append(cart.render());
    renderLocation.append(productList.render());
  }
}

const shop = new Shop();
shop.render();

// const productList = {
//   products: [],
// products: [
// Utilizziamo la classe Product per creare un nuovo prodotto
// Grazie al constructor
// new Product(
//   "A pillow",
//   "https://m.media-amazon.com/images/I/91ZmVcNJh9L._AC_UF894,1000_QL80_.jpg",
//   19.99,
//   "A super soft comfy pillow",
// ),
// new Product(
//   "Carpet",
//   "https://www.loomkart.com/cdn/shop/files/fauxsilkcarpetloomkart_neosilk550017_3.jpg?v=1753537930",
//   499.99,
//   "Persian premium carpet",
// ),
// {
//   title: "A pillow",
//   imageUrl:
//     "https://m.media-amazon.com/images/I/91ZmVcNJh9L._AC_UF894,1000_QL80_.jpg",
//   price: 19.99,
//   description: "A super soft comfy pillow",
// },
// {
//   title: "Carpet",
//   imageUrl:
//     "https://www.loomkart.com/cdn/shop/files/fauxsilkcarpetloomkart_neosilk550017_3.jpg?v=1753537930",
//   price: 499.99,
//   description: "Persian premium carpet",
// },
// ],
// render() {
//   const renderLocation = document.getElementById("app");
//   const prodList = document.createElement("ul");
//   prodList.className = "product-list";
//   for (const prod of this.products) {
//     const prodEl = document.createElement("li");
//     prodEl.className = "product-item";
//     prodEl.innerHTML = `
//     <div>
//       <img src ='${prod.imageUrl}' alt = '${prod.title}'>
//       <div class='product-item__content'>
//         <h2>${prod.title}</h2>
//         <h3>\$${prod.price}</h3>
//         <p>${prod.description}</p>
//         <button>Add to Cart</button>
//       </div>
//     </div>
//     `;
//     prodList.append(prodEl);
//   }

//   renderLocation.append(prodList);
// },
// };
