import { injectable } from 'inversify';
import Web3 from 'web3';

@injectable()
export class Web3Provider {
    private readonly web3: Web3;

    constructor() {
        this.web3 = new Web3(
            new Web3.providers.HttpProvider('http://localhost:8545')
        );
    }

    getWeb3(): Web3 {
        return this.web3;
    }
}
