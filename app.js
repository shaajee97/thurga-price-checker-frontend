let products = [];

async function loadProducts() {
  try {
    const response = await fetch('/products.json');
    products = await response.json();
  } catch (error) {
    console.error('Failed to load products.json', error);
  }
}

function displayItem(product) {
  const itemList = document.getElementById('itemList');
  const div = document.createElement('div');
  div.className = 'item';
  div.innerHTML = `<strong>${product.name}</strong><br>Price: $${product.price}<br>Stock: ${product.quantity ?? 'N/A'}`;
  itemList.appendChild(div);
}

function resetScanner() {
  document.getElementById('itemList').innerHTML = '';
  document.getElementById('hiddenInput').focus();
}

document.getElementById('resetBtn').addEventListener('click', resetScanner);

document.getElementById('hiddenInput').addEventListener('keydown', async (e) => {
  if (e.key === 'Enter') {
    const code = e.target.value.trim();
    e.target.value = '';
    if (!products.length) await loadProducts();

    const product = products.find(p => p.barcode === code);
    if (product) {
      displayItem(product);
    } else {
      alert('Product not found!');
    }
  }
});

window.onload = () => {
  loadProducts();
  document.getElementById('hiddenInput').focus();
};