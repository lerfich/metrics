import { STATUS_CODES } from "http";
import { DateTime } from "luxon";
import { LineChartData, LineChartSNData } from "shared/components/ui";
import { SOCIAL_NETWORKS } from "./social";
import { CASE_STATUSES } from "./status";

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
    status: CASE_STATUSES.crawling,
    progress: 0,
    dateFilter: {
      startDate: DateTime.now().minus({ months: 3, days: 1 }),
      endDate: DateTime.now().plus({ years: 2, months: 7 }),
    },
    filters: ["instagram", "facebook"],
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
    id: "33",
    title: "Good case case",
    status: CASE_STATUSES.ready,
    progress: 1,
    dateFilter: {
      startDate: DateTime.now().minus({ days: 5 }),
      endDate: DateTime.now().plus({ years: 3 }),
    },
    filters: ["instagram", "facebook"],
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
  {
    id: "1",
    title: "Amazing case..!",
    status: CASE_STATUSES.sentiment,
    progress: 0.75,
    dateFilter: {
      startDate: DateTime.now().minus({ months: 3, days: 1 }),
      endDate: DateTime.now().plus({ years: 2, months: 7 }),
    },
    filters: ["instagram", "facebook"],
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
    id: "99",
    title: "Amazing case..!",
    status: CASE_STATUSES.error,
    progress: 0,
    dateFilter: {
      startDate: DateTime.now().minus({ months: 3, days: 1 }),
      endDate: DateTime.now().plus({ years: 2, months: 7 }),
    },
    filters: ["instagram", "facebook"],
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
];

export const inputPostsCounts = [
  { date: DateTime.now(), count: 188, sn: SOCIAL_NETWORKS[4].shortName },
  {
    date: DateTime.now().plus({ hours: 1 }),
    count: 108,
    sn: SOCIAL_NETWORKS[4].shortName,
  },
  {
    date: DateTime.now().plus({ hours: 3 }),
    count: 128,
    sn: SOCIAL_NETWORKS[4].shortName,
  },
  {
    date: DateTime.now().plus({ hours: 7 }),
    count: 131,
    sn: SOCIAL_NETWORKS[4].shortName,
  },
  {
    date: DateTime.now().plus({ hours: 12 }),
    count: 208,
    sn: SOCIAL_NETWORKS[4].shortName,
  },
  {
    date: DateTime.now().plus({ hours: 22 }),
    count: 111,
    sn: SOCIAL_NETWORKS[4].shortName,
  },
  {
    date: DateTime.now().plus({ days: 2 }),
    count: 218,
    sn: SOCIAL_NETWORKS[4].shortName,
  },
  {
    date: DateTime.now().plus({ days: 3 }),
    count: 38,
    sn: SOCIAL_NETWORKS[4].shortName,
  },
  {
    date: DateTime.now().plus({ days: 4 }),
    count: 298,
    sn: SOCIAL_NETWORKS[4].shortName,
  },
  {
    date: DateTime.now().plus({ days: 5 }),
    count: 270,
    sn: SOCIAL_NETWORKS[4].shortName,
  },
  {
    date: DateTime.now().plus({ days: 6 }),
    count: 210,
    sn: SOCIAL_NETWORKS[4].shortName,
  },
  {
    date: DateTime.now().plus({ weeks: 3 }),
    count: 215,
    sn: SOCIAL_NETWORKS[4].shortName,
  },
  {
    date: DateTime.now().plus({ weeks: 6 }),
    count: 118,
    sn: SOCIAL_NETWORKS[4].shortName,
  },
  {
    date: DateTime.now().plus({ weeks: 13 }),
    count: 370,
    sn: SOCIAL_NETWORKS[4].shortName,
  },
  {
    date: DateTime.now().plus({ months: 4 }),
    count: 320,
    sn: SOCIAL_NETWORKS[4].shortName,
  },
  {
    date: DateTime.now().plus({ months: 5 }),
    count: 399,
    sn: SOCIAL_NETWORKS[4].shortName,
  },
  {
    date: DateTime.now().plus({ months: 8 }),
    count: 630,
    sn: SOCIAL_NETWORKS[4].shortName,
  },
  {
    date: DateTime.now().plus({ months: 10 }),
    count: 630,
    sn: SOCIAL_NETWORKS[4].shortName,
  },
  {
    date: DateTime.now().plus({ months: 15 }),
    count: 491,
    sn: SOCIAL_NETWORKS[4].shortName,
  },
  {
    date: DateTime.now().plus({ minutes: 13 }),
    count: 317,
    sn: SOCIAL_NETWORKS[6].shortName,
  },
  {
    date: DateTime.now().plus({ hours: 4 }),
    count: 392,
    sn: SOCIAL_NETWORKS[6].shortName,
  },
  {
    date: DateTime.now().plus({ weeks: 5 }),
    count: 310,
    sn: SOCIAL_NETWORKS[6].shortName,
  },
  {
    date: DateTime.now().plus({ months: 8 }),
    count: 500,
    sn: SOCIAL_NETWORKS[6].shortName,
  },
  {
    date: DateTime.now().plus({ months: 10 }),
    count: 991,
    sn: SOCIAL_NETWORKS[6].shortName,
  },
  {
    date: DateTime.now().plus({ years: 3 }),
    count: 1091,
    sn: SOCIAL_NETWORKS[6].shortName,
  },
];

export const inputInitiatorsAndInvolvedCounts = [
  {
    initiators: 25,
    outreach: 179,
    sn: SOCIAL_NETWORKS[4].shortName,
    date: new Date(DateTime.now().toISO()),
  },
  {
    initiators: 10,
    outreach: 170,
    sn: SOCIAL_NETWORKS[4].shortName,
    date: new Date(DateTime.now().plus({ hours: 1 }).toISO()),
  },
  {
    initiators: 50,
    outreach: 179,
    sn: SOCIAL_NETWORKS[4].shortName,
    date: new Date(DateTime.now().plus({ hours: 5 }).toISO()),
  },
  {
    initiators: 13,
    outreach: 37,
    sn: SOCIAL_NETWORKS[4].shortName,
    date: new Date(DateTime.now().plus({ days: 5 }).toISO()),
  },
  {
    initiators: 29,
    outreach: 140,
    sn: SOCIAL_NETWORKS[4].shortName,
    date: new Date(DateTime.now().plus({ days: 13 }).toISO()),
  },
  {
    initiators: 240,
    outreach: 1800,
    sn: SOCIAL_NETWORKS[4].shortName,
    date: new Date(DateTime.now().plus({ weeks: 2 }).toISO()),
  },
  {
    initiators: 10,
    outreach: 190,
    sn: SOCIAL_NETWORKS[4].shortName,
    date: new Date(DateTime.now().plus({ days: 15 }).toISO()),
  },
  {
    initiators: 78,
    outreach: 89,
    sn: SOCIAL_NETWORKS[4].shortName,
    date: new Date(DateTime.now().plus({ weeks: 5 }).toISO()),
  },
  {
    initiators: 40,
    outreach: 45,
    sn: SOCIAL_NETWORKS[4].shortName,
    date: new Date(DateTime.now().plus({ weeks: 9 }).toISO()),
  },
  {
    initiators: 77,
    outreach: 280,
    sn: SOCIAL_NETWORKS[4].shortName,
    date: new Date(DateTime.now().plus({ months: 3 }).toISO()),
  },
  {
    initiators: 736,
    outreach: 76,
    sn: SOCIAL_NETWORKS[4].shortName,
    date: new Date(DateTime.now().plus({ months: 5 }).toISO()),
  },
  {
    initiators: 100,
    outreach: 105,
    sn: SOCIAL_NETWORKS[4].shortName,
    date: new Date(DateTime.now().plus({ months: 9 }).toISO()),
  },
  {
    initiators: 28,
    outreach: 35,
    sn: SOCIAL_NETWORKS[4].shortName,
    date: new Date(DateTime.now().plus({ months: 11 }).toISO()),
  },
  {
    initiators: 120,
    outreach: 135,
    sn: SOCIAL_NETWORKS[4].shortName,
    date: new Date(DateTime.now().plus({ months: 12 }).toISO()),
  },
  {
    initiators: 120,
    outreach: 270,
    sn: SOCIAL_NETWORKS[4].shortName,
    date: new Date(DateTime.now().plus({ years: 9 }).toISO()),
  },
  {
    initiators: 12,
    outreach: 93,
    sn: SOCIAL_NETWORKS[6].shortName,
    date: new Date(DateTime.now().plus({ minutes: 3 }).toISO()),
  },
  {
    initiators: 736,
    outreach: 760,
    sn: SOCIAL_NETWORKS[6].shortName,
    date: new Date(DateTime.now().plus({ hours: 5 }).toISO()),
  },
  {
    initiators: 120,
    outreach: 105,
    sn: SOCIAL_NETWORKS[6].shortName,
    date: new Date(DateTime.now().plus({ days: 9 }).toISO()),
  },
  {
    initiators: 280,
    outreach: 35,
    sn: SOCIAL_NETWORKS[6].shortName,
    date: new Date(DateTime.now().plus({ weeks: 11 }).toISO()),
  },
  {
    initiators: 160,
    outreach: 135,
    sn: SOCIAL_NETWORKS[6].shortName,
    date: new Date(DateTime.now().plus({ months: 12 }).toISO()),
  },
  {
    initiators: 140,
    outreach: 250,
    sn: SOCIAL_NETWORKS[6].shortName,
    date: new Date(DateTime.now().plus({ years: 3 }).toISO()),
  },
];

export const inputUniqueUsers: LineChartSNData = [
  {
    date: new Date(DateTime.now().toISO()),
    value: 1,
    sn: SOCIAL_NETWORKS[4].shortName,
  },
  {
    date: new Date(DateTime.now().plus({ hours: 1, minutes: 5 }).toISO()),
    value: 2,
    sn: SOCIAL_NETWORKS[4].shortName,
  },
  {
    date: new Date(DateTime.now().plus({ hours: 3 }).toISO()),
    value: 5,
    sn: SOCIAL_NETWORKS[4].shortName,
  },
  {
    date: new Date(DateTime.now().plus({ hours: 7 }).toISO()),
    value: 9,
    sn: SOCIAL_NETWORKS[4].shortName,
  },
  {
    date: new Date(DateTime.now().plus({ hours: 18 }).toISO()),
    value: 11,
    sn: SOCIAL_NETWORKS[4].shortName,
  },
  {
    date: new Date(DateTime.now().plus({ day: 1 }).toISO()),
    value: 12,
    sn: SOCIAL_NETWORKS[4].shortName,
  },
  {
    date: new Date(DateTime.now().plus({ day: 2 }).toISO()),
    value: 19,
    sn: SOCIAL_NETWORKS[4].shortName,
  },
  {
    date: new Date(DateTime.now().plus({ day: 3 }).toISO()),
    value: 22,
    sn: SOCIAL_NETWORKS[4].shortName,
  },
  {
    date: new Date(DateTime.now().plus({ day: 4 }).toISO()),
    value: 28,
    sn: SOCIAL_NETWORKS[4].shortName,
  },
  {
    date: new Date(DateTime.now().plus({ day: 5 }).toISO()),
    value: 29,
    sn: SOCIAL_NETWORKS[4].shortName,
  },
  {
    date: new Date(DateTime.now().plus({ day: 6 }).toISO()),
    value: 41,
    sn: SOCIAL_NETWORKS[4].shortName,
  },
  {
    date: new Date(DateTime.now().plus({ day: 8 }).toISO()),
    value: 180,
    sn: SOCIAL_NETWORKS[4].shortName,
  },
  {
    date: new Date(DateTime.now().plus({ day: 13 }).toISO()),
    value: 184,
    sn: SOCIAL_NETWORKS[4].shortName,
  },
  {
    date: new Date(DateTime.now().plus({ day: 15 }).toISO()),
    value: 192,
    sn: SOCIAL_NETWORKS[4].shortName,
  },
  {
    date: new Date(DateTime.now().plus({ weeks: 3 }).toISO()),
    value: 215,
    sn: SOCIAL_NETWORKS[4].shortName,
  },
  {
    date: new Date(DateTime.now().plus({ days: 27 }).toISO()),
    value: 315,
    sn: SOCIAL_NETWORKS[4].shortName,
  },
  {
    date: new Date(DateTime.now().plus({ months: 3 }).toISO()),
    value: 170,
    sn: SOCIAL_NETWORKS[4].shortName,
  },
  {
    date: new Date(DateTime.now().plus({ months: 5 }).toISO()),
    value: 144,
    sn: SOCIAL_NETWORKS[4].shortName,
  },
  {
    date: new Date(DateTime.now().plus({ months: 8 }).toISO()),
    value: 76,
    sn: SOCIAL_NETWORKS[4].shortName,
  },
  {
    date: new Date(DateTime.now().plus({ months: 10 }).toISO()),
    value: 191,
    sn: SOCIAL_NETWORKS[4].shortName,
  },
  {
    date: new Date(DateTime.now().plus({ months: 15 }).toISO()),
    value: 127,
    sn: SOCIAL_NETWORKS[4].shortName,
  },
  {
    date: new Date(DateTime.now().plus({ years: 7 }).toISO()),
    value: 331,
    sn: SOCIAL_NETWORKS[4].shortName,
  },
  {
    date: new Date(DateTime.now().plus({ minutes: 9 }).toISO()),
    value: 17,
    sn: SOCIAL_NETWORKS[6].shortName,
  },
  {
    date: new Date(DateTime.now().plus({ days: 9 }).toISO()),
    value: 50,
    sn: SOCIAL_NETWORKS[6].shortName,
  },
  {
    date: new Date(DateTime.now().plus({ weeks: 3 }).toISO()),
    value: 70,
    sn: SOCIAL_NETWORKS[6].shortName,
  },
  {
    date: new Date(DateTime.now().plus({ months: 1 }).toISO()),
    value: 81,
    sn: SOCIAL_NETWORKS[6].shortName,
  },
  {
    date: new Date(DateTime.now().plus({ months: 6 }).toISO()),
    value: 100,
    sn: SOCIAL_NETWORKS[6].shortName,
  },
  {
    date: new Date(DateTime.now().plus({ months: 13 }).toISO()),
    value: 130,
    sn: SOCIAL_NETWORKS[6].shortName,
  },
];
