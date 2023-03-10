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
  parsedData: ParsedData | undefined;
  setParsedData: React.Dispatch<React.SetStateAction<ParsedData | undefined>>;
};

export type ParsedData = {
  globalObjects: { tweets: Tweet[]; users: User[] };
  timeline: {
    id: string[];
    instructions: any[];
  };
};

export type User = {
  advertiser_account_service_levels: any[];
  advertiser_account_type: string;
  blocked_by: any;
  blocking: any;
  business_profile_state: string;
  can_dm: any;
  contributors_enabled: boolean;
  created_at: string;
  default_profile: boolean;
  default_profile_image: boolean;
  description: string;
  entities: any;
  ext: any;
  fast_followers_count: number;
  favourites_count: number;
  follow_request_sent: any;
  followed_by: any;
  followers_count: number;
  following: any;
  friends_count: number;
  geo_enabled: boolean;
  has_custom_timelines: boolean;
  has_extended_profile: boolean;
  id: number;
  id_str: string;
  is_translation_enabled: boolean;
  is_translator: boolean;
  lang: any;
  listed_count: number;
  location: string;
  media_count: number;
  muting: any;
  name: string;
  normal_followers_count: number;
  notifications: any;
  pinned_tweet_ids: number[];
  pinned_tweet_ids_str: string[];
  profile_background_color: string;
  profile_background_image_url: any;
  profile_background_image_url_https: any;
  profile_background_tile: boolean;
  profile_banner_extensions: any;
  profile_banner_extensions_alt_text: any;
  profile_banner_extensions_media_availability: any;
  profile_banner_extensions_media_color: { palette: any };
  profile_banner_url: string;
  profile_image_extensions: { mediaStats: any };
  profile_image_extensions_alt_text: any;
  profile_image_extensions_media_availability: any;
  profile_image_extensions_media_color: { palette: any };
  profile_image_url: string;
  profile_image_url_https: string;
  profile_interstitial_type: string;
  profile_link_color: string;
  profile_sidebar_border_color: string;
  profile_sidebar_fill_color: string;
  profile_text_color: string;
  profile_use_background_image: boolean;
  protected: boolean;
  require_some_consent: boolean;
  screen_name: string;
  statuses_count: number;
  time_zone: any;
  translator_type: string;
  url: string;
  utc_offset: any;
  verified: boolean;
  want_retweets: any;
  withheld_in_countries: any[];
};

export type Tweet = {
  contributors: any;
  conversation_id: number;
  conversation_id_str: string;
  coordinates: any;
  created_at: string;
  display_text_range: number[];
  entities: {
    hashtags: any[];
    symbols: any[];
    user_mentions: any[];
    urls: any[];
    media: any[];
  };
  extended_entities: { media: any[] };
  favorite_count: number;
  favorited: boolean;
  full_text: string;
  geo: any;
  id: number;
  id_str: string;
  in_reply_to_screen_name: any;
  in_reply_to_status_id: any;
  in_reply_to_status_id_str: any;
  in_reply_to_user_id: any;
  in_reply_to_user_id_str: any;
  is_quote_status: boolean;
  lang: string;
  place: any;
  possibly_sensitive: boolean;
  possibly_sensitive_editable: boolean;
  quote_count: number;
  reply_count: number;
  retweet_count: number;
  retweeted: boolean;
  source: string;
  supplemental_language: any;
  truncated: boolean;
  user_id: number;
  user_id_str: string;
};
