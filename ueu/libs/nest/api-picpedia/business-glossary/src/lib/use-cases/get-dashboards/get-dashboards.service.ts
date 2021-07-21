import { Injectable } from '@nestjs/common';

@Injectable()
export class GetDashboardsService {
    getData(): { message: string } {
        return { message: 'Welcome to nest/api-picpedia!' };
    }
}
