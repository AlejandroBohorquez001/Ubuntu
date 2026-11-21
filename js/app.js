const CLAVE_ALMACENAMIENTO = "pagoclaro.registros";

const DATOS_PRUEBA = [
  { nombre: "Netflix", monto: 12.99, fechaPago: "2026-11-25", frecuencia: "mensual" },
  { nombre: "Spotify", monto: 10.99, fechaPago: "2026-12-02", frecuencia: "mensual" },
  { nombre: "Dominio web", monto: 15, fechaPago: "2027-01-15", frecuencia: "anual" }
];

function cargarRegistros() {
  const guardados = localStorage.getItem(CLAVE_ALMACENAMIENTO);
  if (!guardados) {
    localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(DATOS_PRUEBA));
    return [...DATOS_PRUEBA];
  }
  try {
    return JSON.parse(guardados);
  } catch {
    return [];
  }
}

function guardarRegistros(registros) {
  localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(registros));
}

function siguienteFecha(fechaPago, frecuencia) {
  const fecha = new Date(`${fechaPago}T00:00:00`);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const meses = frecuencia === "anual" ? 12 : 1;

  while (fecha < hoy) {
    fecha.setMonth(fecha.getMonth() + meses);
  }
  return fecha;
}

function formatearFecha(fecha) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(fecha);
}

function diasHasta(fecha) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const milisegundosPorDia = 24 * 60 * 60 * 1000;
  return Math.round((fecha - hoy) / milisegundosPorDia);
}

function renderizarProximosPagos() {
  const lista = document.getElementById("lista-proximos-pagos");
  const registros = cargarRegistros();

  const proximos = registros
    .map((registro) => ({ ...registro, proximaFecha: siguienteFecha(registro.fechaPago, registro.frecuencia) }))
    .sort((a, b) => a.proximaFecha - b.proximaFecha);

  lista.replaceChildren();

  if (proximos.length === 0) {
    const item = document.createElement("li");
    item.textContent = "No hay próximos pagos registrados.";
    lista.append(item);
    return;
  }

  proximos.forEach((registro) => {
    const dias = diasHasta(registro.proximaFecha);
    const textoDias = dias === 1 ? "1 día" : `${dias} días`;
    const item = document.createElement("li");
    item.textContent = `${registro.nombre} — ${registro.monto.toFixed(2)} € — ${formatearFecha(registro.proximaFecha)} (${registro.frecuencia}) — faltan ${textoDias}`;
    lista.append(item);
  });
}

document.getElementById("formulario-gasto").addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const montoTexto = document.getElementById("monto").value.trim();

  if (!nombre || montoTexto === "") {
    return;
  }

  const registro = {
    nombre,
    monto: Number(montoTexto),
    fechaPago: document.getElementById("fecha-pago").value,
    frecuencia: document.getElementById("frecuencia").value
  };

  const registros = cargarRegistros();
  registros.push(registro);
  guardarRegistros(registros);

  evento.target.reset();
  renderizarProximosPagos();
});

renderizarProximosPagos();
