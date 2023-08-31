import { toXML } from "jstoxml";
import { OutputListCustomerDTO } from "../../../usecase/customer/DTOs/list.customer.dto";

export default class CustomerPresenter {
  static toXML(data: OutputListCustomerDTO): string {
    const xmlOption = {
      header: true,
      indent: "  ",
      newline: "\n",
      allowEmpty: true,
    };

    return toXML({
      customers: {
        customer: data.customers.map((customer) => ({
          id: customer.id,
          name: customer.name,
          active: customer.active,
          rewardPoints: customer.rewardpoints,
          address: {
            street: customer.address.street,
            city: customer.address.city,
            number: customer.address.number,
            zip: customer.address.zip,
          },
        })),
      },
      xmlOption,
    });
  }
}
