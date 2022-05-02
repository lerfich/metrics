export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE = 1;
export const TABLE_PAGE_SIZE_VARIANTS = [5, 10, 15, 20];

export type CsvContent = string;

export type DataTypesConfig = {
  /** extensible type  */
  type: "object-array" | string;
  titles?: Array<string>;
};

export interface ObjectArrayData extends DataTypesConfig {
  type: "object-array";
  data: Array<Record<string, any>>;
}

export type FormatDataToCsvProps = ObjectArrayData;

export function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export const formatDataToCsv = (config: FormatDataToCsvProps): CsvContent => {
  let csvContent = "data:text/csv;charset=utf-8,";
  if (config.titles) {
    csvContent += `${config.titles.join(",")}\n`;
  }

  switch (config.type) {
    case "object-array":
      config.data.forEach((dataItem) => {
        const keys = Object.keys(dataItem);
        keys.forEach((key, i) => {
          switch (typeof dataItem[key]) {
            case "string":
              csvContent += dataItem[key];
              break;
            case "number":
              csvContent += dataItem[key];
              break;
            case "boolean":
              csvContent += dataItem[key];
              break;
            case "object":
              // Array
              if (Array.isArray(dataItem[key])) {
                // you can add more logic
                csvContent += dataItem[key].join(",");
                break;
              }

              // TODO: date

              // Object
              csvContent += `${`{${Object.keys(dataItem[key]).map(
                (key) => `${key}: ${dataItem[key]}`
              )}}`}`;

              break;
            default:
              csvContent += dataItem[key];
              break;
          }

          csvContent += i < keys.length - 1 ? "," : "";
        });
        csvContent += "\n";
      });
      break;
    default:
      break;
  }

  return csvContent;
};

export const downloadCsv = (base64String: string, fileName: string): void => {
  const downloadLink = document.createElement("a");

  downloadLink.href = base64String;
  downloadLink.download = fileName;

  downloadLink.click();
  downloadLink.remove();
};
