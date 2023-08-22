import { Sequelize } from "sequelize-typescript";
import Address from "../../../../domain/customer/entity/VOs/address";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerRepository from "../../../../infrastructure/consumer/repository/customer.repository";
import CustomerModel from "../../../../infrastructure/consumer/sequelize/model/customer.model";
import FindCustomerUseCase from "../../../../usecase/customer/find/find.customer.usecase";

describe("Find Customer Use Case Integration Test", () => {
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

  it("should find customer by id", async () => {
    const customer = new Customer("123", "John Doe");
    const address = new Address("street 1", 1, "12345-678", "city 1");
    customer.Address = address;

    const customerRepository = new CustomerRepository();
    const usecase = new FindCustomerUseCase(customerRepository);
    await customerRepository.create(customer);

    const input = {
      id: "123",
    };

    const output = {
      id: "123",
      name: "John Doe",
      address: {
        street: "street 1",
        city: "city 1",
        number: 1,
        zip: "12345-678",
      },
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});
