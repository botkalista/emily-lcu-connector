
import * as fetch from 'node-fetch';
import { Connection } from '../models/connection';
import { HttpMethods } from '../enums/http-methods';

let connection: Connection;

export function setConnection(conn: Connection) {
    connection = conn;
}

export function getConnection(): Connection {
    return connection;
}

export function makeRequest<T>(method: HttpMethods, endpoint: string, data?: string | object, debug: boolean = false): Promise<T> {

    if (!connection) {
        console.log('Connection not set');
        return;
    }

    if (debug) console.log(Buffer.from('riot:' + connection.token).toString('base64'))
    if (debug) console.log(`https://127.0.0.1:${connection.port}${endpoint}`)

    let body
    if (data && (method !== 'GET' && method !== 'DELETE')) body = typeof data === 'string' ? data : JSON.stringify(data);
    return new Promise<T>(result => {
        fetch(`https://127.0.0.1:${connection.port}${endpoint}`, {
            body: body,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from('riot:' + connection.token).toString('base64')
            }
        }).then(res => {
            try {
                const json = res.json();
                return json;
            } catch (ex) {
                if (debug) console.log('Error on parsing json');
                try {
                    const text = res.text();
                    return text;
                } catch (ex2) {
                    if (debug) console.log('Error on parsing text');
                    return;
                }

            }
        }).then(json => {
            if (json) {
                if (debug) console.log(json);
            }
            result(json)
        })
    })
}