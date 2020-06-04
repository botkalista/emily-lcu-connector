process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

import * as child_process from 'child_process';

import { Connection } from '../models/connection';

export function getConnection(): Promise<Connection> {
    return new Promise<Connection>((resolve, reject) => {
        child_process.exec("WMIC PROCESS WHERE name='LeagueClientUx.exe' GET CommandLine", (error, stdout, stderr) => {
            if (error || stderr) reject("Client error")
            try {
                const token: string = stdout.match(/--remoting-auth-token=(.*?)"/)[1];
                const port: string = stdout.match(/--app-port=(.*?)"/)[1];
                resolve(new Connection(token, port));
            } catch (ex) {
                reject("Generic error");
            }
        })
    })
}

export async function waitForClient(delay = 2000) {
    do {
        await new Promise((res, rej) => {
            setTimeout(res, delay);
        });
    } while (!child_process.execSync('tasklist').toString().includes('LeagueClient.exe'));
}