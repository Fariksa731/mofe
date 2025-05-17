
async function addProduct() {
  const product = {
    name: document.getElementById("name").value,
    price: document.getElementById("price").value,
    image: document.getElementById("image").value
  };
  await fetch("/api/store", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product)
  });
  loadProducts();
}

async function loadProducts() {
  const res = await fetch("/api/store");
  const products = await res.json();
  const tbody = document.querySelector("#products-table tbody");
  tbody.innerHTML = "";
  products.forEach(p => {
    tbody.innerHTML += `
      <tr>
        <td>${p.name}</td>
        <td>${p.price}</td>
        <td><img src="${p.image}" width="50"/></td>
        <td>
          <button onclick='editProduct("${p._id}")'>✏️</button>
          <button onclick='deleteProduct("${p._id}")'>🗑️</button>
        </td>
      </tr>`;
  });
}
loadProducts();

async function deleteProduct(id) {
  await fetch("/api/store", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ _id: id })
  });
  loadProducts();
}

async function editProduct(id) {
  const name = prompt("اسم جديد");
  const price = prompt("سعر جديد");
  const image = prompt("رابط صورة جديد");
  await fetch("/api/store", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ _id: id, name, price, image })
  });
  loadProducts();
}
