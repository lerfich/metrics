export const InfluencersSpreadsheetHeadlines = (label: string) => [
  {
    name: "userId",
    label: "User ID",
    id: "tweetId",
  },
  {
    name: "user",
    label: "User",
    id: "user",
  },
  {
    name: "count",
    label: `Number ${label}`,
    id: "count",
  },
];

export const SORT_TYPES = {
  likesCount: "By number of likes",
  tweetsCount: "By number of posts",
  reposts: "By number of reposts",
  involved: "By number of involved users",
};
