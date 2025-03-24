import RamoAtividade from "#models/ramo_atividade";
import User from "#models/user";
import UserHasBlockchainAccess from "#validators/validations/rules/user_has_blockchain_access";
import validate from "#validators/validations/validator";
import { Web3 } from "web3";
import CreateLicitanteDto from "../dtos/params/create_licitante_dto.js";
import BlockchainLicitanteService from "./blockchain/licitante/licitante_service.js";
import Account from "#models/account";
import Licitante from "#models/licitante";

export default class LicitanteService {
    async create(data: CreateLicitanteDto) {
        const ramoAtividade = RamoAtividade.query().where('id', data.ramoAtividadeId).first();
        if (!ramoAtividade) {
            return { error: 'Ramo de atividade não encontrado' };
        }

        const user = await User.query().where('id', data.userId).preload('account').first();

        const validationResult = validate(new UserHasBlockchainAccess, user);
        if (!validationResult.isValid) {
            return validationResult;
        }
        const contract = await this.deployContract(user!.account, data);

        return await Licitante.create({
            cnpj: data.cnpj,
            contractAddress: contract.contractAddress,
            nomeFantasia: data.nomeFantasia,
            ramoAtividadeId: data.ramoAtividadeId,
            razaoSocial: data.razaoSocial,
            representanteId: user!.id,
        })

    }

    private async deployContract(account: Account, data: CreateLicitanteDto) {
        const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
        const provider = new BlockchainLicitanteService(web3);
        return await provider.deploy(
            account.address,
            account.privateKeyHash,
            data.nomeFantasia,
            data.razaoSocial,
            data.cnpj,
            data.ramoAtividadeId
        );
    }
}