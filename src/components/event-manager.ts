
import WebSocket from 'ws';

import { EventEmitter } from 'events';
import { EventType } from '../enums/event-type';
import { GlobalEvent } from '../events/global/global';
import { SimpleEvent } from '../models/simple-event';

import { onLobbyExit } from '../events/onLobbyExit';
import { onReadyCheck } from '../events/onReadyCheck';


export const listener = new EventEmitter();

export function listen(connection) {
    const listener = new WebSocket(`https://riot:${connection.token}@127.0.0.1:${connection.port}`, 'wamp', {});

    listener.on('open', () => {
        listener.send('[5,"OnJsonApiEvent"]');
    });
    listener.on('message', data => {
        const payload = JSON.parse(data.toString());
        const resNum = payload[0];
        const content = payload[2];
        if (resNum == 8) {
            const { data, eventType, uri } = content;
            handleEvent(data, eventType, uri);
        }
    });
}

const eventsToEmit = [
    {
        path: '/lol-lobby/v2/lobby',
        type: EventType.Delete,
        handler: onLobbyExit
    }, {
        path: '/lol-matchmaking/v1/ready-check',
        type: EventType.Update,
        handler: onReadyCheck
    }
    // ['/lol-lobby/v2/comms/members', EventType.Update, EVENTS.onLobbyMemberChange],
    // ['/lol-matchmaking/v1/ready-check', EventType.Update, EVENTS.onReadyCheck]
]
function handleEvent(data: any, type: EventType, uri: string) {
    const localEvent = new SimpleEvent(data, type, uri);

    listener.emit('*', GlobalEvent.onData(localEvent));

    const toEmit = eventsToEmit.find(e => e.path == uri && e.type == type);

    if (toEmit) {
        const handler = toEmit.handler;
        listener.emit(handler.emitName, handler.onData(localEvent));
    }


}
