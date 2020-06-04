import { Summoner } from './summoner';
import { makeRequest } from '../components/requester';
import { Endpoints } from '../enums/endpoints';
import { HttpMethods } from '../enums/http-methods';

export class Friend extends Summoner {

    async remove(): Promise<any> {
        const result = await makeRequest(HttpMethods.DELETE, Endpoints.friends + '/' + this.pid);
        return result;
    }

}