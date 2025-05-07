const products = [
    {
      name: "Gents Classic Leather",
      price: 120,
      image: "classic-watches-the-land-dweller-heritage-oysterquartz-datejust-1974-roller.avif",
      category: "gents",
    },
    {
      name: "Gents Sport Chrono",
      price: 200,
      image: "classic-watches-oyster-perpetual-1908-watch-suggestions-pop-in_m52509-0006_2301jva_001.avif",
      category: "gents",
    },
    {
      name: "Ladies Rose Gold",
      price: 150,
      image: "professional-watches-gmt-master-ii-yellow-gold-beautyshot-m126718grnr-0001_2310jva_001.avif",
      category: "ladies",
    },
    {
      name: "Ladies Minimalist",
      price: 130,
      image: "professional-watches-explorer-ii-optimum-legibility-in-all-conditions-m226570-0002_2205jva_001.avif",
      category: "ladies",
    }
  ];
  
  let currentFilter = 'all';
  let searchQuery = '';
  let cart = [];
  
  function renderProducts() {
    const container = document.getElementById("product-list");
    container.innerHTML = '';
  
    const filtered = products
      .filter(p => currentFilter === 'all' || p.category === currentFilter)
      .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  
    filtered.forEach(product => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <button onclick="addToCart('${product.name}')">Add to Cart</button>
      `;
      container.appendChild(card);
    });
  }
  
  function filterCategory(category) {
    currentFilter = category;
    renderProducts();
  }
  
  function searchProducts() {
    searchQuery = document.getElementById("search-input").value;
    renderProducts();
  }
  
  function addToCart(productName) {
    const product = products.find(p => p.name === productName);
    cart.push(product);
    updateCart();
  }
  
  function updateCart() {
    const cartList = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const total = document.getElementById("total");
  
    cartList.innerHTML = '';
    let totalPrice = 0;
  
    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - $${item.price}`;
      cartList.appendChild(li);
      totalPrice += item.price;
    });
  
    cartCount.textContent = cart.length;
    total.textContent = `Total: $${totalPrice}`;
  }
  
  function clearCart() {
    cart = [];
    updateCart();
  }
  
  function toggleCart() {
    const cartEl = document.getElementById("cart");
    cartEl.classList.toggle("open");
  }
  
  // Initial render
  renderProducts();
  