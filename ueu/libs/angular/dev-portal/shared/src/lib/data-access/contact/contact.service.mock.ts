import { Contact, ContactReponse, ContactTagResponse } from '../../models';
import { Observable, of } from 'rxjs';

export class ContactServiceMock {
    getTags(tagType: string): Observable<ContactTagResponse> {
        return of({
            message: 'msg',
            data: {
                b2p: [
                    {
                        subject: 'sub',
                        tag: 'tag',
                    },
                ],
            },
        });
    }

    sendContact(contact: Contact): Observable<ContactReponse> {
        if (!contact) {
            return;
        }
        return of({
            message: 'msg',
        });
    }
}
