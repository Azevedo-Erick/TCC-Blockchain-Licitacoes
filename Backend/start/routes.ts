/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import swagger from '#config/swagger'
const AuthController = () => import('#controllers/auth_controller');
const LicitacoesController = () => import('#controllers/licitacoes_controller')
import router from '@adonisjs/core/services/router'
import AutoSwagger from "adonis-autoswagger";
import { middleware } from './kernel.js';


router.group(() => {
  router.post('/licitacoes', [LicitacoesController, 'criar']).as('licitacoes.criar').use(middleware.auth({
    guards: ['api']
  }))
  //router.get('/licitacoes', [LicitacoesController, 'listar']).as('licitacoes.listar')
  router.get('/licitacoes/:id', [LicitacoesController, 'show']).as('licitacoes.detalhes')
})

router.post('/login', [AuthController, 'login']).as('login')
router.post('/register', [AuthController, 'register']).as('register')
router.get('/logout', [AuthController, 'logout']).as('logout').use(middleware.auth({
  guards: ['api']
}))


router.get("/swagger", async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger);
});

// Renders Swagger-UI and passes YAML-output of /swagger
router.get("/docs", async () => {
  return AutoSwagger.default.ui("/swagger", swagger);
  // return AutoSwagger.default.scalar("/swagger"); to use Scalar instead. If you want, you can pass proxy url as second argument here.
  // return AutoSwagger.default.rapidoc("/swagger", "view"); to use RapiDoc instead (pass "view" default, or "read" to change the render-style)
});