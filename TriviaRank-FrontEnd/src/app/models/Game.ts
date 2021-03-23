export interface Game {
    id: number;
    gameName: string;
    ownerId: number;
    startDate: Date;
    endDate: Date;
    gameMode: boolean;
    totalQuestions: number;
    isPublic: boolean;
    Duration: number;
}
