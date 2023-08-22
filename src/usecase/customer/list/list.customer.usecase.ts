import Customer from "../../../domain/customer/entity/customer";
import ICustomerRepository from "../../../domain/customer/repository/ICustomerRepository";
import {
  InputListCustomerDTO,
  OutputListCustomerDTO,
} from "../DTOs/list.customer.dto";

export default class ListCustomerUseCase {
  private customerRepository: ICustomerRepository;

  constructor(customerRepository: ICustomerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(input: InputListCustomerDTO): Promise<OutputListCustomerDTO> {
    const customers = await this.customerRepository.findAll();
    return OutputMapper.toDTO(customers);
  }
}

class OutputMapper {
  static toDTO(customer: Customer[]): OutputListCustomerDTO {
    return {
      customers: customer.map((customer) => ({
        id: customer.id,
        name: customer.name,
        active: customer.isActive(),
        rewardpoints: customer.rewardPoints,
        address: {
          street: customer.address.street,
          city: customer.address.city,
          number: customer.address.number,
          zip: customer.address.zip,
        },
      })),
    };
  }
}
