export type User = {
    userId: number;
    id: number;
    isNew: boolean;
    title: string;
    body: string;
};

export type Query = {
    allUsers: User[]
};
