import IValidator from "../../@shared/validator/IValidatorRepository";
import Customer from "../entity/customer";
import CustomerValidator from "../validator/customer.yup.validator";

export default class CustomerValidatorFactory {
  static create(): IValidator<Customer> {
    return new CustomerValidator();
  }
}
