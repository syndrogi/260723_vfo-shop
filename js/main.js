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
 * Promo Banner — Idle Drift + Hover Parallax
 * At rest the (zoomed-in, model-anchored — see .promo-banner-image-center
 * in style.css) photo drifts gently on its own. Moving the cursor over it
 * pans it toward the cursor instead; leaving eases it back to center,
 * where it resumes the idle drift. Bounds are measured from the actual
 * rendered box rather than hardcoded, so panning can never expose empty
 * space around the (asymmetrically anchored) image.
 */
function setupPromoBannerParallax() {
  const wrap = document.querySelector(".promo-banner-image");
  const img = wrap?.querySelector("img");
  if (!wrap || !img) return;

  // Must match the translate() in .promo-banner-image-center.
  const ANCHOR_X = 0.59;
  const ANCHOR_Y = 0.52;
  const RETURN_MS = 700;
  const IDLE_AMOUNT = 0.4; // fraction of the tighter safe bound per axis
  const HOVER_AMOUNT = 0.5; // fraction of the full bound used while panning on hover
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let mode = "idle"; // "idle" | "hovering" | "returning"
  let rafId = null;
  let idleStart = null;
  let bounds = { minX: 0, maxX: 0, minY: 0, maxY: 0 };
  let returnTimer = null;

  function computeBounds() {
    const cr = wrap.getBoundingClientRect();
    const imgW = img.offsetWidth;
    const imgH = img.offsetHeight;
    const neutralLeft = cr.left + cr.width / 2 - ANCHOR_X * imgW;
    const neutralTop = cr.top + cr.height / 2 - ANCHOR_Y * imgH;
    bounds = {
      maxX: cr.left - neutralLeft,
      minX: -(neutralLeft + imgW - (cr.left + cr.width)),
      maxY: cr.top - neutralTop,
      minY: -(neutralTop + imgH - (cr.top + cr.height)),
    };
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function setOffset(x, y) {
    img.style.transform = `translate(${x}px, ${y}px)`;
  }

  function idleTick(timestamp) {
    if (mode !== "idle") return;
    if (idleStart === null) idleStart = timestamp;
    const t = (timestamp - idleStart) / 1000;
    const ampX = Math.min(bounds.maxX, -bounds.minX) * IDLE_AMOUNT;
    const ampY = Math.min(bounds.maxY, -bounds.minY) * IDLE_AMOUNT;
    setOffset(
      Math.sin((t * 2 * Math.PI) / 9) * ampX,
      Math.sin((t * 2 * Math.PI) / 7) * ampY
    );
    rafId = requestAnimationFrame(idleTick);
  }

  function startIdle() {
    mode = "idle";
    idleStart = null;
    if (reduceMotion) {
      setOffset(0, 0);
      return;
    }
    computeBounds();
    rafId = requestAnimationFrame(idleTick);
  }

  function stopIdle() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
  }

  img.addEventListener("pointerenter", () => {
    clearTimeout(returnTimer);
    stopIdle();
    mode = "hovering";
    computeBounds();
    img.style.transition = "none";
  });

  img.addEventListener("pointermove", (e) => {
    if (mode !== "hovering") return;
    const cr = wrap.getBoundingClientRect();
    const dx = (e.clientX - (cr.left + cr.width / 2)) / (cr.width / 2);
    const dy = (e.clientY - (cr.top + cr.height / 2)) / (cr.height / 2);
    const targetX = (dx >= 0 ? dx * bounds.maxX : dx * -bounds.minX) * HOVER_AMOUNT;
    const targetY = (dy >= 0 ? dy * bounds.maxY : dy * -bounds.minY) * HOVER_AMOUNT;
    setOffset(clamp(targetX, bounds.minX, bounds.maxX), clamp(targetY, bounds.minY, bounds.maxY));
  });

  img.addEventListener("pointerleave", () => {
    mode = "returning";
    img.style.transition = `transform ${RETURN_MS}ms ease`;
    setOffset(0, 0);
    clearTimeout(returnTimer);
    returnTimer = setTimeout(() => {
      img.style.transition = "";
      if (mode === "returning") startIdle();
    }, RETURN_MS);
  });

  startIdle();
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  setupSort();
  setupPromoBannerParallax();
});
