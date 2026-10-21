"""Combine the 2025 national university benchmarks (six SES measures) with
sense of belonging into one small file for the waffle chart.

Inputs:  data/national_benchmarks.csv, data/belonging_trends.csv
Output:  data/derived/key_measures_2025.csv
Values are copied unchanged; only rows are selected and labelled.
"""
import csv
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "data"
LABELS = {
    "resources": ("Learning resources", "Libraries, IT, teaching spaces and course materials"),
    "skills": ("Skills development", "Thinking, writing, problem-solving and work-ready skills"),
    "teaching": ("Teaching quality", "Clear, engaging and helpful teaching"),
    "overall": ("Overall experience", "Overall quality of the educational experience"),
    "support": ("Student support", "Help with study, careers, health and admin"),
    "peer_engagement": ("Peer engagement", "Studying and connecting with other students"),
    "belonging": ("Sense of belonging", "Feeling part of the university community"),
}

rows = []
with open(ROOT / "national_benchmarks.csv", newline="", encoding="utf-8") as f:
    for r in csv.DictReader(f):
        if (r["provider_type"], r["level"], r["year"]) == ("Universities", "Undergraduate", "2025"):
            rows.append((r["metric"], r["positive_pct"], "national_benchmarks.csv", r["source_sheet"], r["source_cell"]))
with open(ROOT / "belonging_trends.csv", newline="", encoding="utf-8") as f:
    for r in csv.DictReader(f):
        if (r["provider_type"], r["level"], r["year"]) == ("Universities", "Undergraduate", "2025"):
            rows.append(("belonging", r["positive_pct"], "belonging_trends.csv", r["source_sheet"], r["source_cell"]))

rows.sort(key=lambda x: -float(x[1]))
out = ROOT / "derived" / "key_measures_2025.csv"
out.parent.mkdir(exist_ok=True)
with open(out, "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f, lineterminator="\n")
    w.writerow(["rank", "metric", "label", "explanation", "positive_pct", "year", "level", "provider_type", "from_file", "source_sheet", "source_cell"])
    for i, (m, v, src, sheet, cell) in enumerate(rows, 1):
        w.writerow([i, m, LABELS[m][0], LABELS[m][1], v, 2025, "Undergraduate", "Universities", src, sheet, cell])
print(f"wrote {out} ({len(rows)} rows)")
