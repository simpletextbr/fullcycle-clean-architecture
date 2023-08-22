import { Sequelize } from "sequelize-typescript";
import Address from "../../../../domain/customer/entity/VOs/address";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerRepository from "../../../../infrastructure/consumer/repository/customer.repository";
import CustomerModel from "../../../../infrastructure/consumer/sequelize/model/customer.model";
import UpdateCustomerUseCase from "../../../../usecase/customer/update/update.customer.usecase";

describe("Update Customer Use Case Integration Test", () => {
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

  const input = {
    id: "123",
    name: "John Doe updated",
    active: true,
    rewardpoints: 0,
    address: {
      street: "street updated",
      city: "city updated",
      number: 2,
      zip: "12345-678-updated",
    },
  };

  it("should update a customer", async () => {
    const customer = new Customer("123", "John Doe");
    const address = new Address("street 1", 1, "12345-678", "city 1");
    customer.Address = address;

    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer);

    const usecase = new UpdateCustomerUseCase(customerRepository);

    const result = await usecase.execute(input);

    expect(result).toEqual({
      id: "123",
      name: "John Doe updated",
      active: true,
      rewardpoints: 0,
      address: {
        street: "street updated",
        city: "city updated",
        number: 2,
        zip: "12345-678-updated",
      },
    });
  });
});
