import { Sequelize } from "sequelize-typescript";
import Address from "../../../../domain/customer/entity/VOs/address";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerRepository from "../../../../infrastructure/consumer/repository/customer.repository";
import CustomerModel from "../../../../infrastructure/consumer/sequelize/model/customer.model";
import ListCustomerUseCase from "../../../../usecase/customer/list/list.customer.usecase";

describe("List Customer Use Case Integration Test", () => {
  let sequelize: Sequelize;
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list customer by id", async () => {
    const customer = new Customer("123", "John Doe");
    const address = new Address("street 1", 1, "12345-678", "city 1");
    customer.Address = address;

    const customer2 = new Customer("456", "John Doe 2");
    const address2 = new Address("street 2", 2, "12345-678", "city 2");
    customer2.Address = address2;

    const customerRepository = new CustomerRepository();
    const usecase = new ListCustomerUseCase(customerRepository);
    await customerRepository.create(customer);
    await customerRepository.create(customer2);

    const output = await usecase.execute({});

    expect(output.customers.length).toBe(2);
    expect(output.customers[0]).toEqual({
      id: "123",
      name: "John Doe",
      active: true,
      rewardpoints: 0,
      address: {
        street: "street 1",
        city: "city 1",
        number: 1,
        zip: "12345-678",
      },
    });
    expect(output.customers[1]).toEqual({
      id: "456",
      name: "John Doe 2",
      active: true,
      rewardpoints: 0,
      address: {
        street: "street 2",
        city: "city 2",
        number: 2,
        zip: "12345-678",
      },
    });
  });
});
