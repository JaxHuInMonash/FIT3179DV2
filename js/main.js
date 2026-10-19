// Embeds every Vega-Lite specification on the page.
// Each spec lives in /specs as readable JSON; this file only supplies a shared theme.

const theme = {
  background: null,
  font: "Source Sans 3",
  view: { stroke: null },
  title: { font: "Fraunces", fontWeight: 600, color: "#1f1e1c" },
  axis: {
    labelFont: "Source Sans 3",
    titleFont: "Source Sans 3",
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
    labelFont: "Source Sans 3",
    titleFont: "Source Sans 3",
    labelColor: "#52514e",
    titleColor: "#1f1e1c",
    labelFontSize: 12,
    titleFontSize: 12.5,
    titleFontWeight: 600,
    titleLimit: 320
  },
  text: { font: "Source Sans 3" }
};

const charts = [
  { el: "#map-home-state", spec: "specs/map_home_state.vl.json" },
  { el: "#map-flows", spec: "specs/map_flows.vl.json" },
  { el: "#map-universities", spec: "specs/map_universities.vl.json" }
];

const options = {
  config: theme,
  actions: false,
  renderer: "svg",
  tooltip: { theme: "light" }
};

for (const { el, spec } of charts) {
  vegaEmbed(el, spec, options).catch((err) => {
    console.error(`Could not render ${spec}`, err);
    const node = document.querySelector(el);
    if (node) node.textContent = "This chart could not be loaded.";
  });
}
