import { downloadCsv, formatDataToCsv } from "shared/features/spreadsheet";

export const downloadEmotionalColoringHandler =
  (paint: { positive: number; neutral: number; negative: number }) => () => {
    downloadCsv(
      formatDataToCsv({
        type: "object-array",
        data: [
          {
            positive: paint.positive,
            neutral: paint.neutral,
            negative: paint.negative,
          },
        ],
        titles: ["Positive color", "Neutral color", "Negative Color"],
      }),
      "Emotional Coloring of All Messages Table"
    );
  };
