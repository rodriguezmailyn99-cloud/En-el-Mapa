// En el Mapa — prototipo de tienda (datos de ejemplo, precios referenciales en CLP con IVA)
const WHATSAPP = "56900000000"; // TODO: reemplazar por el número real
const FREE_SHIPPING = 40000;

const PRODUCTS = [
  { id: 1, name: "Cloro gel 900 ml", unit: "Unidad", price: 1690, cat: "aseo", img: "🧴" },
  { id: 2, name: "Papel higiénico 24 rollos", unit: "Pack", price: 12990, cat: "aseo", img: "🧻", tag: "Más vendido" },
  { id: 3, name: "Detergente líquido 3 L", unit: "Bidón", price: 8990, cat: "aseo", img: "🫧" },
  { id: 4, name: "Limpiador multiuso eco 1 L", unit: "Unidad", price: 3290, cat: "eco", img: "🌿", tag: "Eco" },
  { id: 5, name: "Toallas de papel x3", unit: "Pack", price: 4590, cat: "aseo", img: "🧽" },
  { id: 6, name: "Bolsas basura 70x90 x10", unit: "Pack", price: 1990, cat: "aseo", img: "🗑️" },
  { id: 7, name: "Cuaderno universitario 100 hjs", unit: "Unidad", price: 1890, cat: "libreria", img: "📓", tag: "Temporada" },
  { id: 8, name: "Lápices de colores x24", unit: "Caja", price: 4990, cat: "libreria", img: "🖍️" },
  { id: 9, name: "Lápiz pasta azul x10", unit: "Caja", price: 2490, cat: "libreria", img: "🖊️" },
  { id: 10, name: "Pegamento en barra 40 g", unit: "Unidad", price: 1290, cat: "libreria", img: "🧷" },
  { id: 11, name: "Resma papel carta 500 hjs", unit: "Resma", price: 4890, cat: "oficina", img: "📄", tag: "Más vendido" },
  { id: 12, name: "Archivador lomo ancho", unit: "Unidad", price: 2690, cat: "oficina", img: "🗂️" },
  { id: 13, name: "Notas adhesivas neón x5", unit: "Pack", price: 2290, cat: "oficina", img: "🟨" },
  { id: 14, name: "Cuaderno reciclado A5", unit: "Unidad", price: 2190, cat: "eco", img: "♻️", tag: "Eco" },
];

const KITS = [
  { id: 101, name: "Kit Vuelta a Clases", desc: "Cuadernos, lápices, colores, pegamento y más. Básica 1°–4°.", price: 24990, old: 28900, img: "🎒", color: "#ffe08a" },
  { id: 102, name: "Kit Aseo Hogar Mes", desc: "Todo para limpiar la casa un mes completo.", price: 29990, old: 34500, img: "🏠", color: "#bfeee8" },
  { id: 103, name: "Kit Oficina Pyme", desc: "Papel, archivo y aseo para 5–10 personas.", price: 39990, old: 46800, img: "🏢", color: "#ddd6fe" },
  { id: 104, name: "Kit Eco Consciente", desc: "Productos biodegradables y reciclados.", price: 14990, old: 17200, img: "🌱", color: "#c9f2d6" },
];

const $ = (s) => document.querySelector(s);
const clp = (n) => "$" + n.toLocaleString("es-CL");
const ALL = [...PRODUCTS, ...KITS];
const find = (id) => ALL.find((p) => p.id == id);
let cart = load();
let currentCat = "todo";

function load() {
  try {
    const c = JSON.parse(localStorage.getItem("eem-cart")) || {};
    for (const id in c) if (!find(id)) delete c[id];
    return c;
  } catch { return {}; }
}
function save() {
  try { localStorage.setItem("eem-cart", JSON.stringify(cart)); } catch {}
}

function renderKits() {
  $("#kits-grid").innerHTML = KITS.map((k) => `
    <article class="kit" style="background:${k.color}">
      <span class="emoji">${k.img}</span>
      <h3>${k.name}</h3>
      <p>${k.desc}</p>
      <div class="price">${clp(k.price)}<s>${clp(k.old)}</s></div>
      <button class="add" data-id="${k.id}">Agregar kit</button>
    </article>`).join("");
}

function renderGrid() {
  const q = $("#search").value.trim().toLowerCase();
  const list = PRODUCTS.filter((p) =>
    (currentCat === "todo" || p.cat === currentCat) && p.name.toLowerCase().includes(q));
  $("#grid").innerHTML = list.length ? list.map((p) => `
    <article class="card">
      ${p.tag ? `<span class="tag ${p.cat === "eco" ? "eco" : ""}">${p.tag}</span>` : ""}
      <div class="img">${p.img}</div>
      <h3>${p.name}</h3>
      <span class="unit">${p.unit}</span>
      <span class="p">${clp(p.price)}</span>
      <button class="add" data-id="${p.id}">Agregar 🛒</button>
    </article>`).join("") : `<p>No encontramos “${q}”. Escríbenos y lo conseguimos 💬</p>`;
}

function add(id, n = 1) {
  cart[id] = (cart[id] || 0) + n;
  if (cart[id] <= 0) delete cart[id];
  save(); renderCart();
}

function renderCart() {
  const entries = Object.entries(cart);
  const count = entries.reduce((a, [, q]) => a + q, 0);
  const total = entries.reduce((a, [id, q]) => a + find(id).price * q, 0);
  $("#cartCount").textContent = count;
  $("#cartTotal").textContent = clp(total);
  $("#cartItems").innerHTML = entries.length ? entries.map(([id, q]) => {
    const p = find(id);
    return `<li><span>${p.img}</span><span class="ci-name">${p.name}<br><small>${clp(p.price * q)}</small></span>
      <span class="qty"><button data-dec="${id}">−</button>${q}<button data-inc="${id}">+</button></span></li>`;
  }).join("") : "<li>Tu carrito está vacío 🛒</li>";
  const pct = Math.min(100, (total / FREE_SHIPPING) * 100);
  $("#freeFill").style.width = pct + "%";
  $("#freeMsg").textContent = total >= FREE_SHIPPING
    ? "🎉 ¡Tienes despacho gratis!"
    : `Te faltan ${clp(FREE_SHIPPING - total)} para despacho gratis 🚚`;
}

function toast(msg) {
  const t = $("#toast");
  t.textContent = msg; t.classList.add("show");
  clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("show"), 1800);
}

function openCart(open) {
  $("#drawer").classList.toggle("open", open);
  $("#overlay").classList.toggle("show", open);
}

document.addEventListener("click", (e) => {
  const t = e.target;
  if (t.dataset.id) { add(+t.dataset.id); toast("Agregado al carrito ✅"); }
  if (t.dataset.inc) add(+t.dataset.inc);
  if (t.dataset.dec) add(+t.dataset.dec, -1);
  if (t.classList.contains("cat")) {
    document.querySelectorAll(".cat").forEach((c) => c.classList.remove("active"));
    t.classList.add("active");
    currentCat = t.dataset.cat;
    $("#catLabel").textContent = currentCat === "todo" ? "Todos los productos" : t.textContent;
    renderGrid();
    $("#catalogo").scrollIntoView();
  }
});

$("#search").addEventListener("input", renderGrid);
$("#cartBtn").addEventListener("click", () => openCart(true));
$("#closeCart").addEventListener("click", () => openCart(false));
$("#overlay").addEventListener("click", () => openCart(false));

$("#checkout").addEventListener("click", () => {
  const lines = Object.entries(cart).map(([id, q]) => {
    const p = find(id);
    return `• ${q} x ${p.name} (${clp(p.price * q)})`;
  });
  if (!lines.length) return toast("Agrega productos primero");
  const msg = `Hola En el Mapa 📍, quiero este pedido:\n${lines.join("\n")}\nTotal: ${$("#cartTotal").textContent}`;
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
});

$("#b2bBtn").addEventListener("click", (e) => {
  e.preventDefault();
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hola, quiero cotizar para mi empresa 🏢")}`, "_blank");
});

$("#listaForm").addEventListener("submit", (e) => {
  e.preventDefault();
  e.target.reset();
  toast("¡Recibido! Te escribimos por WhatsApp 📸");
});

renderKits(); renderGrid(); renderCart();
