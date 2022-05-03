import { DateTime } from "luxon";

export const DATABASE = [
  {
    id: "1",
    title: "Amazing case..!",
    status: "pending",
    progress: 0.75,
    dateFilter: {
      startDate: DateTime.now().minus({ months: 3, days: 1 }),
      endDate: DateTime.now().plus({ years: 2, months: 7 }),
    },
    filters: ["instagram only", "facebook only"],
    tags: ["#playfootball", "#basketball", "#MiamiHeat"],
    tweets: [
      {
        id: "3sdai3i_twi",
        text: "Best inetersing moviesdadasldlas ldladlasldalsdlas",
        author: "Nikita Papenkov",
        date: DateTime.now().minus({ years: 7, month: 11 }),
      },
      {
        id: "3sdai3_dsad",
        text: "Im best hustler of EU, waiting yal asldldlalsdlasldlsa",
        author: "Demar DeRozan",
        date: DateTime.now().minus({ years: 1, month: 1 }),
      },
      {
        id: "3sdai3i_tdwwi",
        text: "Have you ever tried to dunk over Kevin Durant??sadad.,asd",
        author: "John Wall",
        date: DateTime.now().minus({ years: 3, month: 9 }),
      },
    ],
    tweetsCount: 3,
    generalStats: {
      likes: 10,
      comments: 25,
      posts: 3,
      reposts: 15,
      general_coverage: 87,
    },
  },
  {
    id: "2",
    title: "So boring case",
    status: "pending",
    progress: 0.31,
    dateFilter: {
      startDate: DateTime.now().minus({ days: 5 }),
      endDate: DateTime.now().plus({ years: 3 }),
    },
    filters: ["instagram only", "facebook only"],
    tags: ["#playfootball", "#basketball", "#MiamiHeat"],
    tweets: [
      {
        id: "3sdai3i_t.,i",
        text: "Best inetersing moviesdadasldlas ldladlasldalsdlas",
        author: "Kyrie Irving",
        date: DateTime.now().minus({ years: 7, month: 11 }),
      },
      {
        id: "3sdai3i_82i",
        text: "Im best hustler of EU, waiting yal asldldlalsdlasldlsa",
        author: "LeBron James",
        date: DateTime.now().minus({ years: 7, month: 11 }),
      },
    ],
    tweetsCount: 2,
    generalStats: {
      likes: 9,
      comments: 79,
      posts: 31,
      reposts: 109,
      general_coverage: 803,
    },
  },
];
