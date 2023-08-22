import Address from "../../../domain/customer/entity/VOs/address";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import ICustomerRepository from "../../../domain/customer/repository/ICustomerRepository";
import {
  InputCreateCustomerDto,
  OutputCreateCustomerDto,
} from "../DTOs/create.customer.dto";

export default class CreateCustomerUseCase {
  private customerRepository: ICustomerRepository;

  constructor(customerRepository: ICustomerRepository) {
    this.customerRepository = customerRepository;
  }

  public async execute(
    input: InputCreateCustomerDto
  ): Promise<OutputCreateCustomerDto> {
    const customerFactory = CustomerFactory.createWithAddress(
      input.name,
      new Address(
        input.address.street,
        input.address.number,
        input.address.zip,
        input.address.city
      )
    );

    await this.customerRepository.create(customerFactory);

    return {
      id: customerFactory.id,
      name: customerFactory.name,
      active: customerFactory.isActive(),
      rewardpoints: customerFactory.rewardPoints,
      address: {
        street: customerFactory.address.street,
        number: customerFactory.address.number,
        zip: customerFactory.address.zip,
        city: customerFactory.address.city,
      },
    };
  }
}
