import { Sequelize } from "sequelize-typescript";
import Address from "../../../../domain/customer/entity/VOs/address";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerRepository from "../../../../infrastructure/consumer/repository/customer.repository";
import CustomerModel from "../../../../infrastructure/consumer/sequelize/model/customer.model";
import CreateCustomerUseCase from "../../../../usecase/customer/create/create.customer.usecase";

describe("Create Customer Use Case Integration Test", () => {
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
    name: "John Doe",
    address: {
      street: "street 1",
      city: "city 1",
      number: 1,
      zip: "12345-678",
    },
  };

  it("should create a customer", async () => {
    const customer = new Customer("123", "John Doe");
    const address = new Address("street 1", 1, "12345-678", "city 1");
    customer.Address = address;

    const customerRepository = new CustomerRepository();
    const usecase = new CreateCustomerUseCase(customerRepository);

    const result = await usecase.execute(input);

    expect(result).toEqual({
      id: expect.any(String),
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
  });
});
