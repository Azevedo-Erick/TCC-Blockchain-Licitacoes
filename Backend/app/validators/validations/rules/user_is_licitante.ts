import User from "#models/user";
import ValidationResultDto from "../../../dtos/result/validation_result_dto.js";
import { RoleEnum } from "../../../enums/role_enum.js";
import ValidationRuleInterface from "./validation_rule_interface.js";

export default class UserIsLicitante implements ValidationRuleInterface {
    validate(data: User): ValidationResultDto {
        if (data.role.name !== RoleEnum.LICITANTE) {
            return {
                message: 'Usuário não é candidato.',
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