import { Summoner } from "./summoner";
import { makeRequest } from "../components/requester";
import { Endpoints } from "../enums/endpoints";
import { HttpMethods } from "../enums/http-methods";

export class Me extends Summoner {

    statusMessage: string;

    async setStatusMessage(statusMessage) {
        const currentData = await makeRequest<Me>(HttpMethods.GET, Endpoints.me);
        currentData.statusMessage = statusMessage;
        const result = await makeRequest<Me>(HttpMethods.PUT, Endpoints.me, currentData);
        return result.statusMessage;
    }

}