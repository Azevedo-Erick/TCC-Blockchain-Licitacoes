import express from 'express';
import 'reflect-metadata';
import routeRegister from './src/api/routes/main';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();
app.use('/', routeRegister(router));

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(
        '\x1b[43m\x1b[30m%s\x1b[0m',
        `Server is running at http://localhost:${port}`
    );
});

/* app.post('/', async (req, res) => {
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
}); */

//container.get(JobsScheduler).start();

//new JobsScheduler().start();
//
//JobsScheduler.start();
