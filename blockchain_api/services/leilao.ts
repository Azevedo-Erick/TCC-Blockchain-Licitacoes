import { Web3 } from 'web3';
import leilaoABI from './leilaoABI';

export class Leilao {
    // private contractAddress: string = '0x8391c5df45349aC3828c682945Da3f66F0251f64';
    private web3: Web3;
    private privateKey: string;
    private contractBytecode: string;
    private contractABI: any = leilaoABI;
    private from: string = "0x9ba78575be5db35b452329708cb9fb8025f4c6c8";

    constructor(privateKey: string, contractBytecode: string) {
        this.web3 = new Web3("http://localhost:8545");
        this.privateKey = privateKey;
        this.contractBytecode = contractBytecode;
    }

    async deployContract(params: any) {
        const contrato = this.createContractInstance();
        const deploy = contrato.deploy({
            data: this.contractBytecode,
            arguments: []
        }).encodeABI();

        let transactionObject = {
            gas: 2000000,
            gasPrice: "0",
            data: deploy,
            from: this.from
        };

        const rawTx = await this.signTransaction(transactionObject);
        const receipt = await this.web3.eth.sendSignedTransaction(rawTx);
        return receipt;
    }

    private async signTransaction(transactionObject: any) {
        const data = await this.web3.eth.accounts.signTransaction(transactionObject, this.privateKey)
        const rawTx = data.rawTransaction;
        return rawTx;
    }

    private createContractInstance() {
        return new this.web3.eth.Contract(this.contractABI);
    }

    public async cadastrarDonoEItem(dono: string, item: string, contratoEndereco: string) {
        const data = this.web3.eth.abi.encodeFunctionCall(
            {
                "inputs": [
                    {
                        "name": "_dono",
                        "type": "string"
                    },
                    {
                        "name": "_item",
                        "type": "string"
                    }
                ],
                "name": "cadastrarDonoEItem",
                "type": "function"
            }
            , [dono, item]);

        const transactionObject = {
            from: this.from,
            to: contratoEndereco,
            gas: 2000000,
            gasPrice: "0",
            value: "0",
            data: data,
        };

        const rawTx = await this.signTransaction(transactionObject);
        const receipt = await this.web3.eth.sendSignedTransaction(rawTx);
        return receipt;
    }

}