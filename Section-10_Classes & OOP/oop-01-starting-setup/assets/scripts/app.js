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

class Component {
  constructor(renderHookId, shouldRender = true) {
    this.hookId = renderHookId;
    if (shouldRender) {
      this.render();
    }
  }

  render() {}

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class ProductItemRender extends Component {
  constructor(product, renderHookId) {
    // For any work that involves "this" it's required to call super() first
    super(renderHookId, false);
    this.product = product;
    this.render();
  }
  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = this.createRootElement("li", "product-item");
    prodEl.innerHTML = `
      <div>
        <img src ='${this.product.imageUrl}' alt = '${this.product.title}'>
        <div class='product-item__content'>
          <h2>${this.product.title}</h2>
          <h3>\$${this.product.price}</h3>
          <p>${this.product.description}</p>
          <button>Add to Cart</button>
        </div>
      </div>
      `;
    // Creiamo un addCartButton per ogni singolo elemento siccome ne creiamo 1 ogni volta
    const addCartButton = prodEl.querySelector("button");
    addCartButton.addEventListener("click", this.addToCart.bind(this));
  }
}

// Creiamo la classe del carrello
// Applichiamo l'inheritance da Component
class ShoppingCart extends Component {
  items = [];
  // Metodo per aggioranre il totale nell'HTML
  set cartTotal(value) {
    this.totalOutput.innerHTML = `<h2>Total: \$${value.toFixed(2)}</h2>`;
  }

  constructor(renderHookId) {
    super(renderHookId); // Con super richiamiamo il constructor del padre Component
  }

  addProduct(product) {
    this.items.push(product);
    const sum = this.items.reduce((prev, next) => prev + next.price, 0);
    this.cartTotal = sum;
  }
  render() {
    const cartEl = this.createRootElement("section", "cart");
    cartEl.innerHTML = `
    <h2>Total: \$0.00</h2>
    <button>Order Now!</button>
    `;
    this.totalOutput = cartEl.querySelector("h2");
  }
}

// Creaimo una classe che contiene la logica
class ProductList extends Component {
  constructor(renderHookId) {
    super(renderHookId); // Con super richiamiamo il constructor del padre Component
    this.fetchProducts();
  }

  fetchProducts() {
    this.products = [
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
    this.renderProducts();
  }

  renderProducts() {
    for (const prod of this.products) {
      new ProductItemRender(prod, "prod-list");
    }
  }

  // Passiamo qua dentro la logica
  render() {
    const prodList = this.createRootElement("ul", "product-list");
    prodList.id = "prod-list";
    if (this.products && this.products.length > 0) {
      this.renderProducts();
    }
  }
}

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.attrName = attrName;
    this.attrValue = attrValue;
  }
}

class Header extends Component {
  constructor(appendId) {
    super(appendId);
  }
  render() {
    const header = this.createRootElement("header");
    header.style.backgroundColor = "red";
    header.style.height = "50px";
    header.style.width = "100%";
    header.innerHTML = "<h1>Shopping Center</h1>";
  }
}

class Shop extends Component {
  constructor() {
    super();
  }
  render() {
    // IMPORTANTE: salviamo il carrello in this.cart (proprietà della classe)
    this.cart = new ShoppingCart("app");
    new ProductList("app");
    new Header("app");
  }
}

class App {
  static init() {
    const shop = new Shop();
    this.cart = shop.cart;
  }
  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
