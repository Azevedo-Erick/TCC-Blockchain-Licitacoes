import ValidationResultDto from "../../dtos/result/validation_result_dto.js";
import ValidationRuleInterface from "./rules/validation_rule_interface.js";

export default class Validator {
    public static validate(validations: ValidationRuleInterface, value: any): ValidationResultDto {
        return ValidationRuleInterface.validate(value);
    }
}