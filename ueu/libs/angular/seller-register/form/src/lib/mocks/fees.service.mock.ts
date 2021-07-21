import { Observable, of } from 'rxjs';
import { FeesResponse } from '../models/fees-response.model';
import { APIResponse } from '../models/response.model';

const getFeesResponseMock: FeesResponse = {
    data: {
        max_percentage: '4,89%',
        min_percentage: '0,00%',
        default_day: 30,
        list: [
            {
                id: 1,
                day: '1',
                percentage: 4.89,
                percentage_str: '4,89%',
            },
            {
                id: 32,
                day: '2',
                percentage: 4.71,
                percentage_str: '4,71%',
            },
            {
                id: 33,
                day: '3',
                percentage: 4.62,
                percentage_str: '4,62%',
            },
        ],
    },
};

const postFeesResponseMock: APIResponse = {
    success: true,
};

export class FeesServiceMock {
    getFees(): Observable<FeesResponse> {
        return of(getFeesResponseMock);
    }

    postFees(): Observable<APIResponse> {
        return of(postFeesResponseMock);
    }
}
