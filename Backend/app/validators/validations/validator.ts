import ValidationResultDto from "../../dtos/result/validation_result_dto.js";
import ValidationRuleInterface from "./rules/validation_rule_interface.js";


export default function validate<T extends ValidationRuleInterface>(validations: T, value: any): ValidationResultDto {
    return validations.validate(value);
}