export const InfluencersSpreadsheetHeadlines = (label: string) => [
  {
    name: "userId",
    label: "Tweet ID",
    id: "tweetId",
  },
  {
    name: "user",
    label: "Пользователь",
    id: "user",
  },
  {
    name: "count",
    label: `Количество ${label}`,
    id: "count",
  },
];

export const SORT_TYPES = {
  likesCount: "По количеству лайков",
  tweetsCount: "По количеству постов",
  reposts: "По количеству репостов",
  involved: "По количеству вовлеченных пользователей",
};
