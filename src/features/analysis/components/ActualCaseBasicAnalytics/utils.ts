import { DateTime } from "luxon";
import { LineChartSNDataItem } from "shared/components/ui";
import { downloadCsv, formatDataToCsv } from "shared/features/spreadsheet";

type Initiators = {
  initiators: number;
  outreach: number;
  sn: string;
  date: Date;
};

export const downloadDiagramHandler =
  (
    activeFiltersList: string[],
    mainInitiatorsAndInvolvedCounts: Initiators,
    additionalInitiatorsAndInvolvedCounts: Initiators,
    getRatio: (num: number, den: number) => string
  ) =>
  () => {
    downloadCsv(
      formatDataToCsv({
        type: "object-array",
        data:
          activeFiltersList.length > 1
            ? [
                {
                  initiators:
                    mainInitiatorsAndInvolvedCounts.initiators.toString() +
                    `(` +
                    getRatio(
                      mainInitiatorsAndInvolvedCounts.initiators,
                      mainInitiatorsAndInvolvedCounts.initiators +
                        mainInitiatorsAndInvolvedCounts.outreach
                    ) +
                    `)`,
                  outreach:
                    mainInitiatorsAndInvolvedCounts.outreach.toString() +
                    `(` +
                    getRatio(
                      mainInitiatorsAndInvolvedCounts.outreach,
                      mainInitiatorsAndInvolvedCounts.initiators +
                        mainInitiatorsAndInvolvedCounts.outreach
                    ) +
                    `)`,
                  sn: mainInitiatorsAndInvolvedCounts.sn,
                  date: mainInitiatorsAndInvolvedCounts.date.toString(),
                },
                {
                  initiators:
                    additionalInitiatorsAndInvolvedCounts.initiators.toString() +
                    `(` +
                    getRatio(
                      additionalInitiatorsAndInvolvedCounts.initiators,
                      additionalInitiatorsAndInvolvedCounts.initiators +
                        additionalInitiatorsAndInvolvedCounts.outreach
                    ) +
                    `)`,
                  outreach:
                    additionalInitiatorsAndInvolvedCounts.outreach.toString() +
                    `(` +
                    getRatio(
                      additionalInitiatorsAndInvolvedCounts.outreach,
                      additionalInitiatorsAndInvolvedCounts.initiators +
                        additionalInitiatorsAndInvolvedCounts.outreach
                    ) +
                    `)`,
                  sn: additionalInitiatorsAndInvolvedCounts.sn,
                  date: additionalInitiatorsAndInvolvedCounts.date.toString(),
                },
              ]
            : [
                {
                  initiators:
                    mainInitiatorsAndInvolvedCounts.initiators.toString() +
                    `(` +
                    getRatio(
                      mainInitiatorsAndInvolvedCounts.initiators,
                      mainInitiatorsAndInvolvedCounts.initiators +
                        mainInitiatorsAndInvolvedCounts.outreach
                    ) +
                    `)`,
                  outreach:
                    mainInitiatorsAndInvolvedCounts.outreach.toString() +
                    `(` +
                    getRatio(
                      mainInitiatorsAndInvolvedCounts.outreach,
                      mainInitiatorsAndInvolvedCounts.initiators +
                        mainInitiatorsAndInvolvedCounts.outreach
                    ) +
                    `)`,
                  sn: mainInitiatorsAndInvolvedCounts.sn,
                  date: mainInitiatorsAndInvolvedCounts.date.toString(),
                },
              ],
        titles: ["Initiators", "Involved", "Social Network Name", "Date"],
      }),
      "Initiators with Social Networks Ratio"
    );
  };

export const downloadPostsHandler =
  (
    activeFiltersList: string[],
    inputPostsCounts: {
      date: DateTime;
      count: number;
      sn: string;
    }[],
    currentFrequency: {
      min: Date;
      max: Date;
    }
  ) =>
  () => {
    downloadCsv(
      formatDataToCsv({
        type: "object-array",
        data:
          activeFiltersList.length > 1
            ? [
                ...inputPostsCounts
                  .filter(
                    ({ sn, date }) =>
                      activeFiltersList[0] === sn &&
                      currentFrequency.max >= new Date(date.toISO()) &&
                      new Date(date.toISO()) >= currentFrequency.min
                  )
                  ?.map(({ count, date, sn }) => ({
                    count,
                    date: date.setLocale("en-US").toFormat("D"),
                    sn,
                  })),
                ...inputPostsCounts
                  .filter(
                    ({ sn, date }) =>
                      activeFiltersList[1] === sn &&
                      currentFrequency.max >= new Date(date.toISO()) &&
                      new Date(date.toISO()) >= currentFrequency.min
                  )
                  ?.map(({ count, date, sn }) => ({
                    count,
                    date: date.setLocale("en-US").toFormat("D"),
                    sn,
                  })),
              ]
            : inputPostsCounts
                .filter(
                  ({ sn, date }) =>
                    activeFiltersList[0] === sn &&
                    currentFrequency.max >= new Date(date.toISO()) &&
                    new Date(date.toISO()) >= currentFrequency.min
                )
                ?.map(({ count, date, sn }) => ({
                  count,
                  date: date.setLocale("en-US").toFormat("D"),
                  sn,
                })),
        titles: ["Value", "Date", "Social Network Name"],
      }),
      "Posts Quantity according to Social Network Table"
    );
  };

export const downloadUniqueHandler =
  (
    activeFiltersList: string[],
    mainUniqueUsersList: LineChartSNDataItem[],
    additionalUniqueUsersList: LineChartSNDataItem[]
  ) =>
  () => {
    downloadCsv(
      formatDataToCsv({
        type: "object-array",
        data:
          activeFiltersList.length > 1
            ? [
                ...mainUniqueUsersList?.map(({ value, sn, date }) => ({
                  value,
                  date: date.toString(),
                  sn,
                })),
                ...additionalUniqueUsersList?.map(({ value, sn, date }) => ({
                  value,
                  date: date.toString(),
                  sn,
                })),
              ]
            : mainUniqueUsersList?.map(({ value, sn, date }) => ({
                value,
                date: date.toString(),
                sn,
              })),
        titles: ["Value", "Date", "Social Network Name"],
      }),
      "Unique Users according to Social Network Table"
    );
  };
