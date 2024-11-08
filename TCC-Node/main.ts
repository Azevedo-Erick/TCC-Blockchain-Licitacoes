import express from 'express';
import criarLicitacaoHandler from './src/api/handlers/licitacao/criar_licitacao_handler';
import detalhesLicitacao from './src/blockchain/functions/licitacoes_concorrencia_selecao_menor_preco/detalhes_licitacao';
import 'reflect-metadata';
import { JobsScheduler } from './src/jobs/jobs_scheduler';
import container from './src/di/container';
import criarConta from './src/blockchain/functions/usuarios/criar_conta';
import { generateMnemonic } from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';
const app = express();
const port = 3000;

app.post('/', async (req, res) => {
    res.send(await criarLicitacaoHandler(req, res));
});

app.get('/', async (req, res) => {
    console.log(generateMnemonic(wordlist, 256));
    //criarConta();
    //"0x687dba80ed0b637f3ce7954d41a70ea17f148ba5"
    //const { block_hash } = req.body.block_hash;
    //detalhesLicitacao(block_hash);//0x687dba80ed0b637f3ce7954d41a70ea17f148ba5
    //console.log("teste")
    //detalhesLicitacao("0x67a99f3166db5de4490999d9505b2d8484e9241b3993f89205ce0de34caa6a38");//0x687dba80ed0b637f3ce7954d41a70ea17f148ba5
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
//container.get(JobsScheduler).start();

//new JobsScheduler().start();
//
//JobsScheduler.start();
