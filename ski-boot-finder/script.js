/* =========================
   SKI BOOT FINDER
   Boot model data is based on the supplied spreadsheet.
   Flex ratings are not yet available, so flex is a preference
   only and does not currently filter the model suggestions.
========================= */

const bootDataByLast = {
  96: {
    models: ["Salomon S/Pro Race", "Atomic Remedy 110"],
    volumeNote: "Race / narrow"
  },
  97: {
    models: [],
    volumeNote: "Low volume (LV)"
  },
  98: {
    models: [
      "Salomon S/Pro Alpha",
      "K2 Cortex",
      "Atomic Hawx Ultra",
      "Fischer RC4 LV Vac",
      "Nordica Promachine"
    ],
    volumeNote: "Low volume (LV)"
  },
  99: {
    models: [
      "K2 Revolve",
      "Dalbello Veloce",
      "Dalbello Cabrio Free",
      "Tecnica Zero G Decoy"
    ],
    volumeNote: "Low to medium volume"
  },
  100: {
    models: [
      "Salomon S/Pro Supra",
      "K2 Recon",
      "K2 Anthem",
      "K2 Mindbender",
      "Armada AR One",
      "Atomic Nexus",
      "Atomic Hawx Prime",
      "Dalbello",
      "Dalbello Veloce",
      "Dalbello Cabrio MV",
      "Fischer RC4 Carbon Pro",
      "Fischer RC4 MV Vac",
      "Head Kaliber",
      "Nordica Speedmachine",
      "Rossignol Vizion 48 Pro",
      "Rossignol Pure Pro",
      "Tecnica Mach 1"
    ],
    volumeNote: "Medium volume (MV)"
  },
  101: {
    models: ["Atomic Nexus", "Dalbello Veloce Space"],
    volumeNote: "Medium volume (MV)"
  },
  102: {
    models: [
      "Salomon S/Pro Delta",
      "K2 BFC",
      "Atomic Nexus",
      "Atomic Hawx Magna",
      "Fischer Premio",
      "Head Edge",
      "Nordica HF Rear Entry",
      "Phaenom FS 01",
      "Rossignol Pure"
    ],
    volumeNote: "High volume (HV); Nordica describes its fit as medium-wide"
  },
  103: {
    models: ["K2 BFC"],
    volumeNote: "High volume (HV); Lange describes its fit as comfort volume"
  },
  104: {
    models: [],
    volumeNote: "Wide"
  }
};

// Reference widths at each mondo size, taken from size-width-chart.
const referenceWidthBySize = {
  "20/20.5": 88,
  "21/21.5": 90,
  "22/22.5": 92,
  "23/23.5": 94,
  "24/24.5": 96,
  "25/25.5": 98,
  "26/26.5": 100,
  "27/27.5": 102,
  "28/28.5": 104,
  "29/29.5": 106,
  "30/30.5": 108
};

// The volume chart places LV 2 mm below, MV at, and HV 2 mm
// above the reference width for the selected mondo size.
const volumeOffset = { LV: -2, MV: 0, HV: 2 };

const form = document.querySelector("#boot-finder-form");
const sizeSelect = document.querySelector("#boot-size");
const volumeSelect = document.querySelector("#volume");
const flexSelect = document.querySelector("#flex");
const results = document.querySelector("#results");
const resetButton = document.querySelector("#reset-button");

function getFlexLabel(value) {
  const option = flexSelect.querySelector(`option[value="${value}"]`);
  return option ? option.textContent : "Not specified";
}

function renderEmptyState() {
  results.innerHTML = `
    <div class="empty-state">
      <div class="empty-icon" aria-hidden="true">⌕</div>
      <h2>Your recommendations will appear here</h2>
      <p>Select your preferences above and choose <strong>Find my ski boots</strong>.</p>
    </div>
  `;
}

function renderNoMatch(targetWidth, size, volume, flexLabel) {
  results.innerHTML = `
    <div class="results-heading">
      <h2>Your boot-fit starting point</h2>
      <p>${size} · ${volume} · ${flexLabel}</p>
    </div>
    <div class="no-match">
      <h3>No model list is available for a ${targetWidth} mm last yet.</h3>
      <p>The spreadsheet contains model suggestions from 96 mm to 104 mm, but no models are listed at this exact width. We can expand the source data when you provide more boot information.</p>
    </div>
    ${renderFlexNotice()}
  `;
}

function renderFlexNotice() {
  return `
    <div class="notice">
      <strong>About flex recommendations</strong>
      <p>Flex is included in your preferences, but the source spreadsheet does not currently provide flex ratings for individual models. The boots shown are matched by the size-and-volume width calculation only. Please check each model's flex with the manufacturer or a boot fitter.</p>
    </div>
  `;
}

function renderResults({ size, volume, flex, targetWidth }) {
  const exactMatch = bootDataByLast[targetWidth];

  if (!exactMatch || exactMatch.models.length === 0) {
    renderNoMatch(targetWidth, size, volume, getFlexLabel(flex));
    return;
  }

  const models = exactMatch.models
    .map(model => `<li>${model}</li>`)
    .join("");

  results.innerHTML = `
    <div class="results-heading">
      <h2>Boots to explore</h2>
      <p>Based on ${size}, ${volume} and a calculated ${targetWidth} mm reference last.</p>
    </div>

    <article class="result-card">
      <div class="result-top">
        <div>
          <h3>${targetWidth} mm reference last</h3>
          <p class="result-note">${exactMatch.volumeNote}</p>
        </div>
        <span class="width-tag">Exact width match</span>
      </div>
      <ul class="boot-list">${models}</ul>
      <p class="result-note">These are the models listed against ${targetWidth} mm in your spreadsheet. Individual model fit and availability should be checked before making a choice.</p>
    </article>

    <div class="notice">
      <strong>Your flex preference: ${getFlexLabel(flex)}</strong>
      <p>Flex has been recorded but has not been used to filter these models because individual boot flex ratings are not yet included in the source data.</p>
    </div>
    ${renderFlexNotice()}
  `;
}

form.addEventListener("submit", event => {
  event.preventDefault();

  const size = sizeSelect.value;
  const volume = volumeSelect.value;
  const flex = flexSelect.value;

  if (!size || !volume || !flex) {
    form.reportValidity();
    return;
  }

  const referenceWidth = referenceWidthBySize[size];
  const targetWidth = referenceWidth + volumeOffset[volume];

  renderResults({ size, volume, flex, targetWidth });
});

resetButton.addEventListener("click", () => {
  form.reset();
  renderEmptyState();
  sizeSelect.focus();
});
