export interface Game {
    id: number;
    gameName: string,
    ownerId: string,
    startDate: Date,
    endDate: Date,
    gameDode: boolean,
    totalQuestions: number,
    isPublic: boolean
}