export const generateMockContent = (
  filename: string,
  type: "pdf" | "docx"
): string => {
  const baseContent = [
    "This document contains important information about project management and team collaboration.",
    "The quarterly report shows significant growth in user engagement and revenue streams.",
    "Implementation guidelines for the new software architecture and database design patterns.",
    "Meeting notes from the strategic planning session with key stakeholders and decision makers.",
    "Technical specifications for the API endpoints and authentication mechanisms.",
    "User research findings and recommendations for improving the user experience.",
    "Financial analysis and budget allocation for the upcoming fiscal year.",
    "Marketing campaign results and customer feedback analysis report.",
  ];

  const randomContent =
    baseContent[Math.floor(Math.random() * baseContent.length)];
  return `${filename.replace(
    /\.[^/.]+$/,
    ""
  )} - ${randomContent} Additional content includes detailed analysis, charts, and comprehensive data that supports the main findings and conclusions presented in this ${type.toUpperCase()} document.`;
};

export const highlightText = (text: string, query: string) => {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark
        key={index}
        className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded"
      >
        {part}
      </mark>
    ) : (
      part
    )
  );
};
