/**
 * Builds render segments from baseText and diff metadata.
 * baseText is the latest note text; diffs are sorted and non-overlapping.
 */
export function computeNoteSegments(baseText, diffs = []) {
  // Ensure diffs are processed in order to avoid overlapping/duplicate rendering
  const orderedDiffs = [...diffs].sort((a, b) => (a.startIndex ?? 0) - (b.startIndex ?? 0));
  const segments = [];
  let cursor = 0;

  orderedDiffs.forEach((diff) => {
    const { startIndex, endIndex, newText } = diff;

    // Push unchanged text before the diff
    if (startIndex > cursor) {
      segments.push({
        kind: 'text',
        text: baseText.slice(cursor, startIndex),
      });
    }

    if (diff.type === 'delete') {
      segments.push({
        kind: 'diff',
        diff,
        text: '',
      });
      cursor = startIndex;
      return;
    }

    const resolvedEnd =
      typeof endIndex === 'number'
        ? endIndex
        : startIndex + (newText ? newText.length : 0);

    const displayText = baseText.slice(startIndex, resolvedEnd) || newText || '';

    segments.push({
      kind: 'diff',
      diff,
      text: displayText,
    });

    cursor = resolvedEnd;
  });

  if (cursor < baseText.length) {
    segments.push({
      kind: 'text',
      text: baseText.slice(cursor),
    });
  }

  return segments;
}

