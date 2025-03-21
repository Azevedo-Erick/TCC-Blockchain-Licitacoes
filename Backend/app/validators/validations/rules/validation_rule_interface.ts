import ValidationResultDto from "../../../dtos/result/validation_result_dto.js";

export default class ValidationRuleInterface {
    static validate(_value: any): ValidationResultDto {
        throw new Error('Method not implemented.');
    }
}