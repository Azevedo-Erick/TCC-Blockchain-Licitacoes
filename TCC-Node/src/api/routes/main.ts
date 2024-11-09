import { Router } from 'express';
import registerUser from '../handlers/auth/register';
import login from '../handlers/auth/login';
import revokeToken from '../handlers/auth/revoke_token';
import criarLicitacaoHandler from '../handlers/licitacao/criar_licitacao_handler';
import isAuthenticated from '../middlewares/is_authenticated';

export default function routeRegister(router: Router) {
    router.post('/auth/register', registerUser);
    router.post('/auth/login', login);
    router.post('/auth/revoke-refresh-tokens', revokeToken);
    router.post(
        '/licitacao/criar-licitacao',
        isAuthenticated,
        criarLicitacaoHandler
    );
    return router;
}
