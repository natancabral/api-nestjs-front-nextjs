import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { DocumentHelper } from "../helpers/document.helper";

@ValidatorConstraint({ async: false })
export class IsCPFConstraint implements ValidatorConstraintInterface {
  validate(cpf: string): boolean {
    return DocumentHelper.isValidCPF(cpf);
  }

  defaultMessage(): string {
    return "Invalid CPF document";
  }
}

export function IsCPF(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCPFConstraint,
    });
  };
}
