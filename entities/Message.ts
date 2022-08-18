export class Message {
    constructor(public message: string,
                public sender: string,
                public timestamp: string,
                public id?: string) { }
}