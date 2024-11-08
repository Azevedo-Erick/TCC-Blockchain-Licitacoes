import { injectable } from 'inversify';
import Web3 from 'web3';
import { blockchainUrl } from '../../configs/config';

@injectable()
export class Web3Provider {
    private readonly web3: Web3;

    constructor() {
        this.web3 = new Web3(
            new Web3.providers.HttpProvider(blockchainUrl)
        );
    }

    getWeb3(): Web3 {
        return this.web3;
    }
}
