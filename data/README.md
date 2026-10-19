# Student satisfaction data

The CSV files were extracted from official published tables on 19 October 2026.
They contain real observations and published aggregates. Source workbooks are
unchanged. No visualisation has been implemented yet.

## Sources

1. [QILT Student Experience Survey](https://www.qilt.edu.au/surveys/student-experience-survey-(ses)):
   2025 National Report Tables, published September 2026, produced by the Social
   Research Centre for the Australian Government Department of Education.
   [Download the official tables](https://www.qilt.edu.au/docs/default-source/default-document-library/ses_2025_national_report_tables.zip?sfvrsn=1811247e_1).
2. [Department of Education 2024 Section 2 All Students](https://www.education.gov.au/higher-education-statistics/resources/2024-section-2-all-students):
   administrative enrolment data published September 2025. The Department's
   [student data index](https://www.education.gov.au/higher-education-statistics/student-data)
   listed 2024 as its latest annual student release when checked.

QILT and ComparED display the same underlying survey collection. They must not
be presented as two independent datasets. The administrative enrolment collection
provides the second dataset here, although both collections are government funded.
Record and verify reuse terms before publishing.

## Files

| File | Contents | Records |
| --- | --- | ---: |
| `university_scores.csv` | 43 universities, undergraduate and postgraduate coursework; six measures in 2025 and overall experience in 2017–2024 | 1,204 |
| `national_benchmarks.csv` | Six measures by provider type, course level and year, 2017–2025 | 324 |
| `study_area_scores.csv` | Six measures for 21 study areas plus the overall row, universities only, 2025 | 264 |
| `student_group_scores.csv` | Measures by student characteristics, universities only, 2025 | 372 |
| `belonging_trends.csv` | Sense of belonging by provider type and course level, 2017–2025 | 54 |
| `experience_items.csv` | Individual teaching, support, resource and peer items by stage, universities only, 2025 | 180 |
| `leaving_reasons.csv` | Reasons cited by students who considered leaving, universities only, 2017–2025 | 738 |
| `institution_enrolments.csv` | Published named institution rows by course level and registered state, 2024 | 43 |
| `home_institution_flows.csv` | Permanent home location versus institution state, including outside Australia, unknown home location and Multi-State institutions | 90 |
| `home_state_shares.csv` | Percentage associated with an institution in the same state as permanent home residence | 8 |

The ten CSVs total 349,900 bytes. `sources.json` contains source URLs, SHA-256
hashes, metric labels, output counts and verbatim worksheet notes. Survey values
include `source_sheet` and `source_cell`; enrolments identify the source row.

## Definitions and comparisons

- `positive_pct` is on a **0–100 scale**. For example, 76.2 means 76.2%, not 0.762.
- Blank numeric fields are unavailable or unpublished. Read `status`; never
  interpret blanks as zero. Published suppression markers are preserved.
- `ci_low` and `ci_high` are published 90% confidence interval bounds where
  available. They describe survey uncertainty and should be retained in tooltips
  or suitable explanations. Do not treat small score differences as definitive ranks.
- A lower positive rating does not necessarily mean every other respondent was
  dissatisfied. Do not relabel the complement as dissatisfaction without verifying
  the questionnaire denominator and response options.
- The main story should default to **undergraduates at universities**. Select
  `provider_type = Universities` for national benchmarks and belonging trends.
  The university overall experience benchmark is 76.2% in 2025; 76.5% is the
  broader undergraduate benchmark including non-university providers.
- QILT changed the Peer Engagement and Student Support measures in 2023.
  Keep the change visible in any historical comparison; prefer 2023 onwards
  for those measures. Preserve the source notes for the other 2023 changes too.
- Study areas and demographic categories overlap. Do not add their percentages
  together. Double-degree courses can appear in more than one study area.
- Most demographic categories include domestic and onshore international students.
  Some equity and geographic groups have narrower coverage; consult the worksheet
  notes retained in `sources.json` before writing labels.
- Support-item denominators and response wording differ from the composite
  support indicator. Do not compare them to a composite benchmark as equivalent
  measures. Preserve the source item wording and study stage.
- Reasons for considering leaving are multiple-response percentages **among those
  who considered leaving**. They are not percentages of all students, actual
  dropout rates, or a composition summing to 100%.
- Satisfaction, helpfulness and engagement ratings do not directly measure
  which experiences students consider most important. Do not call their order a
  ranking of what students value. Use a direct importance measure if one is found.
- University-level relationships between teaching and overall scores are
  descriptive associations. Overall experience is also part of the teaching
  measure, so the two are not independent measures for causal claims.

## Geography and enrolment limitations

- Department enrolments are from **2024**, while current satisfaction scores are
  from **2025**. They describe different populations and periods. Enrolment totals
  include students and course levels outside the SES scope, including offshore
  students. Do not use them as survey denominators or weights.
- Institution state is an administrative classification. It is not necessarily
  the campus attended, the location of teaching or the student's current residence.
  Keep Multi-State institutions separate rather than forcing them into one state.
- Home-to-institution links do not prove relocation, commuting, or physical travel.
  A flow map must say **permanent home state to institution state**.
- `same_state_pct` is `100 × published same-state count / published home-state total`.
  The denominator retains Multi-State institutions. Its complement combines other
  states and Multi-State providers; it must not be labelled an interstate migration rate.
- Flow cells marked `np` stay unavailable. Do not reconstruct them from totals.
- Institution aliases used for matching: remove source footnote markers and a
  leading “The”; match CQUniversity to Central Queensland University and Torrens
  University Australia to Torrens University. No institution merger is applied.
- Australian University of Theology has 2025 survey results but no named 2024
  enrolment row in this table. Keep its satisfaction results and mark the join
  unavailable. Batchelor has enrolment data but is not one of the 43 SES university rows.
- The 2025 survey separately reports the University of Adelaide and the University
  of South Australia. Retain those historical names rather than inventing a
  combined Adelaide University score following the January 2026 merger.
- The Department warns that a cyber-security incident may affect the quality of
  University of Notre Dame's 2024 enrolment data. Preserve that qualification.

## Reproduce

The extractor requires Python and `openpyxl`, reads cached source workbooks and
produces CSV and JSON outputs. It does not author or modify Excel workbooks.

```text
python scripts/prepare_data.py --download
```

Alternatively, pass `--source-dir` pointing to a folder containing the two source
filenames listed in `sources.json`. Downloads default to `data/raw/`, which is
excluded from Git. The website should load the compact CSVs rather than the
original archive. Serve data files through HTTP when building the page.
