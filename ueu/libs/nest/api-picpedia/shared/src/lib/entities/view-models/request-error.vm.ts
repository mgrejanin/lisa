import { HttpStatus } from '@nestjs/common';

export interface RequestErrorViewModel {
    msg: string;
    status: HttpStatus;
}
