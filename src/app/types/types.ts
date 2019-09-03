
export type User = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

export type Query = {
    allUsers: User[]
};
