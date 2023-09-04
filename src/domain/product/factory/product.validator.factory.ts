import IValidator from "../../@shared/validator/IValidatorRepository";
import Product from "../entity/product";
import ProductValidator from "../validator/product.yup.validator";

export default class ProductValidatorFactory {
  static create(): IValidator<Product> {
    return new ProductValidator();
  }
}
