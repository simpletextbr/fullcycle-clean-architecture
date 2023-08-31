import * as yup from "yup";
import IValidator from "../../@shared/validator/IValidatorRepository";
import Customer from "../entity/customer";

export default class CustomerValidator implements IValidator<Customer> {
  validate(entity: Customer): void {
    try {
      const schema = yup.object().shape({
        id: yup.string().required("ID is required"),
        name: yup.string().required("Name is required"),
        rewardPoints: yup
          .number()
          .min(0, "Reward points must be greater than or equal to 0"),
      });

      schema.validateSync(
        {
          id: entity.id,
          name: entity.name,
          rewardPoints: entity.rewardPoints,
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
          context: "customer",
        });
      });
    }
  }
}
