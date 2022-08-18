import { Message } from "./Message";

export class Chatroom {
    constructor(public title: string,
                public status: Status,
                public messages: Message[], 
                public timestamp: string, 
                public id?: string,) { }
}

export enum Status {
    READ = "READ", UNREAD = "UNREAD"
}