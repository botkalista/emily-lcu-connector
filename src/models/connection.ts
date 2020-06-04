export class Connection {
    token: string
    port: string

    constructor(token: string, port: string) {
        this.token = token;
        this.port = port;
    }
}