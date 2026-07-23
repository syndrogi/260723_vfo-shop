function setupNav() {
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  navToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });

  document.querySelectorAll(".has-dropdown > a").forEach((link) => {
    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 720) {
        e.preventDefault();
        link.parentElement.classList.toggle("open");
      }
    });
  });
}

function setupSearch() {
  const searchToggle = document.getElementById("searchToggle");
  const searchBar = document.getElementById("searchBar");

  searchToggle.addEventListener("click", () => {
    searchBar.classList.toggle("open");
    if (searchBar.classList.contains("open")) {
      searchBar.querySelector("input").focus();
    }
  });
}

function setupCart() {
  const cartBtn = document.getElementById("cartBtn");
  const cartCount = document.getElementById("cartCount");
  let count = 0;

  cartBtn.addEventListener("click", () => {
    count += 1;
    cartCount.textContent = count;
  });

  return {
    add(amount = 1) {
      count += amount;
      cartCount.textContent = count;
    },
  };
}

function setupNewsletter() {
  const form = document.getElementById("newsletterForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector("input");
    if (input.value) {
      alert("구독해주셔서 감사합니다.");
      input.value = "";
    }
  });
}

let cart;

document.addEventListener("DOMContentLoaded", () => {
  setupNav();
  setupSearch();
  cart = setupCart();
  setupNewsletter();
});
