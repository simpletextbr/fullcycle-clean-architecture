import Address from "../../../domain/customer/entity/VOs/address";
import ICustomerRepository from "../../../domain/customer/repository/ICustomerRepository";
import {
  InputUpdateCustomerDto,
  OutputUpdateCustomerDto,
} from "../DTOs/update.customer.dto";

export default class UpdateCustomerUseCase {
  private customerRepository: ICustomerRepository;

  constructor(customerRepository: ICustomerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(
    input: InputUpdateCustomerDto
  ): Promise<OutputUpdateCustomerDto> {
    const customer = await this.customerRepository.find(input.id);

    customer.changeName(input.name);
    customer.Address = new Address(
      input.address.street,
      input.address.number,
      input.address.zip,
      input.address.city
    );

    await this.customerRepository.update(customer);

    return {
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      rewardpoints: customer.rewardPoints,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        zip: customer.address.zip,
        city: customer.address.city,
      },
    };
  }
}
