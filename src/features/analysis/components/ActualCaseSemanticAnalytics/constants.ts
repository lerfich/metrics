export const SemanticAnalysisTopHeadlines = (label: string) => [
  {
    name: "id",
    label: "WORD ID",
    id: "id",
  },
  {
    name: "word",
    label: "WORD",
    id: "word",
  },
  {
    name: "timesMeet",
    label: `Count of ${label} uses`,
    id: "timesMeet",
  },
];

export const SEMANTIC_WORD_TOP = {
  positive: "of Positive",
  negative: "of Negative",
  neutral: "of Neutral",
};
