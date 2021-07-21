import { of } from 'rxjs';
import { BatchShipment } from '../../models';

export const saveBatchShipmentMock: { status: string; project_id: string } = {
    status: 'CREATED',
    project_id: '5fc77e10edc28049500d3052',
};

export class ShipmentServiceMock {
    saveBatchShipment(_bodyBatch: BatchShipment) {
        return of(saveBatchShipmentMock);
    }
}
