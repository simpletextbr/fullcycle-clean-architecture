import * as yup from "yup";
import IValidator from "../../@shared/validator/IValidatorRepository";
import Product from "../entity/product";

export default class ProductValidator implements IValidator<Product> {
  validate(entity: Product): void {
    try {
      const schema = yup.object().shape({
        id: yup.string().required("ID is required"),
        name: yup.string().required("Name is required"),
        price: yup.number().min(0, "Price cannot be less than 0"),
      });

      schema.validateSync(
        {
          id: entity.id,
          name: entity.name,
          price: entity.price,
        },
        {
          abortEarly: false,
        }
      );
    } catch (err) {
      const e = err as yup.ValidationError;
      e.errors.forEach((error) => {
        entity.notification.addError({
          message: error,
          context: "product",
        });
      });
    }
  }
}
