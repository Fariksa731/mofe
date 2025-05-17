
async function fetchProducts() {
  const res = await fetch('/api/store');
  const products = await res.json();
  const container = document.getElementById('products-container');
  container.innerHTML = "";
  products.forEach(p => {
    container.innerHTML += `<div class="product-card">
      <img src="${p.image}" width="100%">
      <h3>${p.name}</h3>
      <p>${p.price} ريال</p>
    </div>`;
  });
}
fetchProducts();
