# Australian university student satisfaction

Working direction, 17 October 2026. Topic 4 is confirmed; Clayton is the campus,
so the intended reader is a general Australian audience.

## Story proposal

Working title: **The university experience**.

Central question: **Where does Australian university life meet students'
expectations, and where are the gaps?**

Guide readers from the national picture to differences between universities and
study areas, then to the everyday experiences behind those differences. Use
geography to explain the study landscape. Keep the main population as university
undergraduates and offer postgraduate coursework as a clearly labelled comparison.

The published university tables support these starting observations:

- Overall educational experience: 76.2% positive in 2025, compared with 78.4% in 2019.
- Learning resources: 83.9% positive; teaching: 80.0%; student support: 70.4%;
  peer engagement: 59.9% in 2025.
- Sense of belonging: 46.3% positive in 2025, compared with 50.8% in 2019.

These are different measures and may have different response bases. Their gaps
suggest questions to investigate; they do not establish causes or importance.
Exact source cells are retained in the prepared CSVs and worksheet notes in
`data/sources.json`.

## What why and how

**What:** published survey percentages, uncertainty intervals, years, universities,
study areas and student groups, supplemented by administrative enrolment counts
and state relationships. See `data/README.md` for scope and limitations.

**Why:** help prospective students and the public understand differences in the
reported student experience, recognise common strengths and challenges, and ask
better questions about teaching, support and connection.

**How:** one scrollable narrative page with short sections, informative titles,
annotations and a consistent colour system. Interaction should support a few
clear comparisons rather than expose every possible filter at once.

## Initial chart plan

This is a feasibility plan, not a requirement to retain every chart. Each chart
must answer a distinct question. The eight entries marked advanced are candidate
idioms under the brief's definition; the final implementation and tutor's
interpretation determine whether they satisfy the rubric.

| Section | Reader question | Candidate idiom | Data | Complexity |
| --- | --- | --- | --- | --- |
| 1 The national experience | How common is a positive overall experience? | Waffle with exact percentage alongside the rounded tiles | University benchmark, 2025 | Advanced candidate |
| 1 The national experience | How have overall experience and belonging changed? | Annotated line chart | University benchmark and belonging, 2017–2025 | Basic |
| 2 The study landscape | How do university scores vary across administrative state groups? | Choropleth of median university overall rating, with institution count visible | SES joined to institution state | Advanced map 1 |
| 2 The study landscape | Where are enrolments concentrated? | Proportional-symbol map at state anchors | Published 2024 institution enrolments grouped by state | Advanced map 2 |
| 2 The study landscape | How do home and institution states connect? | Flow map | Home–institution state matrix, excluding unpublished links | Advanced map 3 |
| 3 Different experiences | Which study areas share strengths and challenges? | Heatmap | 21 study areas × experience measures | Advanced candidate |
| 3 Different experiences | How do a few selected universities' experience profiles differ? | Parallel-coordinates plot with direct labels and selection highlighting | University measures, 2025 | Advanced candidate |
| 3 Different experiences | Which measures vary most between universities? | Box plot with individual university points and plain-language explanation | University measures, 2025 | Advanced candidate |
| 4 The everyday experience | How do commencing and later-year students differ? | Dumbbell chart | University student-group measures | Do not rely on this for the advanced count |
| 4 The everyday experience | Which support services receive stronger helpfulness ratings? | Ranked bars | Individual support items, selected study stage | Basic |
| 4 The everyday experience | What reasons are cited by students who considered leaving? | Ranked bars with the denominator in the subtitle | University leaving reasons, 2025 | Basic |
| 4 The everyday experience | How large are the institutions behind these comparisons? | Treemap, with focus on selected universities | 2024 named institution enrolments | Advanced candidate |

The two ranked bar charts are different tasks but similar charts. Because the
brief says a series of similar charts can count as one, this plan contains 12
views but must be audited before relying on it for the HD “more than 10” count.
Replace a redundant view or add a genuinely different task/idiom if necessary.
Do not count summary cards, controls, or small-multiple panels as extra charts.

## Map decisions to resolve during design

- The choropleth would show the **median of university-level percentages**, not
  the percentage of students satisfied in a state. Every university receives equal
  weight. Label this prominently and show how many institutions contribute.
- Join on institution names using the documented aliases. Keep Australian
  University of Theology unmatched and Australian Catholic University in the
  separate Multi-State group. Display exclusions rather than silently dropping them.
- For a satisfaction choropleth, use a perceptually ordered sequential palette.
  Do not imply statistically significant differences through arbitrary categories.
- State enrolment counts are context only and cannot weight the survey results.
  Counts for named institutions exclude aggregated non-university rows; choose and
  label the final provider scope explicitly.
- Use Australian map boundaries from a verified, reusable source and an appropriate
  Australian projection. Obtain and simplify the boundary data before implementation.
- Permanent-home-state links describe administrative affiliations, not migration
  or actual campus attendance. Handle Multi-State destinations separately.
- Keep the maps in one concise geographic section so the page remains focused
  on satisfaction. If the geographic section distracts from the story, revise it
  before implementation rather than padding the page with maps.

## Interaction and visual direction

- Default to undergraduates. Explain the change of population when switching level.
- Make university selection searchable and offer a few clear comparisons.
- Use tooltips for exact percentages, survey year, source and uncertainty.
- Keep major sections visible in one scrollable page. Use anchor links only for
  scrolling, with all charts accessible without navigating to another page.
- Use a restrained palette, readable type and direct labels. Reserve emphasis
  for the selected institution or a specific finding supported by the data.
- Review the design at small laptop width. Avoid nested scrolling within charts.

## Remaining work

1. Develop the layout and refine the chart count and distinct idioms.
2. Confirm reuse terms, obtain geographic boundaries and validate the institution join.
3. Finish the map aggregations and their definitions without suppressing limitations.
4. Build the page with readable Vega/Vega-Lite JSON files and real prepared data.
5. Verify figures against source cells, chart behaviour, loading and public access.
6. Complete the submission description, screenshots, AI acknowledgement and interview preparation.

The research and data preparation are complete enough to begin design. The website,
maps, final narrative and submission materials have not yet been built.

## Revision, 19 October 2026: maps built

The three map views now exist in `specs/`:

| Map | Idiom | Question | Interaction |
| --- | --- | --- | --- |
| `map_home_state` | Choropleth | What share of each state's students enrol with a home-state institution? | Hover highlight and tooltip |
| `map_flows` | Flow map | Where do interstate enrolments go, and where do they come from? | State selector and in/out toggle |
| `map_universities` | Proportional-symbol map | How does each university's overall rating compare with the national average, and how big is it? | Undergraduate/postgraduate toggle and city zoom |

Changes from the initial plan:

- The state choropleth of median university ratings was dropped. Tasmania and the
  NT have one university each and the ACT has two, so those areas would show one
  or two scores, not a state picture. The choropleth now maps `same_state_pct`, a true per-state rate.
- The proportional-symbol map now places each university at its main campus, with
  size = 2024 enrolments at the selected level (bachelor or postgraduate coursework)
  and colour = 2025 overall experience minus the national university benchmark
  (76.2% UG, 77.1% PGC). This combines both sources in one view and replaces the treemap.

Advanced-idiom tally (target at least 8, with spares): choropleth, flow map,
proportional-symbol map, waffle, heatmap, box plot, parallel coordinates, plus
**two spares to add**: an isotype chart of leaving reasons, and one more distinct
idiom (e.g. a bullet chart or beeswarm). Basic charts: trend line, dumbbell, ranked bars.
