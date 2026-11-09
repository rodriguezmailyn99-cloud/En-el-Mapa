// En el Mapa — prototipo. Precios referenciales en CLP con IVA (cámbialos por los de tus proveedores).
const CONFIG = {
  whatsapp: "56900000000",         // TODO: número real con código país, sin + ni espacios
  freeShipping: { hogar: 40000, empresa: 80000 },
  volume: { minQty: 10, discount: 0.08 }, // modo empresa: 8% desde 10 unidades por producto
  iva: 0.19,
};

const ZONES = [
  { name: "Mismo día", detail: "Pedido antes de las 12:00", color: "#1f8a5b",
    comunas: ["Santiago", "Providencia", "Ñuñoa", "Las Condes", "Vitacura", "La Reina", "Macul", "San Miguel"] },
  { name: "Día siguiente", detail: "Pedido antes de las 18:00", color: "#ffc23d",
    comunas: ["Maipú", "La Florida", "Puente Alto", "Peñalolén", "Estación Central", "Quinta Normal", "Recoleta", "Independencia", "Huechuraba", "Lo Barnechea", "La Cisterna", "San Joaquín", "Cerrillos", "Pudahuel", "Quilicura", "Renca", "Conchalí", "Lo Prado", "Cerro Navia", "La Granja", "San Ramón", "El Bosque", "Lo Espejo", "Pedro Aguirre Cerda", "La Pintana", "San Bernardo"] },
  { name: "48 a 72 horas", detail: "Resto de Santiago y regiones", color: "#e5532d", comunas: [] },
];

const CATEGORIES = [
  { id: "aseo-hogar", name: "Aseo hogar" },
  { id: "aseo-industrial", name: "Aseo industrial" },
  { id: "papeleria", name: "Papelería y oficina" },
  { id: "escolar", name: "Útiles escolares" },
  { id: "papeles", name: "Papeles y desechables" },
  { id: "higiene", name: "Higiene personal" },
  { id: "eco", name: "Línea eco", eco: true },
];

const BG = { "aseo-hogar": "#dcf0eb", "aseo-industrial": "#cfe9e2", papeleria: "#e4e0f7", escolar: "#ffe3a3", papeles: "#ffd8cb", higiene: "#e4e0f7", eco: "#dcf0eb" };

// modes: h = hogar, e = empresa
const PRODUCTS = [
  { id: 1, name: "Cloro gel 900 ml", unit: "Unidad", price: 1690, cat: "aseo-hogar", img: "🧴", modes: "he" },
  { id: 2, name: "Lavalozas concentrado 750 ml", unit: "Unidad", price: 2290, cat: "aseo-hogar", img: "🫧", modes: "he" },
  { id: 3, name: "Detergente líquido 3 L", unit: "Bidón", price: 8990, cat: "aseo-hogar", img: "🧺", modes: "h" },
  { id: 4, name: "Desinfectante 5 L", unit: "Bidón", price: 9990, cat: "aseo-industrial", img: "🧪", modes: "e" },
  { id: 5, name: "Jabón líquido manos 5 L", unit: "Bidón", price: 8490, cat: "aseo-industrial", img: "🧼", modes: "e" },
  { id: 6, name: "Bolsas basura 80x110 x10", unit: "Pack", price: 2490, cat: "aseo-industrial", img: "🗑️", modes: "he" },
  { id: 7, name: "Papel higiénico 32 rollos", unit: "Pack", price: 15990, cat: "papeles", img: "🧻", modes: "h" },
  { id: 8, name: "Papel higiénico jumbo 250 m x6", unit: "Caja", price: 18990, cat: "papeles", img: "🧻", modes: "e" },
  { id: 9, name: "Toalla de papel x3 rollos", unit: "Pack", price: 4590, cat: "papeles", img: "🧽", modes: "he" },
  { id: 10, name: "Vasos desechables 200 cc x50", unit: "Pack", price: 1990, cat: "papeles", img: "🥤", modes: "e" },
  { id: 11, name: "Resma papel carta 500 hojas", unit: "Resma", price: 4890, cat: "papeleria", img: "📄", modes: "he" },
  { id: 12, name: "Archivador lomo ancho", unit: "Unidad", price: 2690, cat: "papeleria", img: "🗂️", modes: "e" },
  { id: 13, name: "Lápiz pasta azul x50", unit: "Caja", price: 8990, cat: "papeleria", img: "🖊️", modes: "e" },
  { id: 14, name: "Notas adhesivas x5", unit: "Pack", price: 2290, cat: "papeleria", img: "🟨", modes: "he" },
  { id: 15, name: "Cuaderno universitario 100 hojas", unit: "Unidad", price: 1890, cat: "escolar", img: "📓", modes: "h" },
  { id: 16, name: "Lápices de colores x24", unit: "Caja", price: 4990, cat: "escolar", img: "🖍️", modes: "h" },
  { id: 17, name: "Pegamento en barra 40 g", unit: "Unidad", price: 1290, cat: "escolar", img: "✂️", modes: "h" },
  { id: 18, name: "Shampoo familiar 1 L", unit: "Unidad", price: 3990, cat: "higiene", img: "🧴", modes: "h" },
  { id: 19, name: "Alcohol gel 1 L", unit: "Unidad", price: 3490, cat: "higiene", img: "💧", modes: "he" },
  { id: 20, name: "Limpiador multiuso eco 1 L", unit: "Unidad", price: 3290, cat: "eco", img: "🌿", modes: "he" },
  { id: 21, name: "Cuaderno reciclado A5", unit: "Unidad", price: 2190, cat: "eco", img: "♻️", modes: "he" },
];

const KITS = {
  hogar: [
    { id: 101, name: "Kit Vuelta a Clases", tag: "Más pedido", bg: "#ffe3a3", img: "🎒", price: 24990, old: 28900,
      desc: "La lista completa de tu colegio, armada por nivel y lista para forrar.", items: ["5 cuadernos", "Lápices de colores", "Pegamento, tijeras y más"] },
    { id: 102, name: "Kit Aseo Depto / Airbnb", tag: "Recambio rápido", bg: "#dcf0eb", img: "🛏️", price: 19990, old: 23400,
      desc: "Lo necesario para dejar un depto impecable entre huéspedes.", items: ["Papel y toallas", "Cloro y multiuso", "Bolsas de basura"] },
    { id: 103, name: "Kit Aseo Mensual Familia", tag: "Con reposición", bg: "#ffd8cb", img: "🏠", price: 34990, old: 40500,
      desc: "Detergente, cloro, papel, lavalozas y más para todo el mes.", items: ["32 rollos de papel", "Detergente 3 L", "Lavalozas y cloro"] },
    { id: 104, name: "Kit Escritorio en Casa", tag: "Teletrabajo", bg: "#e4e0f7", img: "💻", price: 16990, old: 19800,
      desc: "Resma, cuadernos, lápices, archivadores y organizadores.", items: ["1 resma carta", "Notas adhesivas", "Lápices y cuaderno"] },
  ],
  empresa: [
    { id: 201, name: "Kit Oficina 10 Personas", tag: "Mensual", bg: "#e4e0f7", img: "🏢", price: 69990, old: 79900,
      desc: "Papelería, insumos de escritorio y cafetería para un equipo pequeño.", items: ["5 resmas", "Lápices x50", "Vasos y toallas"] },
    { id: 202, name: "Kit Baños y Cafetería", tag: "Con reposición", bg: "#dcf0eb", img: "☕", price: 49990, old: 56800,
      desc: "Papel higiénico, toallas, jabón, vasos y aseo para áreas comunes.", items: ["Papel jumbo x6", "Jabón 5 L", "Vasos x200"] },
    { id: 203, name: "Kit Clínica / Consulta", tag: "Salud", bg: "#ffd8cb", img: "🩺", price: 54990, old: 62300,
      desc: "Desechables, desinfección de superficies y papelería de recepción.", items: ["Desinfectante 5 L", "Alcohol gel", "Papelería recepción"] },
    { id: 204, name: "Kit Colegio / Jardín", tag: "Compras públicas", bg: "#ffe3a3", img: "🏫", price: 89990, old: 101500,
      desc: "Material didáctico, papelería y aseo por sala o por semestre.", items: ["Material por sala", "Aseo semestral", "Orden de compra OK"] },
  ],
};

const CONTENT = {
  hogar: {
    heroBadge: "Para tu casa y el colegio",
    heroTitleA: "Todo lo de la casa,", heroTitleB: "directo a tu puerta.",
    heroText: "Aseo, librería y útiles escolares con despacho express. Arma tu pedido en minutos o mándanos tu lista por WhatsApp.",
    heroCta1: "Sube tu lista escolar", heroCta1Href: "#lista",
    heroCta2: "Ver kits para el hogar",
    checks: ["Paga con Webpay o Mercado Pago", "Despacho express", "Reposición automática"],
    listEyebrow: "Nuevo · Temporada escolar",
    listTitle: "Sácale una foto a la lista. Nosotros armamos el carro.",
    listText: "Olvídate de recorrer librerías en febrero. Subes la lista del colegio, te armamos el pedido completo y tú solo lo apruebas.",
    listCta: "Subir mi lista escolar",
    steps: [["Sube la foto", "Desde el celular o por WhatsApp."], ["Elige el nivel", "Económico, estándar o premium: tú decides las marcas."], ["Paga y recibe", "Todo junto, forrado y etiquetado si quieres."]],
    kitsEyebrow: "Para el hogar",
    repoTitle: "Nunca más sin papel higiénico.",
    repoText: "Activa la reposición automática: te llega lo de siempre, cuando lo necesitas. Pausas o cambias cuando quieras.",
    priceNote: "Precios con IVA incluido.",
  },
  empresa: {
    heroBadge: "Para oficinas, clínicas y colegios",
    heroTitleA: "Tu oficina nunca", heroTitleB: "se queda sin papel.",
    heroText: "Precios por volumen a la vista, cotización al instante en PDF, factura electrónica y entregas programadas.",
    heroCta1: "Cotiza en 1 minuto", heroCta1Href: "#catalogo",
    heroCta2: "Ver kits para empresas",
    checks: ["Factura electrónica", "Precio por volumen", "Entregas programadas"],
    listEyebrow: "Nuevo · Sin digitar",
    listTitle: "Sácale una foto a tu lista u orden de compra.",
    listText: "Mándanos la lista de insumos, la orden de compra o la planilla del mes. Te devolvemos el carro armado y la cotización lista para aprobar.",
    listCta: "Subir mi lista u OC",
    steps: [["Sube la lista", "Foto, PDF, Excel o por WhatsApp."], ["Recibe la cotización", "En PDF, con precio por volumen y neto + IVA."], ["Aprueba y recibe", "Una sola factura y entrega en el día pactado."]],
    kitsEyebrow: "Para empresas",
    repoTitle: "Compras del mes, sin pedirlas.",
    repoText: "Programa tu pedido de siempre y te llega solo. Te avisamos 2 días antes por si quieres cambiar algo.",
    priceNote: "Precios netos + IVA. 8% de descuento desde 10 unidades por producto.",
  },
};

/* ---------- utilidades ---------- */
const $ = (s, el = document) => el.querySelector(s);
const clp = (n) => "$" + Math.round(n).toLocaleString("es-CL");
const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
const ALL = [...PRODUCTS, ...KITS.hogar, ...KITS.empresa];
const find = (id) => ALL.find((p) => p.id == id);
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};
const wsp = (text) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;

let mode = location.hash === "#empresa" ? "empresa" : store.get("eem-mode", "hogar");
let cart = store.get("eem-cart", {});
for (const id in cart) if (!find(id)) delete cart[id];
let category = null;
let freqDays = 30;

/* ---------- precios ---------- */
function lineTotal(id, qty) {
  const p = find(id);
  let total = p.price * qty;
  const vol = mode === "empresa" && !p.tag && qty >= CONFIG.volume.minQty;
  if (vol) total *= 1 - CONFIG.volume.discount;
  return { total, vol };
}
const shown = (gross) => (mode === "empresa" ? gross / (1 + CONFIG.iva) : gross);

/* ---------- render ---------- */
function renderMode() {
  document.body.dataset.mode = mode;
  const c = CONTENT[mode];
  document.querySelectorAll("[data-t]").forEach((el) => { el.textContent = c[el.dataset.t]; });
  $("#heroPrimary").setAttribute("href", c.heroCta1Href);
  $("#heroChecks").innerHTML = c.checks.map((t) => `<li><svg><use href="#i-check"/></svg>${t}</li>`).join("");
  $("#listSteps").innerHTML = c.steps.map(([t, d], i) => `<li data-anim><b>${i + 1}</b><strong>${t}</strong><span>${d}</span></li>`).join("");
  document.querySelectorAll("[data-mode-btn]").forEach((b) => b.setAttribute("aria-selected", b.dataset.modeBtn === mode));
  $("#modeLabel").textContent = mode === "empresa" ? "· Empresa (neto)" : "· Hogar";
  $("#quoteBtn").hidden = mode !== "empresa";
  $("#b2bBtn").textContent = mode === "empresa" ? "Hablar con una ejecutiva" : "Crear cuenta empresa";
  renderKits(); renderGrid(); renderCart();
}

function renderChips() {
  $("#chips").innerHTML = CATEGORIES.map((c) =>
    `<button class="chip${c.eco ? " eco" : ""}${category === c.id ? " on" : ""}" data-cat="${c.id}">${c.name}</button>`).join("");
}

function renderKits() {
  $("#kitsGrid").innerHTML = KITS[mode].map((k) => `
    <article class="kit" data-anim>
      <div class="kit-img" style="background:${k.bg}">${k.img}<span class="kit-tag">${k.tag}</span></div>
      <h3>${k.name}</h3>
      <p>${k.desc}</p>
      <ul>${k.items.map((i) => `<li>${i}</li>`).join("")}</ul>
      <div class="kit-foot">
        <span class="kit-price">${clp(shown(k.price))}${mode === "empresa" ? ' <small class="unit">+ IVA</small>' : ""}<s>${clp(shown(k.old))}</s></span>
        <button class="btn btn-dark" data-add="${k.id}">Agregar kit</button>
      </div>
    </article>`).join("");
}

function renderGrid() {
  const q = norm($("#search").value);
  const m = mode[0];
  let list = PRODUCTS.filter((p) => (category ? p.cat === category : p.modes.includes(m)));
  if (q) list = PRODUCTS.filter((p) => norm(p.name).includes(q) || norm(p.cat).includes(q));
  const catName = category && CATEGORIES.find((c) => c.id === category).name;
  $("#catTitle").textContent = q ? `Resultados para “${$("#search").value.trim()}”` : catName || "Lo más pedido";
  $("#grid").innerHTML = list.length ? list.map((p) => `
    <article class="card" data-anim>
      <div class="card-img" style="background:${BG[p.cat]}">${p.img}</div>
      <h3>${p.name}</h3>
      <span class="unit">${p.unit}</span>
      <span class="price">${clp(shown(p.price))}${mode === "empresa" ? ' <small class="unit">+ IVA</small>' : ""}</span>
      ${mode === "empresa" ? `<span class="vol">${clp(shown(p.price) * (1 - CONFIG.volume.discount))} desde ${CONFIG.volume.minQty} u.</span>` : ""}
      <button class="btn btn-outline" data-add="${p.id}">Agregar</button>
    </article>`).join("")
    : `<p class="empty">No lo tenemos publicado, pero lo conseguimos. <a href="${wsp("Hola, busco: " + $("#search").value)}" target="_blank" rel="noopener"><b>Pídelo por WhatsApp →</b></a></p>`;
}

function cartTotals() {
  let gross = 0, savings = 0;
  for (const [id, q] of Object.entries(cart)) {
    const { total } = lineTotal(id, q);
    gross += total; savings += find(id).price * q - total;
  }
  return { gross, savings };
}

function renderCart() {
  const entries = Object.entries(cart);
  const count = entries.reduce((a, [, q]) => a + q, 0);
  const { gross, savings } = cartTotals();
  $("#cartCount").hidden = !count;
  $("#cartCount").textContent = count;

  $("#cartItems").innerHTML = entries.length ? entries.map(([id, q]) => {
    const p = find(id);
    const { total, vol } = lineTotal(id, q);
    return `<li>
      <span class="ci-emoji" style="background:${p.bg || BG[p.cat]}">${p.img}</span>
      <span class="ci-name">${p.name}<small>${clp(shown(total))}${vol ? ' · <span class="vol">−8% volumen</span>' : ""}</small></span>
      <span class="qty"><button data-dec="${id}" aria-label="Quitar uno">−</button>${q}<button data-add="${id}" aria-label="Agregar uno">+</button></span>
    </li>`;
  }).join("") : '<li class="empty">Tu carro está vacío. Parte por un kit 👆</li>';

  const free = CONFIG.freeShipping[mode];
  const base = shown(gross);
  $("#freeFill").style.width = Math.min(100, (base / free) * 100) + "%";
  $("#freeMsg").textContent = base >= free ? "Tienes despacho gratis 🎉" : `Te faltan ${clp(free - base)} para despacho gratis`;

  let rows = "";
  if (savings > 0) rows += `<div><span>Ahorro por volumen</span><span>−${clp(shown(savings))}</span></div>`;
  if (mode === "empresa") {
    rows += `<div><span>Neto</span><span>${clp(base)}</span></div><div><span>IVA 19%</span><span>${clp(gross - base)}</span></div>`;
  }
  rows += `<div class="grand"><span>Total</span><span>${clp(gross)}</span></div>`;
  $("#totals").innerHTML = rows;
  $("#checkout").href = entries.length ? wsp(orderText()) : "#";
}

/* ---------- acciones ---------- */
function add(id, n = 1) {
  cart[id] = (cart[id] || 0) + n;
  if (cart[id] <= 0) delete cart[id];
  store.set("eem-cart", cart);
  renderCart();
}

function toast(msg) {
  const t = $("#toast");
  t.textContent = msg; t.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => t.classList.remove("show"), 2000);
}

function openCart(open) {
  $("#drawer").classList.toggle("open", open);
  $("#drawer").setAttribute("aria-hidden", !open);
  $("#overlay").classList.toggle("show", open);
}

function orderText() {
  const lines = Object.entries(cart).map(([id, q]) => `• ${q} x ${find(id).name} — ${clp(shown(lineTotal(id, q).total))}`);
  const { gross } = cartTotals();
  return `Hola En el Mapa 📍 Quiero hacer este pedido (${mode}):\n${lines.join("\n")}\nTotal: ${clp(gross)}${mode === "empresa" ? " (IVA incluido)" : ""}`;
}

function printQuote() {
  if (!Object.keys(cart).length) return toast("Agrega productos para cotizar");
  const { gross } = cartTotals();
  const rows = Object.entries(cart).map(([id, q]) => {
    const p = find(id), { total } = lineTotal(id, q);
    return `<tr><td>${p.name}</td><td>${q}</td><td>${clp(shown(total) / q)}</td><td>${clp(shown(total))}</td></tr>`;
  }).join("");
  const today = new Date().toLocaleDateString("es-CL");
  const w = window.open("", "_blank");
  if (!w) return toast("Tu navegador bloqueó la cotización. Permite ventanas emergentes.");
  w.document.write(`<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Cotización En el Mapa</title>
    <style>body{font-family:Inter,Arial,sans-serif;color:#0f3b43;padding:40px;max-width:800px;margin:auto}
    h1{margin:0}table{width:100%;border-collapse:collapse;margin:24px 0}th,td{text-align:left;padding:8px;border-bottom:1px solid #e9ddd1}
    th{background:#0f3b43;color:#fff}.r{text-align:right}.tot td{font-weight:700;border:0}small{color:#4d6469}</style></head><body>
    <h1>📍 En el Mapa</h1><small>Cotización · ${today} · válida por 7 días</small>
    <table><tr><th>Producto</th><th>Cant.</th><th>Unitario neto</th><th>Total neto</th></tr>${rows}
    <tr class="tot"><td colspan="3" class="r">Neto</td><td>${clp(shown(gross))}</td></tr>
    <tr class="tot"><td colspan="3" class="r">IVA 19%</td><td>${clp(gross - shown(gross))}</td></tr>
    <tr class="tot"><td colspan="3" class="r">Total</td><td>${clp(gross)}</td></tr></table>
    <small>Precios referenciales sujetos a disponibilidad. Despacho según comuna. Pago: transferencia, Webpay u orden de compra.</small>
    <script>window.onload=()=>window.print()<\/script></body></html>`);
  w.document.close();
}

function checkComuna(e) {
  e.preventDefault();
  const v = norm($("#comunaInput").value);
  if (!v) return;
  let idx = ZONES.findIndex((z) => z.comunas.some((c) => norm(c) === v));
  if (idx === -1) idx = ZONES.length - 1;
  document.querySelectorAll(".zones li").forEach((li, i) => li.classList.toggle("hit", i === idx));
  $("#comunaResult").textContent = `📍 ${$("#comunaInput").value.trim()}: ${ZONES[idx].name.toLowerCase()} (${ZONES[idx].detail.toLowerCase()}).`;
}

/* ---------- eventos ---------- */
document.addEventListener("click", (e) => {
  const t = e.target.closest("button, a");
  if (!t) return;
  if (t.dataset.add) {
    const wasEmpty = !cart[t.dataset.add];
    add(+t.dataset.add);
    if (!t.closest(".qty")) toast(wasEmpty ? `${find(t.dataset.add).name} agregado` : "Sumamos uno más");
  }
  if (t.dataset.dec) add(+t.dataset.dec, -1);
  if (t.dataset.modeBtn) {
    mode = t.dataset.modeBtn; store.set("eem-mode", mode);
    history.replaceState(null, "", mode === "empresa" ? "#empresa" : location.pathname);
    category = null; renderChips(); renderMode();
  }
  if (t.dataset.cat) {
    category = category === t.dataset.cat ? null : t.dataset.cat;
    $("#search").value = "";
    renderChips(); renderGrid();
    $("#catalogo").scrollIntoView({ behavior: "smooth" });
  }
  if (t.dataset.days) {
    freqDays = +t.dataset.days;
    document.querySelectorAll("#freq button").forEach((b) => b.classList.toggle("on", b === t));
    const d = new Date(Date.now() + freqDays * 864e5).toLocaleDateString("es-CL", { day: "numeric", month: "long" });
    $("#nextDelivery").textContent = `Próxima entrega: en ${freqDays} días (${d})`;
    updateRepoLink();
  }
});

$("#heroPrimary").addEventListener("click", (e) => {
  if (mode === "hogar") { e.preventDefault(); $("#listFile").click(); }
});
$("#listFile").addEventListener("change", (e) => {
  const f = e.target.files[0];
  if (!f) return;
  $("#fileNote").hidden = false;
  $("#fileNote").innerHTML = `✓ Recibimos “${f.name}”. <a href="${wsp("Hola, les envío mi lista para que me armen el carro 📸")}" target="_blank" rel="noopener"><u>Envíala por WhatsApp para recibir tu carro</u></a>`;
  toast("Lista recibida 📸");
});
$("#searchForm").addEventListener("submit", (e) => { e.preventDefault(); category = null; renderChips(); renderGrid(); $("#catalogo").scrollIntoView({ behavior: "smooth" }); });
$("#search").addEventListener("input", renderGrid);
$("#cartBtn").addEventListener("click", () => openCart(true));
$("#closeCart").addEventListener("click", () => openCart(false));
$("#overlay").addEventListener("click", () => openCart(false));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") openCart(false); });
$("#checkout").addEventListener("click", (e) => {
  if (!Object.keys(cart).length) { e.preventDefault(); toast("Tu carro está vacío"); }
});
$("#quoteBtn").addEventListener("click", printQuote);
function updateRepoLink() {
  const label = $("#freq .on").textContent.toLowerCase();
  $("#repoBtn").href = wsp(`Hola, quiero activar la reposición automática (${label}) de: papel higiénico y lo de siempre 🔁`);
}
$("#b2bBtn").href = wsp("Hola, quiero crear una cuenta empresa en En el Mapa 🏢");
$("#comunaForm").addEventListener("submit", checkComuna);
["#topWsp", "#footWsp"].forEach((s) => $(s).setAttribute("href", wsp("Hola En el Mapa 📍")));
$("#topWsp").target = $("#footWsp").target = "_blank";

/* ---------- inicio ---------- */
$("#comunasList").innerHTML = ZONES.flatMap((z) => z.comunas).map((c) => `<option value="${c}">`).join("");
$("#zones").innerHTML = ZONES.map((z) => `<li><span class="dot" style="background:${z.color}"></span><b>${z.name}</b><small>${z.comunas.length ? z.comunas.slice(0, 4).join(", ") + "…" : ""} ${z.detail}</small></li>`).join("");
renderChips();
renderMode();
updateRepoLink();
