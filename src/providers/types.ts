import { DateTime } from "luxon";

export type TweetsType = {
  id?: string;
  text?: string;
  author?: string;
  date?: DateTime | null;
}[];

export type GeneralStatsType = {
  likes: number;
  comments: number;
  posts: number;
  reposts: number;
  general_coverage: number;
};

export type InfluencerType = {
  userId: number;
  user: string;
  likesCount: number;
  tweetsCount: number;
  repostsCount: number;
  involved: number;
};

export type DatabaseType = {
  id?: string;
  title?: string;
  status?: string;
  progress?: number;
  dateFilter?: {
    startDate?: DateTime | null;
    endDate?: DateTime | null;
  };
  filters: string[];
  tags: string[];
  tweets?: TweetsType;
  tweetsCount?: number;
  generalStats?: GeneralStatsType;
};

export type SemanticWordType = {
  wordId: number;
  word: string;
  tonality: string;
  timesMeet: number;
  phrasesMetIn: string[];
};

export type SemanticWordsListType = SemanticWordType[];

export type DatabaseInfluencersType = InfluencerType[];

export type TopicAnalysis = {
  id: number;
  title: string;
  words: {
    text: string;
    frequency: number;
    otherFrequency: number;
  }[];
};

export type TopicAnalysisList = TopicAnalysis[];

export type DatabaseContextValue = {
  database: DatabaseType[];
  setDatabase: React.Dispatch<React.SetStateAction<DatabaseType[]>>;
  influencers: DatabaseInfluencersType;
  setInfluencers: React.Dispatch<React.SetStateAction<DatabaseInfluencersType>>;
  positiveSemanticWords: SemanticWordsListType;
  setPositiveSemanticWords: React.Dispatch<
    React.SetStateAction<SemanticWordsListType>
  >;
  neutralSemanticWords: SemanticWordsListType;
  setNeutralSemanticWords: React.Dispatch<
    React.SetStateAction<SemanticWordsListType>
  >;
  negativeSemanticWords: SemanticWordsListType;
  setNegativeSemanticWords: React.Dispatch<
    React.SetStateAction<SemanticWordsListType>
  >;
  topicAnalysis: TopicAnalysisList;
  setTopicAnalysis: React.Dispatch<React.SetStateAction<TopicAnalysisList>>;
};
