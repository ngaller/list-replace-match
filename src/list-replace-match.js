
export default function replaceMatch(list, match, replacement) {
  const i = list.findIndex(match);
  if (i > -1) {
    const head = i > 0 ? list.slice(0, i) : [],
      tail = i < list.length - 1 ? list.slice(i - list.length) : [];
    return [...head, replacement, ...tail];
  } else {
    return list.concat(replacement);
  }
}
