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
  constructor(product, addToCart) {
    this.product = product;
    this.addToCart = addToCart;
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
    addCartButton.addEventListener("click", () => {
      this.addToCart(prod);
    });
    return prodEl;
  }
}

// Creiamo la classe del carrello
class ShoppingCart {
  items = [];
  // Metodo per aggioranre il totale nell'HTML
  set cartTotal(value){
    this.totalOutput.innerHTML = `<h2>Total: \$${value.toFixed(2)}</h2>`;
  }

  addProduct(product){
    this.items.push(product);
    const sum = this.items.reduce((prev, next) => prev + next.price, 0);
    this.cartTotal = sum;
  }

  render() {
    console.log(this.items);
    const cartEl = document.createElement("section");
    cartEl.className = "cart";
    cartEl.innerHTML = `
    <h2>Total: \$0.00</h2>
    <button>Order Now!</button>
    `;
    this.totalOutput = cartEl.querySelector("h2");
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
  constructor(addToCart) {
    this.addToCart = addToCart;
  }
  // Passiamo qua dentro la logica
  render() {
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    for (const prod of this.products) {
      const productItem = new ProductItemRender(prod, this.addToCart);
      const prodEl = productItem.render();
      prodList.append(prodEl);
    }
    return prodList;
  }
}

class Header {
  render() {
    const header = document.createElement("header");
    header.style.backgroundColor = "red";
    header.style.height = "50px";
    header.style.width = "100%";
    header.innerHTML = "<h1>Shopping Center</h1>";
    return header;
  }
}

class Shop {
  shoppingList = [];
  render() {
    const renderLocation = document.getElementById("app");
    // IMPORTANTE: salviamo il carrello in this.cart (proprietà della classe)
    this.cart = new ShoppingCart();
    const productList = new ProductList(this.addToCart.bind(this));
    const header = new Header();

    renderLocation.append(header.render());
    renderLocation.append(this.cart.render());
    renderLocation.append(productList.render());
  }
  addToCart(product) {
   this.cart.addProduct(product);
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
