export type User = {
    id: number;
    name: string;
    profile: string;
};

export type Tweet = {
    id: number;
    userId: number;
    tweet: string;
};

export type Query = {
    users: [User];
    tweets: [Tweet];
};
