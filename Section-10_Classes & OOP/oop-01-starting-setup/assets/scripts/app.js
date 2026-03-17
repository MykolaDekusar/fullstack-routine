const productList = {
  products: [
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
    const renderLocation = document.getElementById('app');
    const createList = document.createElement('ul');
    createList.className = 'product-list';
    for(const prod of this.products){
      const prodEl = document.createElement('li');
      prodEl.className = 'product-item';
      
    }
    
    renderLocation.append();
  }
};

productList.render();