import web3Instance from '../../di/container.js';

const assinarTransacao = async (objetoTransacao: any, chavePrivada: string) => {
    const web3 = web3Instance;

    const data = await web3.eth.accounts.signTransaction(
        objetoTransacao,
        chavePrivada
    );
    const rawTx = data.rawTransaction;
    return rawTx;
};

export default assinarTransacao;
