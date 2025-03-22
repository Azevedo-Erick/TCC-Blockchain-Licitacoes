import ValidationResultDto from "../../../dtos/result/validation_result_dto.js";

export default interface ValidationRuleInterface {
    validate(_value: any): ValidationResultDto;
}