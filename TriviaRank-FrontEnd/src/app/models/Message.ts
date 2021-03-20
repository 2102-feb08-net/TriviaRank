export interface Message {
    id: number;
    senderUsername: string;
    receiverUsername: string;
    fromId: number;
    toId: number;
    body: string;
    date: Date;
}
