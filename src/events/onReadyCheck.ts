import { SimpleEvent } from "../models/simple-event";
import { ReadyCheck } from '../models/ready-check';

export class onReadyCheck {

    static readonly emitName = 'onReadyCheck';

    static onData(event: SimpleEvent): ReadyCheck {
        return event.data;
    }
}