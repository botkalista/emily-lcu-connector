import { getConnection, waitForClient } from "./connector";
import { Connection } from "../models/connection";
import { Friend } from '../models/friend';
import { Me } from '../models/me';

import { Endpoints } from '../enums/endpoints';
import { HttpMethods } from "../enums/http-methods";

import * as requester from './requester';
import { Model } from "../models/model";

import * as EventManager from './event-manager';
import { EventEmitter } from "events";

export async function connect() {
    await waitForClient();
    const connection: Connection = await getConnection();
    requester.setConnection(connection);
}

export async function listenForEvents(connection?: Connection): Promise<EventEmitter> {
    await waitForClient();
    if (!connection) {
        connection = await getConnection();
    }
    EventManager.listen(connection);
    return EventManager.listener;
}


export async function getFriends(): Promise<Friend[]> {
    const friends: Friend[] = await requester.makeRequest(HttpMethods.GET, Endpoints.friends);
    return friends.map(f => Model.from(f, new Friend()));
}

export async function getLocalPlayer(): Promise<Me> {
    const me = await requester.makeRequest(HttpMethods.GET, Endpoints.me);
    return Model.from(me, new Me())
}

export async function acceptReadyCheck() {
    await requester.makeRequest(HttpMethods.POST, Endpoints.acceptReadyCheck, {}, false);
}
