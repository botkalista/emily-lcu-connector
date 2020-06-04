import { EventType } from "../enums/event-type"

export class SimpleEvent {
    data: any
    type: EventType
    uri: string

    constructor(data: any, type: EventType, uri: string) {
        this.data = data;
        this.type = type;
        this.uri = uri;
    }
}