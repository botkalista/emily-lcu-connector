import { SimpleEvent } from "../models/simple-event";

export class onLobbyExit {

    static readonly emitName = 'onLobbyExit';


    static onData(event: SimpleEvent): any {
        return event.data;
    }

}