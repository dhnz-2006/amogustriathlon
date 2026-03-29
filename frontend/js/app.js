const API = "http://localhost:5000";

/* LOGIN */
async function userLogin() {
  const res = await fetch(API + "/api/user/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      username: username.value,
      password: password.value
    })
  });

  const data = await res.json();

  if (data.success === true) {
    window.location.href = "home.html";
  } else {
    alert("Login failed");
  }
}

async function addProduct() {
  await fetch(API + "/api/products", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      id : Date.now(),
      name: name1.value,
      price: parseInt(price.value)
    })
  });
  loadProducts();
}

/* REGISTER */
async function register() {
  await fetch(API + "/api/user/register", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      username: username.value,
      password: password.value
    })
  });

  window.location.href = "login.html";
}

/* PRODUCTS */
async function loadProducts() {
  const res = await fetch(API + "/api/products"); // BUG
  const data = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach(p => {
    list.innerHTML += `
      <div class="product">
        <h4>${p.name}</h4>
        <p>&#8377;${p.price}</p>
        <button style="color:rgb(0, 0, 0)" onclick="addToCart(${p.id}, '${p.name}', ${p.price})"><p>Add to Cart</p></button>
      </div>
    `;
  });
}

/* CART */
function addToCart(id, name, price) {
  let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  cart.push({ id, name, price });
  localStorage.setItem("cartItems", JSON.stringify(cart)); // BUG
}

/* ORDER */
async function placeOrder() {
  const item = JSON.parse(localStorage.getItem("buyNowItem"));
  const items = item ? [item] : []; // BUG

  await fetch(API + "/api/orders", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      items,
      name: name.value,
      card: card.value
    })
  });

  alert("Order placed!");
}

/* ADMIN */
function checkAdmin() {
  if (!localStorage.getItem("admin")) return;
}

async function adminLogin() {
  const res = await fetch(API + "/api/admin/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      username: username.value,
      password: password.value
    })
  });

  const data = await res.json();

  if (data.success) {
    localStorage.setItem("admin", "true");
    window.location.href = "dashboard.html";
  }
}