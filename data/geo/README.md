# Geographic files

| File | Contents | Source |
| --- | --- | --- |
| `au_states.topojson` | Eight states and territories, simplified (15% of vertices), ~30 KB. Used by the national-scale maps. | [Natural Earth](https://www.naturalearthdata.com/) 1:10m admin-1 states and provinces (public domain), via the `nvkelso/natural-earth-vector` GitHub mirror. |
| `au_states_detailed.topojson` | The same boundaries without simplification, ~160 KB. Used by the university map so the coastline stays legible when zoomed to a city. | As above. |
| `state_anchors.csv` | One anchor point per state (its capital city) used as the end point of flow lines, plus a label position for the choropleth. | Capital-city coordinates; label positions chosen for legibility. |
| `university_locations.csv` | Main-campus coordinates for the 43 SES universities, a short display name, and the alias used to join the Department of Education enrolment table. | Compiled by hand on 19 October 2026. Coordinates are approximate (about 0.01°) and **should be checked against OpenStreetMap before submission**. |

Processing (mapshaper 0.6):

```text
filter adm0_a3 = AUS and the eight state/territory ISO codes (Jervis Bay Territory dropped)
merge Lord Howe Island into New South Wales  (-dissolve code)
-filter-islands min-area=1–2 km²
-simplify 15% keep-shapes   (au_states.topojson only)
-o format=topojson quantization=1e6
```

Notes

- Australian Catholic University is a multi-state provider. It is plotted at its North Sydney campus and labelled as multi-state.
- Australian University of Theology and University of Divinity have no single dominant teaching campus. Their points are approximate city locations.
- Maps use an Albers equal-area conic projection with standard parallels 18°S and 36°S, centred on 132°E, the usual projection for national maps of Australia.
