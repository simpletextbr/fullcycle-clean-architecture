import ICustomerRepository from "../../../domain/customer/repository/ICustomerRepository";
import {
  InputFindCustomerDto,
  OutputFindCustomerDto,
} from "../DTOs/find.customer.dto";

export default class FindCustomerUseCase {
  private customerRepository: ICustomerRepository;

  constructor(customerRepository: ICustomerRepository) {
    this.customerRepository = customerRepository;
  }

  public async execute(
    input: InputFindCustomerDto
  ): Promise<OutputFindCustomerDto> {
    const customer = await this.customerRepository.find(input.id);

    return {
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        zip: customer.address.zip,
        city: customer.address.city,
      },
    };
  }
}
