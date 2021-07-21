import { HttpStatus } from '@nestjs/common';
import { RequestErrorViewModel } from '@picpay/api-picpedia/shared';

export const unauthorizedError: RequestErrorViewModel = {
    msg: 'O token informado na requisição é inválido',
    status: HttpStatus.UNAUTHORIZED,
};

export const failedDependencyError: RequestErrorViewModel = {
    msg:
        'Uma das credenciais necessárias para autenticação não foi encontrada no servidor. Contate o Administrador do sistema.',
    status: HttpStatus.FAILED_DEPENDENCY,
};
