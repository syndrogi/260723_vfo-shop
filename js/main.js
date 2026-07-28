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

/**
 * Promo Banner — Click-drag Pan
 * The banner photo drifts on its own via CSS (see promoBannerFloat in
 * style.css). Pressing and dragging it takes over that same transform
 * so visitors can pan to any part of the oversized image by hand;
 * releasing leaves it wherever it was dropped.
 */
function setupPromoBannerDrag() {
  const wrap = document.querySelector(".promo-banner-image");
  const img = wrap?.querySelector("img");
  if (!wrap || !img) return;

  let dragging = false;
  let startX = 0;
  let startY = 0;
  let baseX = 0;
  let baseY = 0;
  let offsetX = 0;
  let offsetY = 0;

  function clamp(value, max) {
    return Math.min(max, Math.max(-max, value));
  }

  function applyOffset(x, y) {
    const maxX = (img.offsetWidth - wrap.offsetWidth) / 2;
    const maxY = (img.offsetHeight - wrap.offsetHeight) / 2;
    offsetX = clamp(x, maxX);
    offsetY = clamp(y, maxY);
    img.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  }

  img.addEventListener("pointerdown", (e) => {
    // Freeze the drift exactly where it is (img's transform is pure
    // drift — see .promo-banner-image-center in style.css — so this
    // reads back cleanly with no centering offset to subtract) before
    // handing control to the pointer. animation is stopped here for
    // good (not just paused/toggled) so re-enabling it on release
    // wouldn't yank the photo back to the start of its cycle.
    const matrix = new DOMMatrixReadOnly(getComputedStyle(img).transform);
    img.style.animation = "none";
    wrap.classList.add("is-dragging");
    applyOffset(matrix.m41, matrix.m42);

    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    baseX = offsetX;
    baseY = offsetY;
    img.setPointerCapture(e.pointerId);
  });

  img.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    applyOffset(baseX + (e.clientX - startX), baseY + (e.clientY - startY));
  });

  function endDrag() {
    dragging = false;
    wrap.classList.remove("is-dragging");
  }

  img.addEventListener("pointerup", endDrag);
  img.addEventListener("pointercancel", endDrag);
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  setupSort();
  setupPromoBannerDrag();
});
