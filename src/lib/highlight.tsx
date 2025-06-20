export const highlightText = (text: string) => {
  const regex = /<em>(.*?)<\/em>/gi;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <em
        key={match.index}
        style={{ fontStyle: "normal", fontWeight: 600 }}
        className="bg-blue-300 p-0.5 rounded-sm ring-1 ring-blue-400"
      >
        {match[1]}
      </em>
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts;
};
