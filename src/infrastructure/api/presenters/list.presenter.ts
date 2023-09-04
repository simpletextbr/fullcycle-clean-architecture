import { toXML } from "jstoxml";
import { OutputListCustomerDTO } from "../../../usecase/customer/DTOs/list.customer.dto";
import { OutputListProductDto } from "../../../usecase/products/DTOs/list.product.dto";

const xmlOption = {
  header: true,
  indent: "  ",
  newline: "\n",
  allowEmpty: true,
};

export class CustomerListPresenter {
  static toXML(data: OutputListCustomerDTO): string {
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

export class ProductListPresenter {
  static toXML(data: OutputListProductDto): string {
    return toXML({
      products: {
        product: data.products.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
        })),
      },
      xmlOption,
    });
  }
}
