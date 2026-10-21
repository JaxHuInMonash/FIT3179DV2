# FIT3179 Data Visualisation 2

Working repository for the Semester 2, 2026 assignment. The current brief is
[FIT3179 Data Visualisation 2 v1.2](<FIT3179 Data Visualisation 2_v1.2.pdf>).

Submission deadline in the brief: **Sunday 25 October 2026, 11:55 PM**.

## Project decisions

- Assigned topic: **4. Student Satisfaction** from Education & Student Life.
  Compare universities, study areas, and learning experiences to identify strengths
  and challenges, and investigate which aspects of university life students value.
- Campus and audience: Clayton; design for a general Australian audience.
- Sketch and tutor feedback: no sketch has been made. On 19 October 2026,
  the student reported that the tutor said this is fine. Develop the story and
  layout without an existing sketch as a constraint.
- Data foundation: QILT 2025 Student Experience Survey and Department of Education
  2024 student enrolment tables. See [data notes](data/README.md).
- Proposed story and chart selection: see [project plan](docs/PROJECT_PLAN.md).
  This is a working direction, not a finished design.

The checklist below records the written brief, including its sketch requirements.
The tutor's advice reported above is recorded separately; it does not establish
how sketch marks will be awarded.

## Requirements checklist

### Data and implementation

- [ ] Use accurate, reliable real-world data, with the most recent available datasets.
- [ ] Combine data from at least two different sources.
- [ ] Record sources, authors, URLs, dates, units, geographic coverage, and transformations.
- [ ] Build charts and maps with Vega or Vega-Lite. Other chart libraries require prior tutor approval.
- [ ] Keep each chart/map JSON specification readable and accessible in this repository.
- [ ] Keep downloadable data below a few megabytes, as required by the brief.

### Visualisation and story

- [ ] Include at least 10 charts. A small-multiples chart or a series of similar charts counts as one chart.
- [ ] Include at least three **different map idioms**, with appropriate projections.
- [ ] For the HD idioms criterion, plan **more than 10 charts** and **at least eight advanced idioms**, applied meaningfully.
- [ ] All map idioms count as advanced under v1.2. The brief classifies bars, stacked/grouped bars, dot plots, lines, areas, pies, scatterplots, and bubbles as basic.
- [ ] Build a logical narrative with informative annotations and concise explanations for a general audience.
- [ ] Add interaction where it helps the reader understand the story.
- [ ] Use consistent colour meanings, readable typography, aligned layouts, and whitespace.
- [ ] Follow the submitted sketch and retain the tutor's feedback.

### Page and publication

- [ ] Present the entire visualisation on one scrollable page, accessible from one public GitHub URL.
- [ ] Fit a small laptop screen without horizontal scrolling.
- [ ] Keep major sections on the page; do not use tabs/buttons to swap them out.
- [ ] Verify that the page and all embedded elements work without authentication.
- [ ] Include authorship, date, data/source credits, and acknowledgement of generative AI use.
- [ ] Use original charts and ensure permission to use external assets and data.

### Submission and interview

- [ ] Retain the original hand-drawn A4 sketch. The rubric awards zero sketch marks for a digitally created sketch.
- [ ] Publish a PDF containing the sketch image in the GitHub repository and verify its public URL.
- [ ] Complete the supplied assignment template with name, student ID, studio session, and visualisation URL.
- [ ] Explain the domain, why, who, what, and how, including data provenance and reasons for choosing the idioms.
- [ ] Include the sketch URL and a legible sketch screenshot in the template.
- [ ] Include a full-size screenshot of the finished visualisation in the template.
- [ ] Prepare for the Week 12 studio interview about the visualisation and Weeks 1–11 material.

## Next steps

1. Develop the proposed story into a page layout and confirm each chart's purpose.
2. Prepare map boundaries and document state grouping and university name matches.
3. Implement the page and separate Vega/Vega-Lite specifications.
4. Check data accuracy, interactions, readability, download size, and public access.
5. Complete the submission template and interview preparation.

## Site structure

| Path | Purpose |
| --- | --- |
| `index.html` | The single scrolling page (story, figures, credits). |
| `css/style.css` | Layout, typography (Fraunces + Source Sans 3) and colour roles. |
| `js/main.js` | Embeds each spec with vega-embed and a shared theme. |
| `specs/*.vl.json` | One readable Vega-Lite specification per chart. |
| `data/` | Prepared CSVs (see [data notes](data/README.md)); `data/geo/` holds boundaries and locations (see [geo notes](data/geo/README.md)). |

Built so far (21 Oct 2026): sections 1–3, eight charts: waffle small multiples, trend line,
choropleth, flow map, proportional-symbol map, heatmap, box plot and parallel coordinates.
Section 4 (dumbbell, support bars, isotype) is still placeholders.

`data/derived/key_measures_2025.csv` is produced by `scripts/derive_key_measures.py`
(rows copied unchanged from the national benchmark and belonging tables).

Preview locally (the specs load data over HTTP, so opening the file directly will not work):

```text
python -m http.server 8179
```

then open <http://localhost:8179>. Any free port works; 8000 is avoided because another local project uses it.

The configured remote is <https://github.com/JaxHuInMonash/FIT3179DV2>.
The submission template is
[DV2 Assignment Template v3.0](<DV2 - Assignment Template v3.0.docx>) (kept locally, not committed).
