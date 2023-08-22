import Address from "../../../../domain/customer/entity/VOs/address";
import Customer from "../../../../domain/customer/entity/customer";
import ListCustomerUseCase from "../../../../usecase/customer/list/list.customer.usecase";

const customer = new Customer("123", "John Doe");
const address = new Address("street 1", 1, "12345-678", "city 1");
customer.Address = address;

const customer2 = new Customer("456", "John Doe 2");
const address2 = new Address("street 2", 2, "12345-678", "city 2");
customer2.Address = address2;

const customers = [customer, customer2];

const mockCustomerRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve(customers)),
    update: jest.fn(),
  };
};

describe("List Customer Use Case unit Test", () => {
  it("should list customer by id", async () => {
    const customerRepository = mockCustomerRepository();
    const usecase = new ListCustomerUseCase(customerRepository);

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
