// Embeds every Vega-Lite specification on the page.
// Each spec lives in /specs as readable JSON; this file only supplies a shared theme.

// Font names that end in a number must be quoted inside the font string,
// or Vega's text measurement falls back to another font and truncates labels.
const SANS = '"Source Sans 3", "Segoe UI", sans-serif';

const theme = {
  background: null,
  font: SANS,
  view: { stroke: null },
  title: { font: "Fraunces", fontWeight: 600, color: "#1f1e1c" },
  axis: {
    labelFont: SANS,
    titleFont: SANS,
    labelColor: "#52514e",
    titleColor: "#52514e",
    labelFontSize: 12,
    titleFontSize: 12,
    titleFontWeight: 600,
    gridColor: "#e1e0d9",
    domainColor: "#c3c2b7",
    tickColor: "#c3c2b7"
  },
  legend: {
    labelFont: SANS,
    titleFont: SANS,
    labelColor: "#52514e",
    titleColor: "#1f1e1c",
    labelFontSize: 12,
    titleFontSize: 12.5,
    titleFontWeight: 600,
    titleLimit: 320
  },
  text: { font: SANS }
};

const charts = [
  { el: "#chart-waffle", spec: "specs/waffle_measures.vl.json" },
  { el: "#chart-trend", spec: "specs/trend_overall_belonging.vl.json" },
  { el: "#map-home-state", spec: "specs/map_home_state.vl.json" },
  { el: "#map-flows", spec: "specs/map_flows.vl.json" },
  { el: "#map-universities", spec: "specs/map_universities.vl.json" },
  { el: "#chart-heatmap", spec: "specs/heatmap_study_areas.vl.json" },
  { el: "#chart-box", spec: "specs/boxplot_universities.vl.json" },
  { el: "#chart-parallel", spec: "specs/parallel_universities.vl.json" },
  { el: "#chart-groups", spec: "specs/dumbbell_student_groups.vl.json" },
  { el: "#chart-support", spec: "specs/bullet_support.vl.json" },
  { el: "#chart-leaving", spec: "specs/isotype_leaving.vl.json" }
];

const options = {
  config: theme,
  actions: false,
  renderer: "svg",
  tooltip: { theme: "light" },
  // Always fetch the latest spec and data files instead of a cached copy, so
  // edits show up on a normal refresh (the files are small, so this costs little).
  loader: { http: { cache: "no-store" } }
};

const views = {};

// Vega measures label widths when it draws, so wait for the web fonts first;
// otherwise labels are truncated using the fallback font's (wider) metrics.
const fontsReady = Promise.all([
  document.fonts.load('400 12px "Source Sans 3"'),
  document.fonts.load('600 12px "Source Sans 3"'),
  document.fonts.load('700 24px "Fraunces"')
]).catch(() => null).then(() => document.fonts.ready);

const embedded = charts.map(({ el, spec }) =>
  fontsReady.then(() => vegaEmbed(el, spec, options))
    .then((result) => { views[el] = result.view; })
    .catch((err) => {
      console.error(`Could not render ${spec}`, err);
      const node = document.querySelector(el);
      if (node) node.textContent = "This chart could not be loaded.";
    })
);

// Keep "University A" in the parallel-coordinates chart and the highlighted
// university in the box plot in step, in both directions.
function linkSignal(name, elA, elB) {
  const a = views[elA];
  const b = views[elB];
  if (!a || !b) return;
  let syncing = false;
  const copy = (from, to) => (_, value) => {
    if (syncing || to.signal(name) === value) return;
    syncing = true;
    to.signal(name, value).runAsync().finally(() => { syncing = false; });
    const select = document.querySelector(`${to === a ? elA : elB} select[name="${name}"]`);
    if (select) select.value = value;
  };
  a.addSignalListener(name, copy(a, b));
  b.addSignalListener(name, copy(b, a));
}

// On the university map, picking a new area in "Zoom to" starts again at 1x zoom.
function resetZoomOnFocus(el) {
  const view = views[el];
  if (!view) return;
  view.addSignalListener("focus", () => {
    if (view.signal("zoom") === 1) return;
    view.signal("zoom", 1).runAsync();
    const slider = document.querySelector(`${el} input[name="zoom"]`);
    if (slider) {
      slider.value = 1;
      const shown = slider.parentNode.querySelector(".vega-bind-value");
      if (shown) shown.textContent = "1";
    }
  });
}

Promise.all(embedded).then(() => {
  linkSignal("pick", "#chart-box", "#chart-parallel");
  resetZoomOnFocus("#map-universities");
});
