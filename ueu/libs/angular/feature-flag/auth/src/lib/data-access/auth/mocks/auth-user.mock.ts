import { AuthUser } from '../../../models';

export const mockUser: AuthUser = {
    id: 'sdjsid9d8s8s7s',
    name: 'joao da silva',
    picture: 'https://s3.bucket.com/images/imagem.jpg',
    fullname: 'Joao da Silva',
    email: 'joao.silva@picpay.com',
    roles: {
        isAdmin: false,
        isEditor: false,
        adminSquad: ['FeatureManagement'],
        editorSquad: ['P2M'],
    },
};
