export class Summoner {

    readonly name: string;
    readonly statusMessage: string;
    readonly availability: string;
    readonly platformId: string;
    readonly lol: any;
    readonly pid: any;
    readonly puuid: any;

    get chatStatus(): string {
        return this.availability;
    }

    get loLStatus(): string {
        return this.lol;
    }

}