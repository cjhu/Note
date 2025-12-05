# Note Diff Prototype

Standalone React prototype that renders a unified, single-panel diff view for medical notes. The default view shows only the latest text; toggling "Show changes" overlays inline markers for additions, deletions, and replacements. Hover/tap reveals tooltips without reflow.

## Quick start

```bash
cd note-diff-prototype
npm install
npm run dev
```

Then open the URL printed by Vite (default http://localhost:5173).

## Components

- `NoteDiffView` — splits base text and renders diff markers when `showDiff` is true.
- `DiffSegment` — inline marker for add/delete/replace, with hover/tap + keyboard support.
- `DiffTooltip` — portal tooltip positioned above/below without reflow.
- `DeletedPlaceholder` — 2px inline placeholder for deleted text.
- `noteDiffUtils` — splits base text into renderable segments.

`NoteDiffExample` wires in sample data and a "Show changes" toggle.

