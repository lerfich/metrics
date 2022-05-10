import { DateTime } from "luxon";
import { LineChartData } from "shared/components/ui";

export const TOP_INFLUENCERS = [
  {
    userId: 393883,
    user: "Andrew Pagger",
    likesCount: 100,
    tweetsCount: 982,
    repostsCount: 17,
    involved: 700,
  },
  {
    userId: 387771,
    user: "Nikita Pagger",
    likesCount: 22,
    tweetsCount: 92,
    repostsCount: 170,
    involved: 705,
  },
  {
    userId: 817222,
    user: "Pavel Pagger",
    likesCount: 21,
    tweetsCount: 98,
    repostsCount: 133,
    involved: 882,
  },
  {
    userId: 228288,
    user: "John Pagger",
    likesCount: 200,
    tweetsCount: 82,
    repostsCount: 127,
    involved: 100,
  },
  {
    userId: 109292,
    user: "Anton Pagger",
    likesCount: 827,
    tweetsCount: 2,
    repostsCount: 7,
    involved: 109,
  },
  {
    userId: 188882,
    user: "Vasiliy Pagger",
    likesCount: 8,
    tweetsCount: 391,
    repostsCount: 90,
    involved: 30,
  },
];

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
        text: "That was nice event!",
        author: "Nikita Papenkov",
        date: DateTime.now().minus({ years: 7, month: 11 }),
      },
      {
        id: "3sdai3_dsad",
        text: "Im best player of US.",
        author: "Demar DeRozan",
        date: DateTime.now().minus({ years: 1, month: 1 }),
      },
      {
        id: "3sdai3i_tdwwi",
        text: "Nevermind",
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
        text: "Hey guys",
        author: "Kyrie Irving",
        date: DateTime.now().minus({ years: 7, month: 11 }),
      },
      {
        id: "3sdai3i_82i",
        text: "Good evening",
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

export const inputPostsCounts = [
  { date: DateTime.now(), count: 188 },
  {
    date: DateTime.now().plus({ days: 1 }),
    count: 108,
  },
  {
    date: DateTime.now().plus({ days: 2 }),
    count: 218,
  },
  {
    date: DateTime.now().plus({ days: 3 }),
    count: 38,
  },
  {
    date: DateTime.now().plus({ days: 4 }),
    count: 298,
  },
  {
    date: DateTime.now().plus({ days: 5 }),
    count: 270,
  },
  {
    date: DateTime.now().plus({ days: 6 }),
    count: 210,
  },
  {
    date: DateTime.now().plus({ weeks: 6 }),
    count: 118,
  },
  {
    date: DateTime.now().plus({ weeks: 3 }),
    count: 215,
  },
  {
    date: DateTime.now().plus({ weeks: 13 }),
    count: 370,
  },
  {
    date: DateTime.now().plus({ months: 15 }),
    count: 491,
  },
];

export const inputInitiatorsAndInvolvedCounts = [
  { initiators: 25, outreach: 179, date: new Date(DateTime.now().toISO()) },
  {
    initiators: 13,
    outreach: 37,
    date: new Date(DateTime.now().plus({ days: 5 }).toISO()),
  },
  {
    initiators: 29,
    outreach: 140,
    date: new Date(DateTime.now().plus({ days: 13 }).toISO()),
  },
  {
    initiators: 240,
    outreach: 1800,
    date: new Date(DateTime.now().plus({ weeks: 2 }).toISO()),
  },
  {
    initiators: 78,
    outreach: 89,
    date: new Date(DateTime.now().plus({ weeks: 5 }).toISO()),
  },
  {
    initiators: 40,
    outreach: 45,
    date: new Date(DateTime.now().plus({ weeks: 9 }).toISO()),
  },
  {
    initiators: 10,
    outreach: 190,
    date: new Date(DateTime.now().plus({ days: 15 }).toISO()),
  },
  {
    initiators: 100,
    outreach: 105,
    date: new Date(DateTime.now().plus({ months: 9 }).toISO()),
  },
  {
    initiators: 120,
    outreach: 270,
    date: new Date(DateTime.now().plus({ years: 9 }).toISO()),
  },
];

export const inputUniqueUsers: LineChartData = [
  {
    date: new Date(DateTime.now().toISO()),
    value: 13,
  },
  {
    date: new Date(DateTime.now().plus({ day: 1 }).toISO()),
    value: 12,
  },
  {
    date: new Date(DateTime.now().plus({ day: 2 }).toISO()),
    value: 19,
  },
  {
    date: new Date(DateTime.now().plus({ day: 3 }).toISO()),
    value: 22,
  },
  {
    date: new Date(DateTime.now().plus({ day: 4 }).toISO()),
    value: 28,
  },
  {
    date: new Date(DateTime.now().plus({ day: 5 }).toISO()),
    value: 29,
  },
  {
    date: new Date(DateTime.now().plus({ day: 6 }).toISO()),
    value: 41,
  },
  {
    date: new Date(DateTime.now().plus({ day: 8 }).toISO()),
    value: 180,
  },
  {
    date: new Date(DateTime.now().plus({ day: 13 }).toISO()),
    value: 184,
  },
  {
    date: new Date(DateTime.now().plus({ day: 15 }).toISO()),
    value: 192,
  },
  {
    date: new Date(DateTime.now().plus({ months: 5 }).toISO()),
    value: 144,
  },
  {
    date: new Date(DateTime.now().plus({ months: 15 }).toISO()),
    value: 127,
  },
  {
    date: new Date(DateTime.now().plus({ years: 7 }).toISO()),
    value: 331,
  },
];
