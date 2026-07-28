function renderProducts() {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = products
    .map((p) => {
      const badge = p.soldOut
        ? '<span class="badge">Sold Out</span>'
        : p.salePrice
        ? '<span class="badge sale">Sale</span>'
        : "";

      const priceHtml = p.salePrice
        ? `<span class="original">${formatPrice(p.price)}</span><span class="sale">${formatPrice(p.salePrice)}</span>`
        : `<span>${formatPrice(p.price)}</span>`;

      const img = p.image ? `<img src="${p.image}" alt="${p.name}">` : "";

      return `
        <a class="product-card" href="product.html?id=${p.id}">
          <div class="product-image">
            <div class="product-visual${p.soldOut ? " sold-out" : ""}">${img}</div>
            ${badge}
          </div>
          <div class="product-info">
            <div class="name">${p.name}</div>
            <div class="colors">${p.colors}</div>
            ${p.soldOut ? '<div class="sold-out-label">품절</div>' : `<div class="price">${priceHtml}</div>`}
          </div>
        </a>
      `;
    })
    .join("");

  document.getElementById("itemCount").textContent = `전체 ${products.length}개 상품`;
}

function sortProducts(order) {
  const getPrice = (p) => p.salePrice ?? p.price;

  if (order === "price-asc") {
    products.sort((a, b) => getPrice(a) - getPrice(b));
  } else if (order === "price-desc") {
    products.sort((a, b) => getPrice(b) - getPrice(a));
  } else if (order === "new") {
    products.reverse();
  }

  renderProducts();
}

function setupSort() {
  const sortSelect = document.getElementById("sortSelect");
  sortSelect.addEventListener("change", (e) => sortProducts(e.target.value));
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  setupSort();
});
