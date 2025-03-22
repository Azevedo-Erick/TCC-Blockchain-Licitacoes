import User from "#models/user";
import ValidationResultDto from "../../../dtos/result/validation_result_dto.js";
import ValidationRuleInterface from "./validation_rule_interface.js";

export default class UserHasBlockchainAccess implements ValidationRuleInterface {
    validate(data: User): ValidationResultDto {

        if (!data) {
            return {
                message: 'Usuário não encontrado.',
                code: 404,
                isValid: false,
            }
        }

        if (!data.account) {
            return {
                message:
                    'O usuário não possui uma conta associada. Solicite a criação da conta e par de chaves.',
                code: 400,
                isValid: false,
            }
        }
        if (!data.account.canSendTransactions) {
            return {
                message:
                    'O usuário não possui permissão para enviar transações. Solicite a permissão para enviar transações.',
                code: 400,
                isValid: false,
            }
        }
        return {
            message: '',
            code: 200,
            isValid: true,
        }
    }

}