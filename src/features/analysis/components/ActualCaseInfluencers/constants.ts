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
  friends: "By number of friends",
  favourites: "By number of favourites",
  followers: "By number of followers",
  // involved: "By number of involved users",
};
