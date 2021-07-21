import { HttpErrorResponse } from '@angular/common/http';

export const getErrorMessage = erro => {
    let data = erro;
    if (data && data.constructor === HttpErrorResponse && data.error) {
        data = data.error;
    } else if (typeof data === 'string') {
        data = {
            message: data,
        };
    } else {
        data = {
            message: 'Ocorreu um erro não identificado, tente novamente!',
        };
    }

    let message = `${data.message}`;

    if (data.errors) {
        data.errors.map(error => {
            message += `${error.message}`;
        });
    }

    return message;
};
