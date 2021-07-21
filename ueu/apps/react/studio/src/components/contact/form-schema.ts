import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    name: yup
        .string()
        .required('Nome é obrigatório!')
        .min(3, 'A quantidade mínima de caracteres é 3')
        .max(100, 'A quantidade máxima de caracteres é 100'),
    email: yup.string().required('E-mail é obrigatório!').email('E-mail inválido!'),
    phone: yup.string().required('Telefone é obrigatório!'),
    tag: yup.string().notOneOf(['default']).required('Assunto é obrigatório!'),
    body: yup
        .string()
        .required('Mensagem é obrigatória!')
        .min(3, 'A quantidade mínima de caracteres é 3')
        .max(200, 'A quantidade máxima de caracteres é 200'),
});

export const formOptions = { resolver: yupResolver(validationSchema) };
