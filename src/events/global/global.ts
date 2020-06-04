import { EventType } from "../../enums/event-type";
import { SimpleEvent } from '../../models/simple-event';

export class GlobalEvent {
    static onData(event: SimpleEvent): SimpleEvent {
        return event;
    }

}