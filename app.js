document.addEventListener('DOMContentLoaded', () => {

  const productos = {
    basicas: [
      { name: 'Cuello Redondo Caballero', sub: 'TCOMADC · 100% Alg. 180g', costo: 40.50 },
      { name: 'Cuello Redondo Dama', sub: 'THEADAM · 100% Alg. 180g', costo: 40.50 },
      { name: 'Cuello Redondo Infantil', sub: 'TKIDCHC · 100% Alg. 180g', costo: 26.00 },
      { name: 'Cuello V Dama / Caballero', sub: 'TDMACVT/THEACVA · 100% Alg.', costo: 46.00 },
      { name: 'Cuello Redondo Premium', sub: 'TCOMAPR · 50% Pol. 50% Alg.', costo: 55.00 },
      { name: 'Cuello Redondo Bebe', sub: '100% Alg. 180g · 1-3 años', costo: 32.00 },
      { name: 'Oversize', sub: 'TCOMOVE · 100% Alg. 200g', costo: 78.00 },
      { name: 'Tank Top Unisex', sub: 'THEACAM · 100% Alg. 180g', costo: 39.50 },
    ],

    premium: [
      { name: 'Mineral Wash Manga Corta', sub: 'TFCOMWA · 100% Alg. 180g', costo: 86.50 },
      { name: 'Mineral Wash Manga Larga', sub: 'TFCOMWA · 100% Alg. 180g', costo: 80.00 },
      { name: 'Manga Larga Unisex', sub: 'THEAMLA · 100% Alg. 185g', costo: 58.00 },
      { name: 'Playera Sin Manga', sub: 'TMUSC01 · 32% Pol. 68% Alg.', costo: 44.50 },
      { name: 'Dry Tech Caballero', sub: 'TDRYCAB · 100% Poliéster 175g', costo: 78.00 },
      { name: 'Sublim Dama / Caballero', sub: 'TSUBDCR/TSUBCCR · 100% Pol.', costo: 59.50 },
    ],

    otros: [
      { name: 'Sudadera con Capucha', sub: 'TSUDCPP · 32% Pol. 68% Alg.', costo: 168.00 },
      { name: 'Sudadera Cuello Redondo', sub: 'TSUDRED · 32% Pol. 68% Alg.', costo: 135.00 },
      { name: 'Polo Dama / Caballero', sub: 'TPOLPRC/TPOLPRD · 50/50', costo: 85.00 },
      { name: 'Camisa Gabardina', sub: 'TCAMDLG/TCAMCLG · 60/40', costo: 330.00 },
      { name: 'Camisa Oxford', sub: 'TCAMDLX/TCAMCLX · 60/40', costo: 330.00 },
    ],

    gorras: [
      { name: 'Gorra Acrilana', sub: 'Mayoreo BND', costo: 33.50 },
      { name: 'Gorra Malla/Espuma', sub: 'Mayoreo BND', costo: 39.50 },
      { name: 'Gorra Gabardina', sub: 'Mayoreo BND', costo: 49.50 },
      { name: 'Gorra Plana', sub: 'Mayoreo BND', costo: 60.00 },
    ],
  };

  function roundSell(raw) {
    return Math.ceil(raw / 10) * 10 - 1;
  }

  function calcRow(costoFab, dtf, margin, esGorra) {
    const costoTotal = costoFab + (esGorra ? 0 : dtf);
    const sellRaw = costoTotal / (1 - margin / 100);
    const sell = roundSell(sellRaw);
    const profit = sell - costoTotal;

    return {
      costoTotal,
      sell,
      profit
    };
  }

  function buildTableRows(cat, dtf, margin) {

    return productos[cat].map(p => {

      const { costoTotal, sell, profit } =
        calcRow(p.costo, dtf, margin, false);

      return `
        <tr>
          <td>
            <div class="prod-name">${p.name}</div>
            <div class="prod-sub">${p.sub}</div>
          </td>

          <td>
            <span class="chip chip-cost">
              $${costoTotal.toFixed(0)}
            </span>
          </td>

          <td>
            <span class="chip chip-profit">
              $${Math.round(profit)}
            </span>
          </td>

          <td>
            <span class="chip chip-sell">
              $${sell}
            </span>
          </td>
        </tr>
      `;

    }).join('');
  }

  function buildGorras(dtf, margin) {

    return productos.gorras.map(p => {

      const { sell, profit } =
        calcRow(p.costo, dtf, margin, true);

      return `
        <div class="gorra-card">

          <div class="gc-name">${p.name}</div>
          <div class="gc-sub">${p.sub}</div>

          <div class="gc-row">
            <span>Costo fábrica</span>
            <span>$${p.costo.toFixed(2)}</span>
          </div>

          <div class="gc-row">
            <span>Ganancia</span>
            <span>$${Math.round(profit)}</span>
          </div>

          <div class="gc-sell">
            <span class="gc-sell-label">
              Precio de venta
            </span>

            <span class="gc-sell-val">
              $${sell}
            </span>
          </div>

        </div>
      `;

    }).join('');
  }

  function render() {

    const dtf = parseInt(document.getElementById('dtfCost').value);
    const margin = parseInt(document.getElementById('marginPct').value);

    document.getElementById('dtfLabel').textContent = `$${dtf} MXN`;
    document.getElementById('marginLabel').textContent = `${margin}%`;

    ['basicas', 'premium', 'otros'].forEach(cat => {

      document.getElementById('tbody-' + cat).innerHTML =
        buildTableRows(cat, dtf, margin);

    });

    document.getElementById('grid-gorras').innerHTML =
      buildGorras(dtf, margin);
  }

  window.showTab = function(id, el) {

    document.querySelectorAll('.section')
      .forEach(s => s.classList.remove('active'));

    document.querySelectorAll('.tab')
      .forEach(t => t.classList.remove('active'));

    document.getElementById(id).classList.add('active');
    el.classList.add('active');
  };

  const dtfInput = document.getElementById('dtfCost');
  const marginInput = document.getElementById('marginPct');

  if (dtfInput && marginInput) {

    dtfInput.addEventListener('input', render);
    marginInput.addEventListener('input', render);

    render();

  } else {

    console.error('No se encontraron los inputs dtfCost o marginPct');

  }
// ===== LOADER =====

const loader = document.getElementById('loader');

function showLoader(){

  loader.classList.add('show');
//ok
  setTimeout(() => {
    loader.classList.remove('show');
  }, 900);

}

// botones tabs
document.querySelectorAll('button').forEach(btn => {

  btn.addEventListener('click', () => {

    showLoader();

  });

});


});