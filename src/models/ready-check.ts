import { acceptReadyCheck } from '../components/client';

export class ReadyCheck {
    declinersIds: string[];
    dodgeWarning: any;
    playerResponse: string;
    state: string;
    suppressUx: boolean;
    timer: number;

    get replied(): boolean {
        return this.playerResponse != 'None';
    }

    async accept() {
        await acceptReadyCheck();
    }
}